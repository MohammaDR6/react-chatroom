import io from 'socket.io-client'
import Chatroom from './components/Chatroom/Chatroom'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Joinroom from './components/Joinroom/Joinroom';
import { LoginContextProvider } from './components/LoginContext/LoginContext';

function App() {

  const socket = io.connect("http://localhost:3001")
  
  return (
    <LoginContextProvider >
      <Router>
      <Switch>
        <Route exact path="/">
          <Joinroom socket={socket}/>
        </Route>
        <Route path="/chatroom">
          <Chatroom socket={socket}/>
        </Route>
      </Switch>
      </Router>
    </LoginContextProvider >
  );
}

export default App;
