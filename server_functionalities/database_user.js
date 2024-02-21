"use server"

import { get_user_database } from "./server_database_connection";


export async function get_users({ params = {}, match_all = false }) {
    const user_database = await get_user_database();

    let result;

    if (match_all) {
        result = await user_database.find(params).toArray();
    }
    else {
        result = await user_database.findOne(params);
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

export async function update_users({ params, new_data, match_all = false }) {
    const user_database = await get_user_database();

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
        result = await user_database.updateMany(params, new_data);
    }
    else {
        result = await user_database.updateOne(params, new_data);
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

export async function delete_users({ params, match_all }) {
    const user_database = await get_user_database();

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
        result = await user_database.deleteMany(params);
    }
    else {
        result = await user_database.deleteOne(params);
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

export async function insert_users({ new_data }) {
    const user_database = await get_user_database();

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

    const result = await user_database.insertOne(new_data);

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

