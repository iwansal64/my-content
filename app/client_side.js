"use client"
import Image from "next/image";
import styles from "./page.module.css"
import Link from "next/link";

function Logo() {

    const logo_img_path = "/logo.svg";

    return (
        <Image src={logo_img_path} style={{ backgroundColor: "transparent" }} alt="Logo" width={100} height={100} />
    )

}

function Profile() {

    const profile_img_path = "/icon-profile.svg";

    return (
        <button style={{ borderWidth: "0" }}>
            <Image src={profile_img_path} style={{ backgroundColor: "transparent" }} alt="Profile Logo" width={100} height={100} />
        </button>
    )

}

export function NavBar() {



    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.upper_side}>
                    <div className={styles.logo_side}>
                        <Logo />
                    </div>
                    <div className={styles.navigation_side}>
                        <Link className={`${styles.link} ${styles.active}`} href="/">Home</Link>
                        <Link className={`${styles.link}`} href="/explore">Explore</Link>
                        <Link className={`${styles.link}`} href="/message">Message</Link>
                        <Link className={`${styles.link}`} href="/community">Community</Link>
                    </div>
                </div>
                <div className={styles.lower_side}>
                    <div className={styles.profile_side}>
                        <Profile />
                    </div>
                </div>
            </nav>
        </>
    )

}