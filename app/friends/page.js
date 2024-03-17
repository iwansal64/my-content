"use server";

import NavBar from "../global_components/navbar";
import { must_login } from "@/server_functionalities/server_security";
import SearchFriends from "./_components/search_friends";
import styles from "./friends.module.css";
import { get_users } from "@/server_functionalities/database_user";
import { Suspense } from "react";
import { UserFallback } from "../global_components/fallback_components";

async function SearchFriendsStart({ user_id }) {

    const result = await get_users({ match_all: true, stringify: false });

    const data = JSON.stringify(result["result"]["data"]);

    return (
        <SearchFriends early_data={data} user_id={user_id} />
    );
}

export default async function Friends() {
    const [username, password, user_id] = await must_login();

    return (
        <>
            <div className="navbar_container">
                <NavBar username={username} active_index={2} />
            </div>
            <div className={styles.search_bar_container}>
                <Suspense fallback={<UserFallback />}>
                    <SearchFriendsStart user_id={user_id} />
                </Suspense>
            </div>
        </>
    );
}