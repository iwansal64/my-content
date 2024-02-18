import { NavBar } from "../client_side"
import styles from "../page.module.css"

export default async function Message() {

    return (
        <>
            <NavBar style={styles.app} active_index={3} />

        </>
    )
}