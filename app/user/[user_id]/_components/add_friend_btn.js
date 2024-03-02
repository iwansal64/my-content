'use client'
import { useState } from "react"
import styles from "../../user.module.css"
import { handle_add_friend, handle_remove_friend } from "../page"

export default function AddFriendButton({ user_id, already_add = false }) {
    const [added, set_added] = useState(already_add);

    const handle_click = () => {

        if (added) {
            handle_remove_friend(user_id).then(() => {
                set_added(!added);
            })
        }
        else {
            handle_add_friend(user_id).then(() => {
                set_added(!added);
            })
        }
    }

    return (
        <button onClick={handle_click} className={styles.logout_btn + (added ? " " + styles.already_add : "")} >{added ? "Remove" : "Add"} Friend</button>
    )
}