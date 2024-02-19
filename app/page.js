'use server'
import styles from "./page.module.css";
import { must_login } from "@/server_functionalities/server_security";
import NavBar from "./global_components/navbar";
import StatusesSection from "./_components/statuses_section";

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
    </>
  );
}
