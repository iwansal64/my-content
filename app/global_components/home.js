'use client'

import Image from "next/image"

export default function HomeBtn() {
    const logo_path = "/logo.svg";

    const go_home = () => {
        window.location.href = "/";
    }

    return (
        <button className="home_btn" onClick={go_home}>
            <Image src={logo_path} alt="Home" width={50} height={50} />
        </button>
    )
}