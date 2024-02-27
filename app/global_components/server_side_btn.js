"use client"
export default function ServerSideButton({ callback = async () => { }, text = "", params = {} }) {

    const handle_click = async () => {
        await callback(params);
    }

    return (
        <>
            <button type="button" style={{ position: "absolute" }} onClick={handle_click}>{text}</button>
        </>
    )

}