'use server';
import styles from "./page.module.css";
import { must_login } from "@/server_functionalities/server_security";
import NavBar from "./global_components/navbar";
import { get_posts } from "@/server_functionalities/database_post";
import PostCard from "./_components/post_card";
import { show_message } from "./client_functionalities/ui_functions";
import ServerSideMessage from "./global_components/server_side_message";
import MessageContainer from "./global_components/message_container";
import { Suspense } from "react";
import { PostFallback } from "./global_components/fallback_components";

async function PostContainer() {
  const { success, message, result } = await get_posts({});
  if (!success) {
    show_message({ message });
  }

  return (
    <div className={styles.post_container}>
      {result["data"].map((value, index) => {
        const data = JSON.stringify(value);

        return (
          <PostCard key={index} data={data} styles={styles} />
        );
      })}
    </div>
  );
}

export default async function Home() {
  const [username, password] = await must_login();


  return (
    <>
      <div className="navbar_container">
        <NavBar username={username} active_index={0} />
      </div>
      <Suspense fallback={<PostFallback />}>
        <PostContainer />
      </Suspense>
      <ServerSideMessage message={"Welcome " + username + "!"} duration={2000} />
      <MessageContainer />
    </>
  );
}
