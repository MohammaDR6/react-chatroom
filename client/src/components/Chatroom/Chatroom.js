import React, { useState, useEffect, useContext } from "react";
import styles from "./Chatroom.module.scss";
import LoginContext from "../LoginContext/LoginContext";

const Chatroom = ({ socket }) => {
  const [loginData, setLoginData] = useContext(LoginContext);
  const [Message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const sendMessage = async () => {
    const messageData = {
      roomId: loginData.roomId,
      userName: loginData.userName,
      message: Message,
      time: new Date(Date.now).getHours + " ",
    };
    setAllMessages((x) => [...x, messageData]);
    await socket.emit("send", messageData);
  };

  useEffect(() => {
    socket.on("receive", (data) => {
      setAllMessages((x) => [...x, data]);
    });
  }, [socket]);

  return (
      <div className={styles.container}>
        <form>
            <div className={styles.header}>
                <h2> you logged in : {loginData.userName} </h2>
            </div>

            <div className={styles.chat_body}>
                {allMessages.map((e) => {
                return <h3> {e.message} </h3>;
                })}
            </div>

            <div className={styles.footer}>
                <input
                type="text"
                onChange={(e) => {
                    setMessage(e.target.value);
                }}
                />
                <button onClick={sendMessage}> send </button>
            </div>
        </form>  
      </div>

  );
};

export default Chatroom;
