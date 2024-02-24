"use client"
import styles from "../page.module.css"
import Link from "next/link"

export function PostPlaceHolder() {

    return (
        <h1>Loading Contents . . .</h1>
    );
}

export default function Post({ data, user }) {
    return (
        <>
            <Link href={"post/" + data["_id"]} className={styles.post}>
                <h1>{data["post_title"]}</h1>
                <p>{data["post_description"]}</p>
                <p className={styles.user}>@{user["username"]}</p>
            </Link>
        </>
    )
}