'use client'

import { show_message } from "@/app/client_functionalities/ui_functions";
import { add_post } from "@/app/client_functionalities/user_manager_functions";

export default function SubmitPostBtn({ user_id, post_data, reset, must_length: post_data_length = 0 }) {

    const handle_add_post = () => {
        console.log(post_data);
        if (Object.keys(post_data).length < post_data_length || Object.values(post_data).includes("")) {
            return false;
        }

        add_post({ user_id, post_data, stringify: true })
            .then((value) => {
                const result = JSON.parse(value);
                console.log(result);
                if (result["update_user_result"]["success"] && result["insert_post_result"]["success"]) {
                    show_message({ message: "Successfully post the article!", duration: 2000 })
                }
            });

        reset();
    };

    return (
        <button onClick={handle_add_post}>Post!</button>
    )
}