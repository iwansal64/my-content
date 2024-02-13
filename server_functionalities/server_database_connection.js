import { MongoClient } from "mongodb"

const mongodb_uri = "mongodb://localhost:27017/my-content-database";
export async function connect_to_database() {
    const client = new MongoClient(mongodb_uri);
    await client.connect();
    const database = client.db();

    return database;
}

export async function connect_to_users_database() {
    const database = await connect_to_database();
    return database.collection("users");
}