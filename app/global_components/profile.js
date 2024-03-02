import Link from "next/link";
import Image from "next/image";

export default function Profile({ class_name = "", in_profile = false }) {

    const profile_img_path = "/icon-profile.svg";

    return (
        <Image src={profile_img_path} style={{ backgroundColor: "transparent" }} alt="Profile Logo" width={100} height={100} quality={1} />
    )

}