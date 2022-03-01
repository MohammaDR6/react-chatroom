import React, { useContext } from "react";
import styles from "./Joinroom.module.scss";
import { useHistory } from "react-router-dom";
import LoginContext from "../LoginContext/LoginContext";

const Joinroom = ({ socket }) => {
  const history = useHistory();
  const [loginData, setLoginData] = useContext(LoginContext);

  function handleSubmit(e) {
    e.preventDefault()

    if (loginData.userName !== "" && loginData.roomId !== "") {
      socket.emit("joinRoom", loginData.roomId);
      history.push("/chatroom");
    }
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2 className="text"> Join a ROOM </h2>
      <input
        autoFocus
        type="text"
        className={styles.userName}
        placeholder="Username"
        value={loginData.userName}
        onChange={(e) => {
          setLoginData(p=>({...p,userName:e.target.value}));
        }}
      />
      <input
        type="text"
        className={styles.roomId}
        placeholder="RoomID"
        value={loginData.roomId}
        onChange={(e) => {
          setLoginData(p=>({...p,roomId:e.target.value}));
        }}
      />
      <button className={styles.joinButton}>
        {" "}
        JOIN{" "}
      </button>
    </form>
  );
};

export default Joinroom;
