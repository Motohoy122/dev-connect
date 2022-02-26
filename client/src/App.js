import React, {Fragment, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
//Redux
import {Provider} from 'react-redux';
import store from './store'
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken'

import './App.css';

// Check for local storage on every mount/unmount if token is valid
if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    
      <div>
      <Provider store={store}>
      <Router>
      <Fragment>
        <section className="navSetup">
          <Navbar />
        </section>
          <section className="bodySetup">
          <Alert />
          <Routes> 
            <Route path="/" element={<Landing />} />
            
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
    
          </Routes>
          </section>
        </Fragment>
      </Router>
      </Provider>
      </div>
    
  );
}

export default App;
