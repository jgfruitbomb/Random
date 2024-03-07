const Notification = (props) => {
    if (!props.message)
        return;
    return (
        <h1>
            {props.message}
        </h1>
    )
}

export default Notification;