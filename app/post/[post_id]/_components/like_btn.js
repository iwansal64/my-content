'use client'
import { useState } from "react";
import { handle_like_post } from "@/app/client_functionalities/user_manager_functions"
import styles from "../../post.module.css";

export default function LikeBtn({ liked = false, user_id, post_id }) {
    const [button_class, set_button_class] = useState((liked ? styles.liked : styles.not_liked));

    const handle_click = () => {
        handle_like_post({ user_id, post_id });
        set_button_class(button_class == styles.liked ? styles.not_liked : styles.liked);
    };


    return (
        <>
            {/* <ServerSideButton text="Like" callback={handle_like_post} params={{ user_id, post_id }} class_name={(result["result"]["total"] > 0 ? styles.liked : styles.not_liked)} /> */}
            <button onClick={handle_click} className={button_class}>Like</button>
        </>
    )
}