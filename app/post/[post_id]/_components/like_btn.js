'use client'
import { update_posts } from "@/server_functionalities/database_post";
import { update_users } from "@/server_functionalities/database_user";


export default function LikeBtn({ user_id, post_id }) {
    const likePost = async (user_id, post_id) => {
        // make_transactions({
        //     collections: [
        //         "posts",
        //         "users"
        //     ],
        //     params: [{
        //         _id: post_id
        //     }, {
        //         _id: user_id
        //     }],
        //     updated_data: [{
        //         $push: { liked_users: user_id },
        //         $inc: { likes_count: 1 }
        //     }, {
        //         $push: { liked_posts: post_id },
        //         $inc: { likes_count: 1 }
        //     }]
        // })
        //     .then(() => { console.log("Successfully update data!"); })
        //     .catch(() => { console.log("There is conflict when updating data!"); });

        console.log(user_id);

        const user_update_result = await update_users({
            params: {
                "_id": user_id
            },
            new_data: {
                $inc: { "likes_count": 1 },
                $push: { "liked_posts": post_id }
            },
            match_all: false
        });

        const post_update_result = await update_posts({
            params: {
                "_id": post_id
            },
            new_data: {
                $inc: { "likes_count": 1 },
                $push: { "liked_users": user_id }
            },
            match_all: false
        });

        console.log(user_update_result);
        console.log(post_update_result);
    }

    return (
        <button onClick={() => { likePost(user_id, post_id) }} >Like</button>
    )
}