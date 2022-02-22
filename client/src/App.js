import './App.css';
import { useState } from 'react';
import io from 'socket.io-client'
import Chatroom from './components/Chatroom/Chatroom'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const socket = io.connect("http://localhost:3001")
  const [userName, setuserName] = useState("")
  const [roomId, setroomId] = useState("")
  const [allowJoinRoom, setAllowJoinRoom] = useState(false)

  const joinRoom = ()=> {
    if (roomId !== "" && userName !== "") {
      socket.emit("joinRoom", roomId)
      setAllowJoinRoom(true)
    }
  }

  return (
    <Router>

    {!allowJoinRoom ?
    <div className='container'>
      <h2 className='text'> Join a ROOM  </h2>
      <input type="text" className='userName' placeholder='Username' onChange={(e)=>{setuserName(e.target.value)}} />
      <input type="text" className='roomId' placeholder='RoomID' onChange={(e)=>{setroomId(e.target.value)}} />
      <div className='joinButton-container'>
        <Link onClick={joinRoom} to="/chatroom" className='joinButton'> JOIN </Link> 
      </div>
    </div>
    :
    <Switch>
      <Route path="/chatroom">
        <Chatroom socket={socket} userName={userName} roomId={roomId} />
      </Route>
    </Switch>
    }

  </Router>
  );
}

export default App;
