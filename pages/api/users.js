"use server"
import { connect_to_users_database } from "@/server_functionalities/server_database_connection";
import { verify_request } from "@/server_functionalities/server_security";

export async function get_data(params) {
    const user_database = await connect_to_users_database();

    const result = await user_database.find(params).toArray();

    return {
        status_code: 200,
        result: {
            success: true,
            message: "Successfully retrieve data!",
            value: result
        }
    };
}

export async function update_data(params, new_data) {
    const user_database = await connect_to_users_database();

    const result = await user_database.updateOne(params, new_data)

    return {
        status_code: 200,
        result: {
            success: true,
            message: result.matchedCount ? "Successfully update data!" : result.acknowledged ? "No data matched with the given parameters" : "Error occured.",
            value: result
        }
    };
}

export async function insert_data(new_data) {
    const user_database = await connect_to_users_database();

    try {
        const result = await user_database.insertOne(new_data);
    }
    catch (error) {
        console.log("--- ERROR ---");
        if (error.message.startsWith("E11000")) {
            return {
                status_code: 400,
                result: {
                    success: false,
                    message: "Duplicate Key Detected!",
                    value: error.message
                }
            }
        }
        else {
            return {
                status_code: 400,
                result: {
                    success: false,
                    message: "An error has occurred!",
                    value: error.message
                }
            }
        }

    }

    return {
        status_code: 200,
        result: {
            success: true,
            message: result.acknowledged ? "Successfully insert data" : "Error occured.",
            value: result
        },
    };


}

export async function delete_data(params) {
    const user_database = await connect_to_users_database();

    const result = await user_database.deleteMany(params);

    return {
        status_code: 200,
        result: {
            success: true,
            message: result.deletedCount ? `Successfully delete ${result.deletedCount} data!` : result.acknowledged ? "No data matched with the given parameters" : "Error occured.",
            value: result
        }
    };
}

export default async function handler(req, res) {
    if (!await verify_request(req, res)) {
        return;
    }

    console.log("TROBOS");

    if (req.method == "GET") {
        const params = req.query;
        if (!params) {
            res.status(400).json({ success: false, message: "Parameters Required!" });
            return;
        }
        const { status_code, result } = await get_data(params);
        res.status(status_code).json(result)
    }
    else if (req.method == "POST") {
        const { new_data } = req.body;

        if (!new_data) {
            res.status(400).json({ success: false, message: "New Data Required!" });
            return;
        }

        const { status_code, result } = await insert_data(new_data);

        res.status(status_code).json(result);
    }
    else if (req.method == "PUT") {
        const { params, new_data } = req.body;

        if (!new_data) {
            res.status(400).json({ success: false, message: "New Data Required!" });
            return;
        }

        const { status_code, result } = await update_data(params, new_data);

        res.status(status_code).json(result);
    }
    else if (req.method == "DELETE") {
        const { params } = req.body;

        if (!params) {
            res.status(400).json({ success: false, message: "Parameters Required!" });
            return;
        }

        const { status_code, result } = await delete_data(params);

        res.status(status_code).json(result);
    }
}