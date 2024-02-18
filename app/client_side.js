"use client"
import Image from "next/image";
import styles from "./page.module.css"
import Link from "next/link";
import { useSearchParams } from "next/navigation"
import anime from "animejs";
import { useEffect, useMemo } from "react";

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

export function NavBar({ active_index = 0 }) {
    const params = useSearchParams();
    let from = undefined;

    if (params.has("from")) {
        from = Number.parseInt(params.get("from"));
    }

    const links = useMemo(() => {
        return {
            "Home": "/",
            "Explore": "/explore",
            "Message": "/message",
            "Community": "/community"
        }
    }, []);

    useEffect(() => {
        const link_container_element = document.getElementsByClassName(styles.navigation_side)[0];

        const link_elements = document.getElementsByClassName(styles.link);
        const active_link_element = link_elements[active_index];
        const not_active_link_elements = Array.from(link_elements).filter((value) => value != active_link_element);

        if (typeof from != "undefined" && !isNaN(from) && from < Object.keys(links).length) {
            // Adding A Not Active Bg Element For Non Active Link
            Array.from(link_elements).forEach((link_element) => {
                link_element.children[1].classList.remove(styles.not_visible);
            })

            active_link_element.children[1].classList.add(styles.not_visible);

            // Adding An Active Bg Element For Ex Active Link
            const ex_active_link_element = link_elements[from];

            const offset_top = ex_active_link_element.children[0].parentElement.offsetTop;
            const bg_active_element = document.createElement("div");

            bg_active_element.className = styles.bg_active;
            bg_active_element.style.top = offset_top + "px";
            bg_active_element.id = "bg_active_element_moving";

            link_container_element.appendChild(bg_active_element);

            const target_top = active_link_element.children[0].parentElement.offsetTop;

            // Animate The Active Bg Element For Current Active Link
            anime({
                targets: "#bg_active_element_moving",
                duration: 200,
                top: target_top + 'px',
                easing: 'easeInOutQuad'
            });
        }
        else {
            const offset_top = active_link_element.children[0].parentElement.offsetTop;
            const bg_active_element = document.createElement("div");

            bg_active_element.className = styles.bg_active;
            bg_active_element.style.top = offset_top + "px";

            link_container_element.appendChild(bg_active_element);

            console.log(offset_top);

            not_active_link_elements.forEach((not_active_link_element) => {
                not_active_link_element.children[1].classList.remove(styles.not_visible);
            })

            active_link_element.children[1].classList.add(styles.not_visible);
        }
    }, [active_index, from, links])

    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.upper_side}>
                    <div className={styles.logo_side}>
                        <Logo />
                    </div>
                    <div className={styles.navigation_side}>
                        {Object.entries(links).map(([text, link], index) =>
                            <Link key={index} className={`${styles.link} ${active_index == index ? styles.active : ''}`} href={link + "?from=" + active_index}>{text}
                                <div className={styles.bg_tracker}></div>
                                <div className={styles.bg_notactive + " " + styles.not_visible}></div>
                            </Link>
                        )}
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