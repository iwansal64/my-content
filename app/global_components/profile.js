'use client';
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Profile({ class_name = "", in_profile = false }) {

    const profile_img_path = "/icon-profile.svg";

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
        <Image src={profile_img_path} style={{ backgroundColor: "transparent" }} alt="Profile Logo" width={size} height={size} quality={1} />
    );
}