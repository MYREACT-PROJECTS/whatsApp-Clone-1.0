//import logo from './logo.svg';
import React,{useState,useEffect} from 'react'
import Login from './Login'
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat'
import {useStateValue} from "./StateProvider";

import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
 

function App() {
   const[{user},dispatch] = useStateValue(  );
       
  return (
    <div className="app">
      
      {!user? (
        <Login />
      )
    :(  
      <div className="app__body">
        
        <Router>
        <Sidebar/>
         <Switch>
           <Route path="/rooms/:roomId">
            <Chat />
          </Route>
          <Route path="/" >{/*chat */ }
          <Chat />
          </Route>
         </Switch>
        </Router>
      </div>
       )}
    </div>
     
    
  );
}

export default App;
