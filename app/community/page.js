"use server";

import NavBar from "../global_components/navbar";
import { must_login } from "@/server_functionalities/server_security";

export default async function Community() {
    const [username, password] = await must_login();

    return (
        <>
            <div className="navbar_container">
                <NavBar username={username} active_index={3} />
            </div>
        </>
    );
}