'use client'
import InputField from "./input_field";
import { useState } from "react";
import styles from "../post.module.css"
import SubmitPostBtn from "./post_btn"

export default function InputFieldContainer({ user_id, input_fields }) {
    const [input_field_data, set_input_field_data] = useState({});
    const input_field_data_length = Object.keys(input_fields).length;
    const [input_field_reset_functions, set_input_field_reset_functions] = useState({});

    const reset = () => {
        console.log(input_field_reset_functions);
        Object.values(input_field_reset_functions).forEach(reset_field => {
            reset_field();
        })
    }

    return (
        <>
            {Object.keys(input_fields).map((key, index) => {
                const value = input_fields[key];
                const { name, max_characters, rows, placeholder } = value;

                return (
                    <div key={index} className={styles.field}>
                        <h2 className={styles.label}>{key}</h2>
                        <InputField reset_functions={input_field_reset_functions} set_reset_functions={set_input_field_reset_functions} name={name} rows={rows} max_characters={max_characters} placeholder={placeholder} state={input_field_data} setState={set_input_field_data} />
                    </div>
                );
            })}
            <div className={styles.action_buttons}>
                <SubmitPostBtn user_id={user_id} post_data={input_field_data} reset={reset} must_length={input_field_data_length} />
            </div>
        </>
    )
}