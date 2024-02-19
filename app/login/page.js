"use server"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import LoginBtn from "./_components/login_btn";
import { connect_to_users_database } from "@/server_functionalities/server_database_connection";
import styles from "./page.module.css"

export async function server_handle_login({ username_or_email, password }) {

    const user_database = await connect_to_users_database();

    console.log(username_or_email);
    const user_by_username = await user_database.findOne({ username: username_or_email });
    const user_by_email = await user_database.findOne({ email: username_or_email });
    if (!user_by_username && !user_by_email) {
        return {
            "success": false,
            "message": "user not found!"
        };
    }

    const user = user_by_email ? user_by_email : user_by_username

    if (user["password"] == password) {
        const cookie_store = cookies();
        cookie_store.set("user-login-info", `${username_or_email}:${password}`, { maxAge: 60 * 60 * 24 });
        return {
            "success": true,
            "message": "successfully login!"
        }
    }
    else {
        return {
            "success": false,
            "message": "wrong password!"
        }
    }


}

export default async function Login() {

    return (
        <>
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
        </>
    )
}