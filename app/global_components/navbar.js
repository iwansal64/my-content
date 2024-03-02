"use client"
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation"
import anime from "animejs";
import { useEffect, useMemo } from "react";
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

    useEffect(() => {
        const link_container_element = document.getElementsByClassName("navigation_side")[0];

        const link_elements = document.getElementsByClassName("link");
        const active_link_element = link_elements[active_index];
        const not_active_link_elements = Array.from(link_elements).filter((value) => value != active_link_element);

        Array.from(link_elements).forEach((element) => {
            Array.from(element.children)[0].classList.add("not_visible");
        });

        if (typeof from != "undefined" && !isNaN(from) && from < Object.keys(links).length) {
            // Adding A Not Active Bg Element For Non Active Link
            Array.from(link_elements).forEach((link_element) => {
                link_element.children[1].classList.remove("not_visible");
            })

            active_link_element.children[1].classList.add("not_visible");

            // Adding An Active Bg Element For Ex Active Link
            const ex_active_link_element = link_elements[from];

            const offset_top = ex_active_link_element.children[0].parentElement.offsetTop;
            const bg_active_element = document.createElement("div");

            bg_active_element.className = "bg_active";
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

            bg_active_element.className = "bg_active";
            bg_active_element.style.top = offset_top + "px";

            link_container_element.appendChild(bg_active_element);


            not_active_link_elements.forEach((not_active_link_element) => {
                not_active_link_element.children[1].classList.remove("not_visible");
            })

            active_link_element.children[1].classList.add("not_visible");
        }
    }, [active_index, from, links])

    return (
        <>
            <nav className="nav">
                <div className="upper_side">
                    <div className="logo_side">
                        <Logo />
                    </div>
                    <div className="navigation_side">
                        {Object.entries(links).map(([text, link], index) =>
                            <Link key={index} className={`${'link'} ${active_index == index ? "active" : ''}`} href={link + "?from=" + active_index}>{text}
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
                        <Profile />
                        <h2 className="username">{username}</h2>
                    </div>
                </div>
            </nav>
        </>
    )
}