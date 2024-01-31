import React, { useState, useEffect } from "react";
import TopLeftLogo from '../page_Components/TopLeftLogo';
import BottomRectangle from '../page_Components/BottomRectangle';
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {initializeApp} from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

//Replace this with firebase config info :) (Not sure what some of these fields would be)
const firebaseConfig = {
  apiKey: "AIzaSyD1npOwsCve7cKnLGk7mwtUuesAmI_hwdU",
  authDomain: "career-clusters-9dcc3.firebaseapp.com",
  projectId: "career-clusters-9dcc3",
  storageBucket: "career-clusters-9dcc3.appspot.com",
  messagingSenderId: "884985748554",
  appId: "1:884985748554:web:29c9f24c69dd1cd8fcdab3",
  measurementId: "G-GJMD49N4ES"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//Initialize Firebase Auth
const auth = getAuth(app);



const LoginPage = () => {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');

    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
          const userCredential = await signInWithEmailAndPassword(auth, username, password);
          const user = userCredential.user;
          console.log('User logged in: ', user);

          navigate('/login/staffclusters/clustermanagementpage')
        } catch (error) {
          console.error('Login error:', error.message);
        }
    }

    return (
        <div id="page">
          <div id="topbar">
            <TopLeftLogo />
          </div>
          <div id="content">
            <div id="form">
              <form onSubmit={handleSubmit}>
                <label htmlFor="usernameField"><strong>Username</strong></label><br />
                <input
                  type="text"
                  className="field"
                  placeholder='Input username here'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                /><br />
                <label htmlFor="passwordField"><strong>Password</strong></label><br />
                <input
                  type="password"
                  className="field"
                  placeholder='Input password here'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                /><br />
                <p>Forgot Password?</p>
                <button type="submit" id="login-button">Login</button>
              </form>
            </div>
          </div>
    
          <BottomRectangle />
        </div>
      );

   /* return (
        <div id="page">
            <div id="topbar">
            <TopLeftLogo/>
        </div>
        <div id="content">
            <div id="form">
                <form>
                    <label for="usernameField"><strong>Username</strong></label><br></br>
                    <input type="text" class="field" placeholder='Input username here'/><br></br>
                    <label for="passwordField"><strong>Password</strong></label><br></br>
                    <input type="text" id="bottomField" placeholder='Input password here'/><br></br>
                    <p>Forgot Password?</p>
                    <a href="" id="login-button">Login</a>
                </form>
            </div>
        </div>

        <BottomRectangle/>
        </div>
    )*/
};


export default LoginPage;