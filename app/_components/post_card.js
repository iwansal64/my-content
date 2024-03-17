"use client";
import Link from "next/link";

export default function PostCard({ data, styles }) {
    data = JSON.parse(data);

    return (
        <>
            <Link href={"/post/" + data["_id"]} className={styles.post}>
                <h1>{data["post_title"]}</h1>
                <p>{data["post_description"]}</p>
                <p className={styles.user}>@{data["creator_name"]}</p>
            </Link>
        </>
    );
}