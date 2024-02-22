"use server"

import { delete_data, get_data, get_user_database, insert_data, update_data } from "./server_database_connection";


export async function get_users({ params = {}, match_all = false }) {
    const user_database = await get_user_database();
    return get_data({ database: user_database, params, match_all });
}

export async function update_users({ params, new_data, match_all = false }) {
    const user_database = await get_user_database();
    return update_data({ database: user_database, params, new_data, match_all });
}

export async function delete_users({ params, match_all }) {
    const user_database = await get_user_database();
    return delete_data({ database: user_database, params, match_all });
}

export async function insert_users({ new_data }) {
    const user_database = await get_user_database();
    return insert_data({ database: user_database, new_data });
}

