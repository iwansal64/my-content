'use server'
import styles from "../user.module.css";
import Profile from "../../global_components/profile";
import { must_login } from "@/server_functionalities/server_security";
import { get_users, update_users } from "@/server_functionalities/database_user";
import { ObjectId } from "mongodb";
import HomeBtn from "../../global_components/home";
import { redirect } from "next/navigation";
import AddFriendButton from "./_components/add_friend_btn";
import { Suspense } from "react";
import { PostFallback, UserFallback } from "@/app/global_components/fallback_components";
import UserPostContainer from "../_components/user_post_container";

export async function handle_remove_friend(user_id) {
    const [username, password, id] = await must_login();

    const result = await update_users({
        "params": {
            "_id": new ObjectId(id)
        },
        "new_data": {
            $pull: {
                "friends": new ObjectId(user_id)
            },
            $inc: {
                "friends_count": -1
            }
        },
        "match_all": false,
        "stringify": false
    });

}

export async function handle_add_friend(user_id) {
    const [username, password, id] = await must_login();

    const result = await update_users({
        "params": {
            "_id": new ObjectId(id)
        },
        "new_data": {
            $push: {
                "friends": new ObjectId(user_id)
            },
            $inc: {
                "friends_count": 1
            }
        },
        "match_all": false,
        "stringify": false
    });

}


async function ProfileData({ user_id, target_id }) {
    const user_result = await get_users({ params: { "_id": new ObjectId(user_id) }, match_all: false })
    let user_data = {};
    if (user_result["success"] && user_result["result"]["total"] > 0) {
        user_data = user_result["result"]["data"];
    }

    let already_add = false;
    user_data["friends"].forEach((value) => {
        if (!already_add) {
            if (value.toString() == target_id) {
                already_add = true;
            }
        }
    })


    const target_result = await get_users({ params: { "_id": new ObjectId(target_id) }, match_all: false });
    let target_data = {};
    if (target_result["success"] && target_result["result"]["total"] > 0) {
        target_data = target_result["result"]["data"];
    }

    return (
        <>
            <div className={styles.profile_container}>
                <Profile class_name={styles.profile_icon} in_profile={true} />
                <h1 className={styles.username_email}>{target_data["username"]} | {target_data["email"]}</h1>
                <p className={styles.description}>{target_data["description"]}</p>
                <br />
                <div className={styles.post_count}>
                    <p>Post Counts: {target_data["posts_count"]}</p>
                </div>
                <div className={styles.like_stats}>
                    <p>Likes Count: {target_data["likes_count"]} Posts</p>
                </div>
            </div>
            <AddFriendButton user_id={user_id} already_add={already_add} />
        </>
    )
}


export default async function ProfilePage({ params }) {
    const { user_id } = params;

    if (!user_id) {
        redirect("../");
    }

    const [username, password, id] = await must_login();

    return (
        <>
            <div className={styles.main_wrapper}>
                <Suspense fallback={<UserFallback />} >
                    <ProfileData user_id={id} target_id={user_id} />
                </Suspense>
                <Suspense fallback={<PostFallback />}>
                    <UserPostContainer id={user_id} />
                </Suspense>
                <HomeBtn />
            </div>
        </>
    )
}