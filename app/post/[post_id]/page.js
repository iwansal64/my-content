import { get_posts } from "@/server_functionalities/database_post";
import { ObjectId } from "mongodb";
import styles from "../post.module.css";
import HomeBtn from "../../global_components/home";
import { Suspense } from "react";
import { PostFallback } from "@/app/global_components/fallback_components";
import { must_login } from "@/server_functionalities/server_security";
import LikeBtn from "./_components/like_btn";
import DeleteBtn from "./_components/delete_btn";
import MessageContainer from "@/app/global_components/message_container";

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
    );
}

async function ActionButtons({ post_id, user_id }) {
    const result = await get_posts({
        params: {
            "_id": new ObjectId(post_id),
        },
        match_all: false
    });

    const post_data = result["result"]["data"];
    const liked = post_data["users_like"].includes(user_id);

    return (
        <>
            <LikeBtn post_id={post_id} user_id={user_id} liked={liked} />
            {
                (() => {
                    if (post_data["creator_id"].toString() == user_id) {
                        return (
                            <DeleteBtn post_id={post_id} />
                        );
                    }
                })()
            }
        </>
    );
}

export default async function Post({ params }) {
    let [username, password, user_id] = await must_login();
    let post_id = params["post_id"];

    return (
        <>
            <div className={styles.post_container}>
                <Suspense fallback={<PostFallback />}>
                    <PostData post_id={post_id} />
                    <div className={styles.action_container}>
                        <ActionButtons post_id={post_id} user_id={user_id} />
                    </div>
                </Suspense>
            </div>
            <MessageContainer />
            <HomeBtn />
        </>
    );
}