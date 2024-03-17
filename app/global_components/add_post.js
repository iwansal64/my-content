import { useRouter } from "next/navigation";

export default function AddPost() {
    const router = useRouter();

    const handle_add_post = (event) => {
        router.push("post/");
    };

    const window_500pixels = window.matchMedia("(max-width: 500px)").matches;

    return (
        <button onClick={handle_add_post} className="add_post_btn">+{window_500pixels ? "" : " Add Post"}</button>
    );
}