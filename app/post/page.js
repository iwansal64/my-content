'use server'

import { must_login } from "@/server_functionalities/server_security"
import styles from "./post.module.css"
import InputFieldContainer from "./_components/input_field_container"
import HomeBtn from "../global_components/home"
import MessageContainer from "../global_components/message_container"

export default async function Post() {
    const [username, password, id] = await must_login()

    const input_fields = {
        "Title": {
            "name": "post_title",
            "max_characters": 50,
            "rows": 1,
            "placeholder": "How to create a website"
        },
        "Description": {
            "name": "post_description",
            "max_characters": 100,
            "rows": 2,
            "placeholder": "A step-by-step how to create a website"
        },
        "Content": {
            "name": "post_contents",
            "max_characters": 5000,
            "rows": 10
        }
    }

    return (
        <>
            <div className={styles.main_wrapper}>
                <h1 className={styles.header}>Post An Article!</h1>
                <div className={styles.input_fields}>
                    <InputFieldContainer user_id={id} input_fields={input_fields} />
                </div>
            </div>
            <MessageContainer />
            <HomeBtn />
        </>
    )

}