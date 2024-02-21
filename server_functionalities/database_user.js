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
        "result": result
    };
}

export async function update_users({ params, new_data, match_all = false }) {
    const user_database = await get_user_database();

    if (!params || !new_data) {
        return {
            "success": false,
            "status_code": 400,
            "result": []
        };
    }

    let result;

    if (match_all) {
        result = user_database.updateMany(params, new_data);
    }
    else {
        result = user_database.updateOne(params, new_data);
    }

    return {
        "success": true,
        "status_code": 200,
        "result": result
    }
}

export async function delete_users({ params, match_all }) {
    const user_database = await get_user_database();

    if (!params) {
        return {
            "success": false,
            "status_code": 400,
            "result": []
        };
    }

    let result;

    if (match_all) {
        result = user_database.updateMany(params, new_data);
    }
    else {
        result = user_database.updateOne(params, new_data);
    }

    return {
        "success": true,
        "status_code": 200,
        "result": result
    }
}

export async function insert_users({ new_data }) {

}

