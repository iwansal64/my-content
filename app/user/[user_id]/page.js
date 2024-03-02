'use server'
import styles from "../user.module.css";
import Profile from "../../global_components/profile";
import { must_login } from "@/server_functionalities/server_security";
import { get_users, update_users } from "@/server_functionalities/database_user";
import { ObjectId } from "mongodb";
import HomeBtn from "../../global_components/home";
import ServerSideButton from "../../global_components/server_side_btn";
import { logout } from "../../client_functionalities/user_manager_functions";
import { redirect } from "next/navigation";
import AddFriendButton from "./_components/add_friend_btn";

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

export default async function ProfilePage({ params }) {
    const { user_id } = params;

    if (!user_id) {
        redirect("../");
    }

    const [username, password, id] = await must_login();

    const user_result = await get_users({ params: { "_id": new ObjectId(id) }, match_all: false })
    let user_data = {};
    if (user_result["success"] && user_result["result"]["total"] > 0) {
        user_data = user_result["result"]["data"];
    }

    let already_add = false;
    user_data["friends"].forEach((value) => {
        if (!already_add) {
            if (value.toString() == user_id) {
                already_add = true;
            }
        }
    })


    const target_result = await get_users({ params: { "_id": new ObjectId(user_id) }, match_all: false });
    let target_data = {};
    if (target_result["success"] && target_result["result"]["total"] > 0) {
        target_data = target_result["result"]["data"];
    }

    return (
        <>
            <div className={styles.profile_container}>
                <Profile class_name={styles.profile_icon} in_profile={true} />
                <h1 className={styles.username_email}>{target_data["username"]} | {target_data["email"]}</h1>
                <div className={styles.post_count}>
                    <h2>-- Post Counts --</h2>
                    <h2>{target_data["posts_count"]}</h2>
                </div>
                <div className={styles.like_stats}>
                    <h2>-- Likes Count --</h2>
                    <h2>{target_data["likes_count"]} Posts</h2>
                </div>
            </div>
            <HomeBtn />
            <AddFriendButton user_id={user_id} already_add={already_add} />
        </>
    )
}