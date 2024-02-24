"use server"

import { must_login } from "@/server_functionalities/server_security"
import NavBar from "../global_components/navbar"

export default async function Explore() {
    const [username, password] = (await must_login()).split(":", 2)

    return (
        <>
            <NavBar username={username} active_index={1} />

        </>
    )
}