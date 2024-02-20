"use client"
import styles from "../page.module.css"
import { useEffect } from "react"
import { get_users } from "../global_functions/database_user"

function Status({ username, profile }) {

    return (
        <div className={styles.status}>
            <h1></h1>
        </div>
    )
}

async function update_posts() {

    const post_container = document.querySelector('.' + styles.status_container);
    const user = await get_users({ params: { "username": "iwan" }, get_all: false });

    console.log(user);

}

export default function PostContainer() {

    useEffect(() => {
        update_posts();
    }, []);

    return (
        <>
            <div className={styles.status_container}></div>
        </>
    )

}