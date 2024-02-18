"use server"

import { NavBar } from "../client_side"
import styles from "../page.module.css"

export default async function Explore() {

    return (
        <>
            <NavBar style={styles.app} active_index={1} />

        </>
    )
}