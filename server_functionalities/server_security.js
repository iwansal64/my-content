"use server"
import { redirect } from "next/navigation";
import { cookies } from "next/headers"

export async function already_login() {
    const cookie_store = cookies();
    const account_info = cookie_store.get("user-login-info");

    if (!account_info) {
        return false;
    }

    return account_info["value"];
}

export async function must_login() {
    const value = await already_login();

    if (!value) {
        redirect("/login/");
    }

    return value;
}

export async function verify_request(req, res) {
    const { authorization } = req.headers;

    if (authorization != "af3lchav8aopHHUugy89tUU8vgU99gnWBOibc0F") {
        res.status(401).json({ success: false, message: "An Unauthorized Request Detected!" })
        return false;
    }

    return true;
}