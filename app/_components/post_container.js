"use client"
import styles from "../page.module.css"
import Link from "next/link"

function Status({ username, profile }) {

    return (
        <div className={styles.status}>
            <h1></h1>
        </div>
    )
}

export default function Post({ data }) {
    return (
        <>
            <Link href={"post/" + data["_id"]} className={styles.post}>
                <h1>{data["post_title"]}</h1>
                <p>{data["post_description"]}</p>
            </Link>
        </>
    )
}