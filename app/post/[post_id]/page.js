import { get_posts } from "@/server_functionalities/database_post"
import { redirect } from "next/navigation"
import { ObjectId } from "mongodb";
import styles from "./post.module.css"
import HomeBtn from "../../global_components/home";
import { Suspense } from "react";
import { PostPlaceHolder } from "@/app/_components/post_container";
import LikeBtn from "./_components/like_btn";
import { must_login } from "@/server_functionalities/server_security";

export async function PostData({ post_id }) {
    const result = await get_posts({ params: { "_id": new ObjectId(post_id) }, match_all: false });

    const post_data = JSON.parse(result["result"]["data"]);

    return (
        <>
            <div className={styles.post_card}>
                <h1 className={styles.post_title}>{post_data["post_title"]}</h1>
                <hr />
                <h2 className={styles.post_desc}>{post_data["post_description"]}</h2>
            </div>
            <div className={styles.post_contents}>
                <p>
                    {post_data["post_contents"]}
                </p>
            </div>
        </>
    )
}

export default async function Post({ params }) {
    const [username, password, user_id] = await must_login();
    const post_id = params["post_id"];

    return (
        <>
            <div className={styles.post_container}>
                <Suspense fallback={<PostPlaceHolder />}>
                    <PostData post_id={post_id} />
                    <LikeBtn post_id={post_id} user_id={user_id} />
                </Suspense>
            </div>
            <HomeBtn />
        </>
    )
}