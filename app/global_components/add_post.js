import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddPost() {
    const router = useRouter();

    const handle_add_post = (event) => {
        router.push("post/");
    };

    const [window_500pixels, set_window_500pixels] = useState(false);
    useEffect(() => {
        set_window_500pixels(window.matchMedia("(max-width: 500px)").matches);
    }, [set_window_500pixels]);

    return (
        <button onClick={handle_add_post} className="add_post_btn">+{window_500pixels ? "" : " Add Post"}</button>
    );
}