"use server"

import NavBar from "../global_components/navbar"
import { must_login } from "@/server_functionalities/server_security";
import SearchFriends from "./_components/search_friends";
import styles from "./friends.module.css"
import { get_users } from "@/server_functionalities/database_user";
import { Suspense } from "react";

async function SearchFriendsStart() {

    const result = await get_users({});

    const data = result["result"]["data"];

    return (
        <SearchFriends early_data={data} />
    )
}

export default async function Friends() {
    const [username, password] = await must_login();

    return (
        <>
            <NavBar username={username} active_index={2} />
            <div className={styles.search_bar_container}>
                <Suspense fallback={ }>
                    <SearchFriendsStart />
                </Suspense>
            </div>
        </>
    )
}