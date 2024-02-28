'use client'
import Image from "next/image";

export default function Logo() {

    const logo_img_path = "/logo.svg";

    return (
        <Image src={logo_img_path} style={{ backgroundColor: "transparent" }} alt="Logo" width={100} height={100} quality={25} />
    )

}