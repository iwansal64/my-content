"use client"
import { useEffect } from "react";
import { show_message } from "../client_functionalities/ui_functions";

export default function ServerSideMessage({ message, duration = 0 }) {
    useEffect(() => show_message({ message, duration }));

    return (
        <></>
    )
}