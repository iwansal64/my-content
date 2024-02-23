"use server"
import { insert_posts, delete_posts, get_posts, update_posts } from "@/server_functionalities/database_post";
import { verify_request } from "@/server_functionalities/server_security";

export default async function handler(req, res) {
    if (!await verify_request(req, res)) {
        return;
    }

    if (req.method == "GET") {
        const params = req.query;
        if (!params) {
            res.status(400).json({ success: false, message: "Parameters Required!" });
            return;
        }
        const { status_code, message, success, result } = await get_posts({ params, match_all: true });
        res.status(status_code).json({
            success,
            message,
            result
        })
    }
    else if (req.method == "POST") {
        const { new_data } = req.body;

        if (!new_data) {
            res.status(400).json({ success: false, message: "New Data Required!" });
            return;
        }

        const { status_code, success, message, result } = await insert_posts({ new_data });

        res.status(status_code).json({
            success,
            message,
            result
        });
    }
    else if (req.method == "PUT") {
        const { params, new_data } = req.body;

        if (!new_data) {
            res.status(400).json({ success: false, message: "New Data Required!" });
            return;
        }

        const { status_code, success, message, result } = await update_posts({ params, new_data });

        res.status(status_code).json({
            success,
            message,
            result
        });
    }
    else if (req.method == "DELETE") {
        const { params } = req.body;

        if (!params) {
            res.status(400).json({ success: false, message: "Parameters Required!" });
            return;
        }

        const { status_code, success, message, result } = await delete_posts({ params });

        res.status(status_code).json({
            success,
            message,
            result
        });
    }
}