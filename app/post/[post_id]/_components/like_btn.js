'use client'
import { make_transactions } from "@/server_functionalities/server_database_connection";

export default function LikeBtn({ user_id, post_id }) {
    const likePost = async (user_id, post_id) => {
        make_transactions({
            collections: [
                "posts",
                "users"
            ],
            params: [{
                _id: post_id
            }, {
                _id: user_id
            }],
            updated_data: [{
                $push: { liked_users: user_id },
                $inc: { likes_count: 1 }
            }, {
                $push: { liked_posts: post_id },
                $inc: { likes_count: 1 }
            }]
        })
            .then(() => { console.log("Successfully update data!"); })
            .catch(() => { console.log("There is conflict when updating data!"); });
    }

    return (
        <button onClick={() => { likePost(user_id, post_id) }} >Like</button>
    )
}