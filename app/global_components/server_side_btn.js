"use client"
export default function ServerSideButton({ callback = async () => { }, text = "", params = {}, class_name = "" }) {

    const handle_click = async () => {
        await callback(params);
    }

    return (
        <>
            <button type="button" onClick={handle_click} className={class_name}>{text}</button>
        </>
    )

}