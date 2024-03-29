'use client'
import { useCallback, useState } from "react"
import styles from "../friends.module.css"
import { get_users } from "@/server_functionalities/database_user";
import UserCard from "./user_card";

export default function SearchFriends({ early_data, user_id = "" }) {
    early_data = JSON.parse(early_data);
    const [users, set_users] = useState(early_data);
    // const [username_search, set_username_search] = useState("");

    let timeout = setTimeout(() => { }, 5000);
    const handle_search = function (event) {
        // set_username_search(event.target.value);
        clearTimeout(timeout);

        timeout = setTimeout(async () => {
            const username_search = event.target.value;
            if (!username_search) {
                set_users(early_data);
                return;
            }

            // await get_users({
            //     params: {
            //         "username": new RegExp(`.*${username_search}.*`, "g")
            //     },
            //     match_all: false,
            //     stringify: true
            // });
            fetch(`/api/users?body_params=${JSON.stringify({ "params": { "username": { $regex: `${username_search}.*`, $options: "i" } }, "match_all": true, "stringify": true })}`, {
                "method": "GET",
                "headers": {
                    "authorization": "af3lchav8aopHHUugy89tUU8vgU99gnWBOibc0F",
                    "Content-Type": "application/json"
                }
            })
                .then((json_result) => json_result.json()
                    .then((value) => {
                        const result = JSON.parse(value);
                        if (result["result"]["total"] == 0) {
                            set_users([]);
                        }
                        else {
                            set_users(result["result"]["data"]);
                        }
                    }));

        }, 500);
    };

    return (
        <>
            <input type="text" className={styles.search_bar} placeholder="Search by username.." onChange={handle_search}></input>
            <div className={styles.users_list}>
                {users.map((value, index) => {
                    if (value["_id"].toString() == user_id) {
                        return undefined;
                    }

                    return (
                        <UserCard key={index} user_data={value} />
                    );
                })}
            </div>
        </>
    )
}