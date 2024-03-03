'use server'
import { get_posts } from "@/server_functionalities/database_post";
import { get_users } from "@/server_functionalities/database_user";
import PostCard from "@/app/_components/post_card";
import { ObjectId } from "mongodb";
import styles from "../user.module.css"

export default async function UserPostContainer({ id }) {
    const user_posts_data_result = await get_posts({
        params: {
            "creator_id": new ObjectId(id)
        },
        match_all: true,
        stringify: false
    });

    if (!user_posts_data_result["success"]) {
        show_message({ message: "There's an error when trying to get data!", duration: 5000 })
        return (
            <></>
        )
    }

    const user_posts_data = user_posts_data_result["result"]["data"];

    return (
        <>
            <div className={styles.post_container}>
                {user_posts_data.map((value, index) => {
                    const value_stringify = JSON.stringify(value);
                    return (
                        <PostCard key={index} data={value_stringify} styles={styles} />
                    );
                })}
            </div>
        </>
    )
}