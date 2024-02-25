"use client"
export default function ServerSideButton({ callback = async () => { }, text = "" }) {

    const handle_click = async () => {
        await callback();
    }

    return (
        <>
            <button type="button" style={{ position: "absolute" }} onClick={handle_click}>{text}</button>
        </>
    )

}