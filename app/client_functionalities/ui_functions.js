"use client"
import anime from "animejs";

export function show_message({ message, duration = 0, on_click_close = () => { console.log("Closed"); }, after_duration = () => { console.log("AFTER DURATION"); } }) {
    const message_container = document.querySelector("#message_container");
    const message_element = document.querySelector("#message_container > h2");
    const close_element = document.querySelector("#message_container .close_btn");


    message_element.textContent = message;
    message_container.classList.add("active");

    close_element.addEventListener("click", on_click_close);

    if (duration) {
        anime.timeline({
            targets: "#message_container > div.progress > div.bar",
            autoplay: true,
            easing: "linear",
            loop: false,
        }).add({
            translateX: "-100%",
            duration: 0
        }).add({
            translateX: "0",
            duration: duration
        }).finished.then(() => {
            after_duration();
            setTimeout(() => {
                message_container.classList.remove("active");
            }, 500);
        })
    }
}