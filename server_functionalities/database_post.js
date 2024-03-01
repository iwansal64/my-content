"use server"

import { delete_data, get_data, get_post_collection, insert_data, update_data } from "./server_database_connection";


export async function get_posts({ params = {}, match_all = true, stringify = false }) {
    const post_database = await get_post_collection();
    const return_value = get_data({ database: post_database, params, match_all, stringify });

    return return_value;
}

export async function update_posts({ params, new_data, match_all = false, stringify = false }) {
    const post_database = await get_post_collection();
    const return_value = await update_data({ database: post_database, params, new_data, match_all, stringify });

    return return_value;
}

export async function delete_posts({ params, match_all, stringify = false }) {
    const post_database = await get_post_collection();
    const return_value = await delete_data({ database: post_database, params, match_all, stringify });

    return return_value;
}

export async function insert_posts({ new_data, stringify = false }) {
    const post_database = await get_post_collection();
    const return_value = await insert_data({ database: post_database, new_data, stringify });

    return return_value;
}

