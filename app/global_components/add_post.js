import { useRouter } from "next/navigation";

export default function AddPost() {
    const router = useRouter();

    const handle_add_post = (event) => {
        router.push("post/");
    };

    return (
        <button onClick={handle_add_post} className="add_post_btn">+ Add Post</button>
    )
}