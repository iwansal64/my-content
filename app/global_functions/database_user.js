"use server"

import { get_user_database } from "./database_communications"


export async function get_users({ params = {}, get_all = false }) {
    const user_database = await get_user_database();

    if (get_all) {
        const result = await user_database.find(params).toArray();
        return result;
    }
    else {
        const result = await user_database.findOne(params);
        return result;
    }
}

export async function update_users({ params, new_data }) {

}

export async function delete_users({ params }) {

}

export async function insert_users({ new_data }) {

}

