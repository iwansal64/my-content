'use server'
import styles from "./page.module.css";
import { must_login } from "@/server_functionalities/server_security";

export default async function Home() {
  await must_login();

  return (
    <>

    </>
  );
}
