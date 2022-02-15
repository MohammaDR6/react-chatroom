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
    socket.emit("joinRoom", roomId)
    setAllowJoinRoom(true)
  }


  return (
    <Router>
      {!allowJoinRoom ?

      <div>
        <input type="text" className='userName' onChange={(e)=>{setuserName(e.target.value)}} />
        <input type="text" className='roomId' onChange={(e)=>{setroomId(e.target.value)}} />
        <Link onClick={joinRoom} to="/chatroom"> JOIN </Link> 
      </div>
      :
      <Switch>
        <Route path="/chatroom">
          <Chatroom />
        </Route>
      </Switch>
      }

    </Router>
  );
}

export default App;
