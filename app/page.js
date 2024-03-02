'use server'
import styles from "./page.module.css";
import { must_login } from "@/server_functionalities/server_security";
import NavBar from "./global_components/navbar";
import ServerSideBtn from "./global_components/server_side_btn";
import { get_posts } from "@/server_functionalities/database_post"
import { get_users } from "@/server_functionalities/database_user";
import PostCard from "./_components/post_card";
import { ObjectId } from "mongodb";
import { show_message } from "./client_functionalities/ui_functions";
import ServerSideMessage from "./global_components/server_side_message";
import MessageContainer from "./global_components/message_container";
import { Suspense } from "react";
import { PostFallback } from "./global_components/fallback_components";
import { logout } from "./client_functionalities/user_manager_functions";

async function PostContainer() {
  const { success, message, result } = await get_posts({});
  if (!success) {
    show_message({ message });
  }

  for (let index = 0; index < result["total"]; index++) {
    const data = result["data"][index];
    const creator = ((await get_users({ params: { "_id": (new ObjectId(data["creator_id"])) }, match_all: false }))["result"]["data"]);
    result["data"][index] = [data, creator];
  };

  return (
    <div className={styles.post_container}>
      {result["data"].map((value, index) => {
        const data = JSON.stringify(value[0]);
        const user = JSON.stringify(value[1]);

        return (
          <PostCard key={index} data={data} user={user} styles={styles} />
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
      <div className={styles.home_container}>
      </div>
      <ServerSideMessage message={"Welcome " + username + "!"} duration={2000} />
      <MessageContainer />
    </>
  );
}
