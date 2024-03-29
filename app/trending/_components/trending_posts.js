'use server'
import { get_posts } from "@/server_functionalities/database_post";
import styles from "../trending.module.css"
import Link from "next/link";

async function Post({ data, number }) {

    if (!data) return <></>;

    if (data["post_description"].length > 100) {
        data["post_description"] = data["post_description"].substr(0, 100) + "...";
    }

    return (
        <>
            <Link className={styles.post} href={`/post/${data["_id"].toString()}`} >
                <div>
                    <h1>{number}. {data["post_title"]}</h1>
                    <h2>{data["post_description"]}</h2>
                    <h2>Likes : {data["likes_count"]}</h2>
                </div>
                <div>
                    <p>@{data["creator_name"]}</p>
                </div>
            </Link>
        </>
    )

}

export default async function TrendingPosts() {

    const posts_data_result = await get_posts({ params: {}, match_all: true });
    const posts_data = posts_data_result["result"]["data"];
    posts_data.sort((a, b) => b["likes_count"] - a["likes_count"]);

    return (
        <>
            <div className={styles.trending_posts_container}>
                {posts_data.map((value, index) => <Post key={index} data={value} number={index + 1} />)}
            </div>
        </>
    )
}