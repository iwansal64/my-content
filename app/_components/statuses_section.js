"use client"
import { useRouter } from "next/router"
import styles from "../page.module.css"
import { useEffect } from "react"

function Status({ username, profile }) {

    return (
        <div className={styles.status}>
            <h1></h1>
        </div>
    )
}

function update_status() {

    const status_container = document.querySelector('.' + styles.status_container);
    console.log(status_container);

}

export default function StatusesSection() {

    useEffect(update_status, []);

    return (
        <>
            <div className={styles.status_container}></div>
        </>
    )

}