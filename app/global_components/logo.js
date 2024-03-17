'use client';
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Logo() {

    const logo_img_path = "/logo.svg";

    const [size, set_size] = useState(100);

    useEffect(() => {
        if (window.matchMedia("(max-width:500px)").matches) {
            set_size(50);
        }
        else if (window.matchMedia("(max-width:700px)").matches) {
            set_size(70);
        }
    }, [set_size]);

    return (
        <Image src={logo_img_path} style={{ backgroundColor: "transparent" }} alt="Logo" width={size} height={size} quality={25} priority="high" />
    );
}