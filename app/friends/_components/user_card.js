'use client'
import Profile from "@/app/global_components/profile";
import styles from "../friends.module.css";
import Link from "next/link";

export default function UserCard({ user_data }) {
    return (
        <>
            <Link href={`../../user/${user_data['_id'].toString()}/`} className={styles.user_card}>
                <div className={styles.profile}>
                    <Profile />
                </div>
                <div className={styles.info}>
                    <h1>{user_data["username"]}</h1>
                    <h4>{user_data["description"]}</h4>
                </div>
            </Link>
        </>
    )
}