"use server"

import NavBar from "../global_components/navbar"
import { must_login } from "@/server_functionalities/server_security";

export default async function Message() {
    const [username, password] = (await must_login()).split(":", 2);

    return (
        <>
            <NavBar username={username} active_index={3} />

        </>
    )
}