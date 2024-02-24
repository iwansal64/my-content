'use server'
import styles from "./page.module.css";
import { must_login } from "@/server_functionalities/server_security";
import NavBar from "./global_components/navbar";
import ServerSideBtn from "./global_components/server_side_btn";
import { logout } from "./client_functionalities/user_manager_functions";
import { get_posts } from "@/server_functionalities/database_post"
import { get_users } from "@/server_functionalities/database_user";
import Post from "./_components/post_container";
import { ObjectId } from "mongodb";
import { show_message } from "./client_functionalities/ui_functions";


export default async function Home() {
  await must_login();

  const { success, message, result } = await get_posts({});
  result["data"] = JSON.parse(result["data"]);

  for (let index = 0; index < result["total"]; index++) {
    const data = result["data"][index];
    const creator = JSON.parse((await get_users({ params: { "_id": (new ObjectId(data["creator_id"])) }, match_all: false }))["result"]["data"]);
    result["data"][index] = [data, creator];
  };

  if (!success) {
    show_message({ message });
  }

  console.log(result["data"]);

  return (
    <>
      <div className="navbar_container">
        <NavBar />
      </div>
      <div className={styles.home_container}>
        <div className={styles.post_container}>
          {result["data"].map((value, index) => {
            const data = value[0];
            const user = value[1];

            return (
              <Post key={index} data={data} user={user} />
            );
          })}
        </div>
      </div>
      <ServerSideBtn callback={logout} />
    </>
  );
}
