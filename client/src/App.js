import React, {Fragment} from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
//Redux
import {Provider} from 'react-redux';
import store from './store'

import './App.css';


const App = () => {
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
