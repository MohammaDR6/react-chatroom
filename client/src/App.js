import './App.css';
import { useState } from 'react';
import io from 'socket.io-client'
import Joiningroom from './components/Joiningroom/Joiningroom'
import Joiningroom from './components/Chatroom/Chatroom'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router >

      <Switch>
        <Route path="/joiningroom">
          <Joiningroom />
        </Route>
      </Switch>
      
      <Switch>
        <Route path="/chatroom">
          <Chatroom />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
