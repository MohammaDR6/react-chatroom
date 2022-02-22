import React, { useState , useEffect} from 'react';
import styles from './Chatroom.module.scss'

const Chatroom = ({socket, userName, roomId}) => {

    const [Message, setMessage] = useState("")
    const [allMessages, setAllMessages] = useState([])

    const sendMessage = async ()=>{
        const messageData = {
            roomId: roomId,
            userName: userName,
            message: Message,
            time: new Date(Date.now).getHours + " "
        }
        setAllMessages((x) => [...x, messageData]);
        await socket.emit("send", messageData)
    }

    useEffect(() => {
        socket.on("receive", data => {
            setAllMessages((x) => [...x, data]);
    })
    }, [socket])

    return ( 
        <div>

            <div className={styles.header}>
                <h2> THIS IS HEADER </h2>
            </div>

            <div className={styles.chat_body}>
                {allMessages.map(e => {
                    return <h3> {e.message} </h3>
                })}
            </div>

            <div className={styles.footer}>
                <input type="text" onChange={(e)=>{setMessage(e.target.value)}}/>
                <button onClick={sendMessage}> send </button>
            </div>

        </div>
    );
}

export default Chatroom;
