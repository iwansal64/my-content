"use server"

import { delete_data, get_data, get_post_database, insert_data, update_data } from "./server_database_connection";


export async function get_posts({ params = {}, match_all = true }) {
    const post_database = await get_post_database();
    return get_data({ database: post_database, params, match_all });
}

export async function update_posts({ params, new_data, match_all = false }) {
    const post_database = await get_post_database();
    return update_data({ database: post_database, params, new_data, match_all });
}

export async function delete_posts({ params, match_all }) {
    const post_database = await get_post_database();
    return delete_data({ database: post_database, params, match_all });
}

export async function insert_posts({ new_data }) {
    const post_database = await get_post_database();
    return insert_data({ database: post_database, new_data });
}

