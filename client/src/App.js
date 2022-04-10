import React, {Fragment, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddExperience from './components/profile-forms/AddExperience'
import AddEducation from './components/profile-forms/AddEducation'
import PrivateRoute from './components/routing/PrivateRoute'
import Profiles from './components/profiles/Profiles'
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
            <Route path="/profiles" element={<Profiles />} />
            <Route exact path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route exact path="/create-profile" element={
                <PrivateRoute>
                  <CreateProfile />
                </PrivateRoute>
              } 
            />
            <Route exact path="/edit-profile" element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
              } 
            />
            <Route exact path="/add-experience" element={
                <PrivateRoute>
                  <AddExperience />
                </PrivateRoute>
              } 
            />
            <Route exact path="/add-education" element={
                <PrivateRoute>
                  <AddEducation />
                </PrivateRoute>
              } 
            />
          </Routes>
          </section>
        </Fragment>
      </Router>
      </Provider>
      </div>
    
  );
}

export default App;
