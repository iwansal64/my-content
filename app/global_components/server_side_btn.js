"use client"
export default function ServerSideButton({ callback = async () => { } }) {

    const handle_click = async () => {
        await callback();
    }

    return (
        <>
            <button type="button" style={{ position: "absolute" }} onClick={handle_click}>Logout</button>
        </>
    )

}