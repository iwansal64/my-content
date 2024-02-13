"use server"
import { redirect } from "next/navigation";
import { cookies } from "next/headers"

export async function already_login() {
    const cookie_store = cookies();
    const account_info = cookie_store.get("user-login-info");

    if (!account_info) {
        return false;
    }
}

export async function must_login() {
    if (!await already_login()) {
        redirect("/login/");
    }
}