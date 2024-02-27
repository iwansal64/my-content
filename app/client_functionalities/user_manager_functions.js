"use server"
import { update_posts } from "@/server_functionalities/database_post";
import { update_users } from "@/server_functionalities/database_user";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export async function logout() {

    cookies().delete("user-login-info");

    redirect("../login");

}


export async function likePost({ user_id, post_id }) {
    user_id = new ObjectId(user_id);
    post_id = new ObjectId(post_id);

    const user_update_result = await update_users({
        params: {
            "_id": user_id
        },
        new_data: {
            $inc: { "likes_count": 1 },
            $push: { "liked_posts": post_id }
        },
        match_all: false
    });

    const post_update_result = await update_posts({
        params: {
            "_id": post_id
        },
        new_data: {
            $inc: { "likes_count": 1 },
            $push: { "liked_users": user_id }
        },
        match_all: false
    });

    console.log(user_update_result);
    console.log(post_update_result);
}