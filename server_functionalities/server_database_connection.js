"use server"
import { MongoClient } from "mongodb"

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


