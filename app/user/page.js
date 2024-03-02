'use server'
import styles from "./user.module.css";
import Profile from "../global_components/profile";
import { must_login } from "@/server_functionalities/server_security";
import { get_users } from "@/server_functionalities/database_user";
import { ObjectId } from "mongodb";
import HomeBtn from "../global_components/home";
import ServerSideButton from "../global_components/server_side_btn";
import { logout } from "../client_functionalities/user_manager_functions";
import { Suspense } from "react";
import { PostFallback, UserFallback } from "../global_components/fallback_components";
import UserPostContainer from "./_components/user_post_container";

async function ProfileData({ user_id }) {
    const result = await get_users({ params: { "_id": new ObjectId(user_id) }, match_all: false });

    let user_data = {};
    if (result["success"] && result["result"]["total"] > 0) {
        user_data = result["result"]["data"];
    }

    return (
        <>
            <div className={styles.profile_container}>
                <Profile class_name={styles.profile_icon} in_profile={true} />
                <h1 className={styles.username_email}>{user_data["username"]} | {user_data["email"]}</h1>
                <p className={styles.description}>{user_data["description"]}</p>
                <br />
                <div className={styles.post_count}>
                    <p>Post Counts: {user_data["posts_count"]}</p>
                </div>
                <div className={styles.like_stats}>
                    <p>Likes Count: {user_data["likes_count"]} Posts</p>
                </div>
            </div>
        </>
    )
}


export default async function ProfilePage() {
    const [username, password, id] = await must_login();


    return (
        <>
            <div className={styles.main_wrapper}>
                <Suspense fallback={<UserFallback />} >
                    <ProfileData user_id={id} />
                </Suspense>
                <Suspense fallback={<PostFallback />} >
                    <UserPostContainer id={id} />
                </Suspense>
                <HomeBtn />
                <ServerSideButton callback={logout} class_name={styles.logout_btn} text="Logout" />
            </div>
        </>
    )
}