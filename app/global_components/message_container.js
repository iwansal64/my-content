"use client"
export default function MessageContainer() {
    const handle_close = (event) => {
        event.target.parentElement.classList.remove("active")
    }

    return (
        <>
            <div id="message_container">
                <button className="close_btn" onClick={handle_close}>X</button>
                <h2>Waw</h2>
                <div className="progress">
                    <div className="bar"></div>
                </div>
            </div>
        </>
    )
}