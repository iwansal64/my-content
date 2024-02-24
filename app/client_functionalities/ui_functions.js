import anime from "animejs";

export function show_message({ message, duration = 0 }) {
    const message_container = document.querySelector("#message_container");
    const message_element = document.querySelector("#message_container > h2");
    const message_bar = document.querySelector("#message_container > div.progress > div.bar");

    message_element.textContent = message;
    message_container.classList.add("active");

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
    });
}