"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import anime from "animejs";
import { useEffect, useMemo, useState } from "react";
import Logo from "./logo";
import Profile from "./profile";
import AddPost from "./add_post";

export default function NavBar({ active_index = 0, username = "" }) {
    const params = useSearchParams();
    let from = undefined;

    if (params.has("from")) {
        from = Number.parseInt(params.get("from"));
    }

    const links = useMemo(() => ({
        "Home": "/",
        "Trending": "/trending",
        "Friends": "/friends",
        "Community": "/community"
    }), []);

    const links_icons = {
        "Home": "/icons/home.png",
        "Trending": "/icons/trending.png",
        "Friends": "/icons/relation.png",
        "Community": "/icons/community.png"
    };

    useEffect(() => {
        const link_container_element = document.getElementsByClassName("navigation_side")[0];

        const link_elements = document.getElementsByClassName("link");
        const active_link_element = link_elements[active_index];
        const not_active_link_elements = Array.from(link_elements).filter((value) => value != active_link_element);

        Array.from(link_elements).forEach((element) => {
            Array.from(element.children)[1].classList.add("not_visible");
        });

        if (typeof from != "undefined" && !isNaN(from) && from < Object.keys(links).length) {
            // Adding A Not Active Bg Element For Non Active Link
            Array.from(link_elements).forEach((link_element) => {
                link_element.children[2].classList.remove("not_visible");
            });

            active_link_element.children[2].classList.add("not_visible");

            // Adding An Active Bg Element For Ex Active Link
            const ex_active_link_element = link_elements[from];

            const offset_top = ex_active_link_element.children[0].parentElement.offsetTop;
            const offset_left = ex_active_link_element.children[0].parentElement.offsetLeft;
            const bg_active_element = document.createElement("div");

            bg_active_element.className = "bg_active";
            bg_active_element.style.top = offset_top + "px";
            bg_active_element.style.left = offset_left + "px";
            bg_active_element.id = "bg_active_element_moving";

            link_container_element.appendChild(bg_active_element);

            const target_top = active_link_element.children[1].parentElement.offsetTop;
            const target_left = active_link_element.children[1].parentElement.offsetLeft;
            const target_width = active_link_element.children[1].parentElement.offsetWidth;
            const target_height = active_link_element.children[1].parentElement.offsetHeight;

            console.log(target_width);
            console.log(target_height);
            // Animate The Active Bg Element For Current Active Link
            anime.timeline({
                targets: "#bg_active_element_moving",
                duration: 200,
                easing: 'easeInOutQuad'
            }).add({
                width: target_width,
                height: target_height,
                duration: 0,
            }).add({
                left: target_left + "px",
                top: target_top + 'px',
            });
        }
        else {
            const offset_top = active_link_element.children[1].parentElement.offsetTop;
            const bg_active_element = document.createElement("div");

            bg_active_element.className = "bg_active";
            bg_active_element.style.top = offset_top + "px";

            link_container_element.appendChild(bg_active_element);


            not_active_link_elements.forEach((not_active_link_element) => {
                not_active_link_element.children[2].classList.remove("not_visible");
            });

            active_link_element.children[2].classList.add("not_visible");
        }
    }, [active_index, from, links]);

    const [window_500pixels, set_window_500pixels] = useState(true);

    useEffect(() => {
        set_window_500pixels(window.matchMedia("(max-width:500px)").matches);
    }, [set_window_500pixels]);
    return (
        <>
            <nav className="nav">
                <div className="upper_side">
                    <div className="logo_side">
                        <Logo />
                    </div>
                    <div className="navigation_side">
                        {Object.entries(links).map(([text, link], index) =>
                            <Link key={index} className={`${'link'} ${active_index == index ? "active" : ''}`} href={link + "?from=" + active_index}>
                                {
                                    (() => {
                                        if (window_500pixels) {
                                            return (
                                                <Image src={links_icons[text]} alt="icon" width={35} height={35} />
                                            );
                                        }
                                        return (
                                            <span>{text}</span>
                                        );
                                    })()
                                }
                                <div className="bg_tracker"></div>
                                <div className="bg_notactive not_visible"></div>
                            </Link>
                        )}
                    </div>
                </div>
                <div className="lower_side">
                    <div className="add_post">
                        <AddPost />
                    </div>
                    <div className="profile_side">
                        <Link style={{ borderWidth: "0" }} href={"user"} >
                            <Profile />
                        </Link>
                        <h2 className="username">{username}</h2>
                    </div>
                </div>
            </nav>
        </>
    );
}