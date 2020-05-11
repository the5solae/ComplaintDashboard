import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import './App.css';

import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegisterForm';
import Home from './components/Home/Home';
import AlertComponent from './components/Alert/Alert'; 
import Complaint from "./components/ComplaintForm/ComplaintForm"
import RetrieveComplaints from "./components/RetrieveComplaint/RetrieveComplaint"

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  const [user, updateUser] = useState(null);
  return (
    <Router>
    <div className="App">
      <Header title={title}/>
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/register">
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/login">
              <LoginForm showError={updateErrorMessage} updateTitle={updateTitle} userLoggedIn={updateUser}/>
            </Route>
            <Route path="/complaint">
              <Complaint showError={updateErrorMessage} updateTitle={updateTitle} userLoggedIn={user}/>
            </Route>
            <Route path="/getcomplaints">
              <RetrieveComplaints showError={updateErrorMessage} updateTitle={updateTitle} userLoggedIn={user}/>
            </Route>
            <Route path="/home">
            <nav className="navbar navbar-light" style={{color: "background-color: #e3f2fd"}}>
              <span className="navbar-text">
                Welcome to Complaint Dashboard {user}
              </span>
            </nav>
              <Home updateTitle={updateTitle} userLoggedIn={user}/>
            </Route>
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </div>
    </div>
    </Router>
  );
}

export default App;