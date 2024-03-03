"use server"
import { update_posts, get_posts, insert_posts } from "@/server_functionalities/database_post";
import { update_users } from "@/server_functionalities/database_user";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export async function logout() {

    cookies().delete("user-login-info");

    redirect("../login");

}


export async function like_post({ user_id, post_id }) {
    console.log(user_id);
    console.log(post_id);

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
            $push: { "users_like": user_id }
        },
        match_all: false
    });
}

export async function unlike_post({ user_id, post_id }) {
    user_id = new ObjectId(user_id);
    post_id = new ObjectId(post_id);

    const user_update_result = await update_users({
        params: {
            "_id": user_id
        },
        new_data: {
            $inc: { "likes_count": -1 },
            $pull: { "liked_posts": { $in: [post_id] } }
        },
        match_all: false
    });

    const post_update_result = await update_posts({
        params: {
            "_id": post_id
        },
        new_data: {
            $inc: { "likes_count": -1 },
            $pull: { "users_like": { $in: [user_id] } }
        },
        match_all: false
    });

    console.log(user_update_result);
    console.log("UNLIKED THE POST");
}

export async function handle_like_post({ post_id, user_id }) {

    const result = await get_posts({
        params: {
            "_id": new ObjectId(post_id),
            "users_like": { $in: [new ObjectId(user_id)] }
        }
    });

    if (result["result"]["total"] > 0) {
        unlike_post({ post_id, user_id });
    }
    else {
        like_post({ post_id, user_id });
    }
}

export async function add_post({ username, user_id, post_data, stringify = false }) {

    const update_user_result = await update_users({
        params: {
            "_id": new ObjectId(user_id)
        },
        new_data: {
            $inc: {
                "posts_count": 1
            }
        }
    });

    const insert_post_result = await insert_posts({
        new_data: {
            "creator_id": new ObjectId(user_id),
            "creator_name": username,
            "post_title": post_data["post_title"],
            "post_description": post_data["post_description"],
            "post_contents": post_data["post_contents"],
            "post_categories": [],
            "likes_count": 0,
            "users_like": []
        }
    });

    return JSON.stringify({ update_user_result, insert_post_result });
}