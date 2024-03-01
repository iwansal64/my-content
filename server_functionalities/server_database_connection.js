"use server"
import { MongoClient } from "mongodb"
import { Collection } from "mongodb";

const mongo_db_uri = "mongodb://localhost:27017";

function connect_to_mongo_client() {
    return new MongoClient(mongo_db_uri);
}

async function connect_to_database({ client = undefined }) {
    if (client == undefined) {
        client = connect_to_mongo_client();
        await client.connect();
    }

    const db = client.db("my-content-database");

    return db;
}

export async function get_collection({ collection_name, client = undefined }) {
    return (await connect_to_database({ client })).collection(collection_name)
}

export async function get_user_collection() {
    return (await connect_to_database({})).collection("users");
}

export async function get_post_collection() {
    return (await connect_to_database({})).collection("posts");
}

function check_if_db(database) {
    if (!(database instanceof Collection)) {
        return {
            "success": false,
            "status_code": 400,
            "message": "Database Required",
            "result": {}
        };
    }

    return false;
}

export async function get_data({ database, params = {}, match_all = false, stringify = false }) {
    const is_not_db = check_if_db(database);
    if (is_not_db) {
        return is_not_db;
    }

    let result;

    if (match_all) {
        result = await database.find(params).toArray();
    }
    else {
        result = await database.findOne(params);
    }

    let result_length;
    if (match_all) {
        result_length = result.length;
    }
    else {
        result_length = result ? 1 : 0;
    }

    if (stringify) {
        result = JSON.stringify(result);
    }

    return {
        "success": true,
        "status_code": 200,
        "message": "Successfully get data!",
        "result": {
            "total": result_length,
            "data": (result || [])
        }
    };
}

export async function update_data({ database, params = {}, new_data = {}, match_all = false, stringify = false }) {
    const is_not_db = check_if_db(database);
    if (is_not_db) {
        return is_not_db;
    }

    if (!params || !new_data) {
        return {
            "success": false,
            "status_code": 400,
            "message": "Params and New Data required!",
            "result": {}
        };
    }

    let result;

    if (match_all) {
        result = await database.updateMany(params, new_data);
    }
    else {
        result = await database.updateOne(params, new_data);
    }

    if (stringify) {
        result = JSON.stringify(result);
    }

    return {
        "success": true,
        "status_code": 200,
        "message": "Successfully update data!",
        "result": {
            "total": result.matchedCount,
            "data": result
        }
    }
}

export async function delete_data({ database, params = {}, match_all = false, stringify = false }) {
    const is_not_db = check_if_db(database);
    if (is_not_db) {
        return is_not_db;
    }

    if (!params) {
        return {
            "success": false,
            "status_code": 400,
            "message": "",
            "result": {}
        };
    }

    let result;

    if (match_all) {
        result = await database.deleteMany(params);
    }
    else {
        result = await database.deleteOne(params);
    }

    if (stringify) {
        result = JSON.stringify(result);
    }

    return {
        "success": true,
        "status_code": 200,
        "message": `Total ${result.deletedCount}`,
        "result": {
            "total": result.deletedCount,
            "data": result
        }
    }
}

export async function insert_data({ database, new_data, stringify = false }) {
    const is_not_db = check_if_db(database);
    if (is_not_db) {
        return is_not_db;
    }

    if (!new_data) {
        return {
            "success": false,
            "status_code": 400,
            "message": "New Data Required",
            "result": {
                "total": -1,
                "data": []
            }
        }
    }

    let result;

    try {
        result = await database.insertOne(new_data);
    }
    catch (error) {

    }

    return {
        "success": true,
        "status_code": 200,
        "message": result.insertedId ? "Successfully Insert Data!" : "Unsuccessfully Insert Data!",
        "result": {
            "total": result.insertedId ? 1 : 0,
            "data": result
        }
    }
}

export async function make_transactions({ collections = [], params = [], updated_data = [] }) {
    const client = connect_to_mongo_client();

    try {
        await client.connect();
        const session = client.startSession();
        session.startTransaction();

        try {
            for (let index = 0; index < collections.length; index++) {
                await client.db().collection(collections[index]).updateOne(
                    params[index],
                    updated_data[index],
                    { session }
                );
            }
            // Commit the transaction
            await session.commitTransaction();
        } finally {
            await session.endSession();
        }
    } finally {
        await client.close();
    }
}