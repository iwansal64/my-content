"use server"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { LoginBtn } from "./client_side";
import { connect_to_users_database } from "@/server_functionalities/server_database_connection";

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
        cookie_store.set("user-login-info", `${username_or_email}:${password}`)
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
            <h1>Login</h1>
            <form action="" className="login-form">
                <div className="fields">
                    <div className="field">
                        <label htmlFor="username_account">Usermame / Account : </label>
                        <input type="text" name="username_account" id="username_account" autoComplete="on" />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password : </label>
                        <input type="password" name="password" id="password" autoComplete="off" />
                    </div>
                </div>
                <div className="action">
                    <LoginBtn></LoginBtn>
                </div>
            </form>
        </>
    )
}