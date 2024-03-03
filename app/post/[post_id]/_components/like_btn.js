'use client'
import { useState } from "react";
import { handle_like_post } from "@/app/client_functionalities/user_manager_functions"
import styles from "../../post.module.css";
import { show_message } from "@/app/client_functionalities/ui_functions";

export default function LikeBtn({ liked = false, user_id, post_id }) {
    const [button_class, set_button_class] = useState((liked ? styles.liked : styles.not_liked));

    const handle_click = () => {
        handle_like_post({ user_id, post_id });
        const message = button_class == styles.liked ? "Unlike the post!" : "Like the post!";
        set_button_class(button_class == styles.liked ? styles.not_liked : styles.liked);
        show_message({ message, duration: 1000 });
    };


    return (
        <>
            <button onClick={handle_click} className={button_class + " " + styles.like_btn}>{button_class == styles.liked ? "Liked" : "Like"}</button>
        </>
    )
}