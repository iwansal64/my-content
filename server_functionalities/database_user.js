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

    console.log(new_data);

    return insert_data({ database: user_database, new_data });
}

