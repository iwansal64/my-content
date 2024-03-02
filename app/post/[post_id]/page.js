import { get_posts } from "@/server_functionalities/database_post"
import { ObjectId } from "mongodb";
import styles from "../post.module.css"
import HomeBtn from "../../global_components/home";
import { Suspense } from "react";
import { PostFallback } from "@/app/global_components/fallback_components";
import { must_login } from "@/server_functionalities/server_security";
import ServerSideButton from "@/app/global_components/server_side_btn";
import { handle_like_post, like_post, unlike_post } from "@/app/client_functionalities/user_manager_functions";

async function PostData({ post_id }) {
    const result = await get_posts({ params: { "_id": new ObjectId(post_id) }, match_all: false });

    const post_data = result["result"]["data"];

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

async function LikeBtn({ post_id, user_id }) {
    const result = await get_posts({
        params: {
            "_id": new ObjectId(post_id),
            "users_like": { $in: [new ObjectId(user_id)] }
        }
    });

    return (
        <>
            <ServerSideButton text="Like" callback={handle_like_post} params={{ user_id, post_id }} class_name={(result["result"]["total"] > 0 ? styles.liked : styles.not_liked)} />
        </>
    )
}

export default async function Post({ params }) {
    let [username, password, user_id] = await must_login();
    let post_id = params["post_id"];

    return (
        <>
            <div className={styles.post_container}>
                <Suspense fallback={<PostFallback />}>
                    <PostData post_id={post_id} />
                    <LikeBtn post_id={post_id} user_id={user_id} />
                </Suspense>
            </div>
            <HomeBtn />
        </>
    )
}