"use server";

import { must_login } from "@/server_functionalities/server_security";
import NavBar from "../global_components/navbar";
import TrendingPosts from "./_components/trending_posts";
import { Suspense } from "react";
import { PostFallback } from "../global_components/fallback_components";


export default async function Trending() {
    const [username, password] = await must_login();

    return (
        <>
            <div className="navbar_container">
                <NavBar username={username} active_index={1} />
            </div>
            <Suspense fallback={<PostFallback />}>
                <TrendingPosts />
            </Suspense>
        </>
    );
}