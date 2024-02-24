'use client'

import { server_handle_login } from "../page"
import { useEffect, useState } from "react";
import { show_message } from "@/app/client_functionalities/ui_functions";

export default function LoginBtn() {

    const [disable, setDisable] = useState(false);

    const handle_login = async () => {

        const username_or_email = document.querySelector("input#username_account").value;
        const password = document.querySelector("input#password").value;

        const { message, success } = await server_handle_login({ username_or_email, password });

        show_message({ message, duration: 2000 });
        if (success) {
            setTimeout(() => {
                setDisable(true);
                window.location.href = "../";
            }, 2000)
        }

    }

    return (
        <button className="login_btn" type="button" disabled={disable} onClick={handle_login}>Login</button>
    )
}