import Link from "next/link";
import Image from "next/image";

export default function Profile({ class_name = "", in_profile = false }) {

    const profile_img_path = "/icon-profile.svg";

    if (window.matchMedia("(max-width:500px)").matches) {
        return (
            <Image src={profile_img_path} style={{ backgroundColor: "transparent" }} alt="Profile Logo" width={50} height={50} quality={1} />
        );
    }
    else if (window.matchMedia("(max-width:700px)").matches) {
        return (
            <Image src={profile_img_path} style={{ backgroundColor: "transparent" }} alt="Profile Logo" width={70} height={70} quality={1} />
        );
    }
    else {
        return (
            <Image src={profile_img_path} style={{ backgroundColor: "transparent" }} alt="Profile Logo" width={100} height={100} quality={1} />
        );
    }


}