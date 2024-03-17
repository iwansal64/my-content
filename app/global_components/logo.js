'use client';
import Image from "next/image";

export default function Logo() {

    const logo_img_path = "/logo.svg";

    if (window.matchMedia("(max-width:500px)").matches) {
        return (
            <Image src={logo_img_path} style={{ backgroundColor: "transparent" }} alt="Logo" width={50} height={50} quality={25} priority="high" />
        );
    }
    else if (window.matchMedia("(max-width:700px)").matches) {
        return (
            <Image src={logo_img_path} style={{ backgroundColor: "transparent" }} alt="Logo" width={70} height={70} quality={25} priority="high" />
        );
    }
    else {
        return (
            <Image src={logo_img_path} style={{ backgroundColor: "transparent" }} alt="Logo" width={100} height={100} quality={25} priority="high" />
        );
    }

}