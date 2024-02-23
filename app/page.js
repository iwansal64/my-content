'use server'
import styles from "./page.module.css";
import { must_login } from "@/server_functionalities/server_security";
import NavBar from "./global_components/navbar";
import ServerSideBtn from "./global_components/server_side_btn";
import { logout } from "./client_functionalities/user_manager_functions";
import { get_posts } from "@/server_functionalities/database_post"
import Post from "./_components/post_container";

export default async function Home() {
  await must_login();

  const { success, message, result } = await get_posts({});
  result["data"] = JSON.parse(result["data"]);

  if (!success) {
    alert(message);
  }

  return (
    <>
      <div className="navbar_container">
        <NavBar />
      </div>
      <div className={styles.home_container}>
        <div className={styles.post_container}>
          {result["data"].map((data, index) => {
            return (
              <Post key={index} data={data} />
            );
          })}
        </div>
      </div>
      <ServerSideBtn callback={logout} />
    </>
  );
}
