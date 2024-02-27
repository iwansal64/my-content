"use server"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import LoginBtn from "./_components/login_btn";
import { get_user_collection } from "@/server_functionalities/server_database_connection";
import styles from "./page.module.css"
import MessageContainer from "../global_components/message_container";

export async function server_handle_login({ username_or_email, password }) {

    const user_database = await get_user_collection();

    console.log(username_or_email);
    const user_by_username = await user_database.findOne({ username: username_or_email });
    const user_by_email = await user_database.findOne({ email: username_or_email });
    if (!user_by_username && !user_by_email) {
        return {
            "success": false,
            "message": "User Not Found!"
        };
    }

    const user = user_by_email ? user_by_email : user_by_username
    const id = user["_id"].toString();
    const username = user["username"];

    if (user["password"] == password) {
        const cookie_store = cookies();
        cookie_store.set("user-login-info", `${username}:${password}:${id}`, { maxAge: 60 * 60 * 24 });
        return {
            "success": true,
            "message": "Successfully Login! You'll be redirected in 2 seconds"
        }
    }
    else {
        return {
            "success": false,
            "message": "Wrong Password!"
        }
    }


}

export default async function Login() {

    return (
        <div className={styles.wrapper}>
            <form action="" className={styles.login_form}>
                <h1>Login</h1>
                <div className={styles.fields}>
                    <div className={styles.field}>
                        <label htmlFor="username_account">Usermame / Account : </label>
                        <input type="text" name="username_account" id="username_account" autoComplete="on" />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="password">Password : </label>
                        <input type="password" name="password" id="password" autoComplete="off" />
                    </div>
                </div>
                <div className={styles.action}>
                    <LoginBtn />
                </div>
            </form>
            <MessageContainer />
        </div>
    )
}