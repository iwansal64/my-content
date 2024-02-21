"use server"

import { get_post_database } from "./server_database_connection";


export async function get_posts({ params = {}, match_all = false }) {
    const post_database = await get_post_database();

    let result;

    if (match_all) {
        result = await post_database.find(params).toArray();
    }
    else {
        result = await post_database.findOne(params);
    }

    return {
        "success": true,
        "status_code": 200,
        "message": "Successfully get data!",
        "result": {
            "total": match_all ? result.length : (result ? 1 : 0),
            "data": result
        }
    };
}

export async function update_posts({ params, new_data, match_all = false }) {
    const post_database = await get_post_database();

    if (!params || !new_data) {
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
        result = await post_database.updateMany(params, new_data);
    }
    else {
        result = await post_database.updateOne(params, new_data);
    }

    return {
        "success": true,
        "status_code": 200,
        "message": "",
        "result": {
            "total": result.matchedCount,
            "data": result
        }
    }
}

export async function delete_posts({ params, match_all }) {
    const post_database = await get_post_database();

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
        result = await post_database.deleteMany(params);
    }
    else {
        result = await post_database.deleteOne(params);
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

export async function insert_posts({ new_data }) {
    const post_database = await get_post_database();

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

    const result = await post_database.insertOne(new_data);

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

