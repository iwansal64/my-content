"use server"
import { MongoClient } from "mongodb"
import { Collection } from "mongodb";

const mongo_db_uri = "mongodb://localhost:27017";

async function connect_to_database() {
    const client = new MongoClient(mongo_db_uri);

    await client.connect();

    const db = client.db("my-content-database");

    return db;
}

export async function get_user_database() {
    return (await connect_to_database()).collection("users");
}

export async function get_post_database() {
    return (await connect_to_database()).collection("posts");
}

function check_if_db(database) {
    if (!(database instanceof Collection)) {
        return {
            "success": false,
            "status_code": 400,
            "message": "Database Required",
            "result": {
                "total": 0,
                "data": []
            }
        };
    }

    return false;
}

export async function get_data({ database, params = {}, match_all = false }) {
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

    return {
        "success": true,
        "status_code": 200,
        "message": "Successfully get data!",
        "result": {
            "total": match_all ? result.length : (result ? 1 : 0),
            "data": (result || [])
        }
    };
}

export async function update_data({ database, params = {}, new_data = {}, match_all = false }) {
    const is_not_db = check_if_db(database);
    if (is_not_db) {
        return is_not_db;
    }

    if (!params || !new_data) {
        return {
            "success": false,
            "status_code": 400,
            "message": "Params and New Data required!",
            "result": {
                "data": []
            }
        };
    }

    let result;

    if (match_all) {
        result = await database.updateMany(params, new_data);
    }
    else {
        result = await database.updateOne(params, new_data);
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

export async function delete_data({ database, params = {}, match_all = false }) {
    const is_not_db = check_if_db(database);
    if (is_not_db) {
        return is_not_db;
    }

    if (!params) {
        return {
            "success": false,
            "status_code": 400,
            "message": "",
            "result": {
                "data": []
            }
        };
    }

    let result;

    if (match_all) {
        result = await database.deleteMany(params);
    }
    else {
        result = await database.deleteOne(params);
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

export async function insert_data({ database, new_data }) {
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

    const result = await database.insertOne(new_data);

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