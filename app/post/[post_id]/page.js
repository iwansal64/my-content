import { get_posts } from "@/server_functionalities/database_post"
import { redirect } from "next/navigation"
import { ObjectId } from "mongodb";
import styles from "./post.module.css"
import HomeBtn from "../../global_components/home";

export default async function Post({ params }) {
    const id = params["post_id"];
    const result = await get_posts({ params: { "_id": new ObjectId(id) }, match_all: false });

    const post_data = JSON.parse(result["result"]["data"]);

    return (
        <>
            <div className={styles.post_container}>
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
            </div>
            <HomeBtn />
        </>
    )
}