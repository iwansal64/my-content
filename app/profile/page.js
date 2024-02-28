'use server'
import styles from "./profile.module.css";
import Profile from "../global_components/profile";
import { must_login } from "@/server_functionalities/server_security";
import { get_users } from "@/server_functionalities/database_user";
import { ObjectId } from "mongodb";
import HomeBtn from "../global_components/home";

export default async function ProfilePage() {
    const [username, password, id] = await must_login();

    const result = await get_users({ params: { "_id": new ObjectId(id) }, match_all: false });

    let user_data = {};
    if (result["success"] && result["result"]["total"] > 0) {
        user_data = JSON.parse(result["result"]["data"]);
    }

    return (
        <>
            <div className={styles.profile_container}>
                <Profile class_name={styles.profile_icon} in_profile={true} />
                <h1 className={styles.username_email}>{user_data["username"]} | {user_data["email"]}</h1>
                <div className={styles.post_count}>
                    <h2>-- Post Counts --</h2>
                    <h2>Photo : {user_data["post_counts"]["photo"]}</h2>
                    <h2>Video : {user_data["post_counts"]["video"]}</h2>
                </div>
                <div className={styles.like_stats}>
                    <h2>-- Likes Count --</h2>
                    <h2>{user_data["likes_count"]} Posts</h2>
                </div>
            </div>
            <HomeBtn />
        </>
    )
}