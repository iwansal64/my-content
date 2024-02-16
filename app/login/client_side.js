'use client'

import { server_handle_login } from "./page"
import { useState } from "react";

export function LoginBtn() {

    const [disable, setDisable] = useState(false);

    const handle_login = async () => {

        const username_or_email = document.querySelector("input#username_account").value;
        const password = document.querySelector("input#password").value;

        const { message, success } = await server_handle_login({ username_or_email, password });

        alert(message);

        if (success) {
            setDisable(true);
            window.location.href = "../";
        }

    }

    return (
        <button className="login_btn" type="button" disabled={disable} onClick={handle_login}>Login</button>
    )
}