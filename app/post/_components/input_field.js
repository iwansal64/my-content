'use client'
import styles from "../post.module.css";

export default function InputField({ reset_functions = {}, set_reset_functions = () => { }, state, setState, name, rows = 5, max_characters = 2147483645, placeholder = "" }) {


    const handle_on_change = (event) => {
        if (!Object.keys(reset_functions).includes(name)) {
            const new_reset_functions = reset_functions;
            new_reset_functions[name] = () => {
                event.target.value = "";
            };

            set_reset_functions(new_reset_functions);
        }

        const new_data = state;

        new_data[name] = event.target.value;

        setState(new_data);
    };


    return (
        <>
            <textarea onChange={handle_on_change} className={styles.textarea_field} rows={rows} maxLength={max_characters} placeholder={placeholder} ></textarea>
        </>
    )
}