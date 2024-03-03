'use client'
import { delete_post } from "@/app/client_functionalities/user_manager_functions"
import styles from "../../post.module.css";

export default function DeleteBtn({ post_id }) {
    const handle_click = () => {
        if (confirm("Do you really want to delete this post?")) {
            delete_post({ post_id, stringify: true })
                .then((value) => {
                    value = JSON.parse(value);
                    if (value["success"]) {
                        window.location.href = "/";
                    }
                })
        }
    };

    return (
        <>
            <button onClick={handle_click} className={styles.delete_btn}>Delete</button>
        </>
    )
}