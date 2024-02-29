"use server"

import { must_login } from "@/server_functionalities/server_security"
import NavBar from "../global_components/navbar"
import TrendingPosts from "./_components/trending_posts"
import { Suspense } from "react"
import { PostPlaceHolder } from "../_components/post_container"

export default async function Trending() {
    const [username, password] = await must_login()

    return (
        <>
            <NavBar username={username} active_index={1} />
            <Suspense fallback={<PostPlaceHolder />}>
                <TrendingPosts />
            </Suspense>
        </>
    )
}