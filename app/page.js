'use server'
import styles from "./page.module.css";
import { must_login } from "@/server_functionalities/server_security";
import NavBar from "./global_components/navbar";
import StatusesSection from "./_components/statuses_section";
import ServerSideBtn from "./global_components/server_side_btn";
import { logout } from "./global_functions/user_manager_functions";

export default async function Home() {
  await must_login();

  return (
    <>
      <div className="navbar_container">
        <NavBar />
      </div>
      <div className={styles.home_container}>
        <StatusesSection />
      </div>
      <ServerSideBtn callback={logout} />
    </>
  );
}
