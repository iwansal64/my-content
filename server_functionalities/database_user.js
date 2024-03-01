"use server"

import { delete_data, get_data, get_user_collection, insert_data, update_data } from "./server_database_connection";


export async function get_users({ params = {}, match_all = false }) {
    const user_database = await get_user_collection();
    return get_data({ database: user_database, params, match_all });
}

export async function update_users({ params, new_data, match_all = false }) {
    const user_database = await get_user_collection();
    return update_data({ database: user_database, params, new_data, match_all });
}

export async function delete_users({ params, match_all }) {
    const user_database = await get_user_collection();
    return delete_data({ database: user_database, params, match_all });
}

export async function insert_users({ new_data }) {
    const user_database = await get_user_collection();

    new_data["posts_count"] = {
        "photo": 0,
        "video": 0
    }
    new_data["first_join"] = new Date();
    new_data["liked_posts"] = [];
    new_data["likes_count"] = 0;
    new_data["friends"] = [];

    let retval = {};

    const new_data_keys = Object.keys(new_data);
    const required_fields = ["username", "password", "email"];
    required_fields.forEach((value, index) => {
        if (!new_data_keys.includes(value)) {
            retval = {
                "success": false,
                "status_code": 400,
                "message": "The new field keys is not complete!",
                "result": {
                    "total": 0,
                    "data": []
                }
            };
        }
    })

    if (Object.keys(retval).length > 0) {
        return retval;
    }

    if (!new_data_keys.includes("description")) {
        new_data["description"] = "";
    }

    return insert_data({ database: user_database, new_data });
}

