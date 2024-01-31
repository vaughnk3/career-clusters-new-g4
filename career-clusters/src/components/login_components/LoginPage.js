import React from 'react';
import TopLeftLogo from '../page_Components/TopLeftLogo';
import BottomRectangle from '../page_Components/BottomRectangle';
import './LoginPage.css'
import {initializeApp} from 'firebase/app';

//Replace this with firebase config info :) (Not sure what some of these fields would be)
const firebaseConfig = {
    apiKey: "", //Project's API key (Waiting on information)
    authDomain:: "", //Authentication domain
    projectId: "", //Firebase project ID
    storageBucket: "", //Project's storage bucket
    messagingSenderId: "", //Firebase messaging sender ID
    appId: "", //Firebase app ID
};

//Initialize Firebase Config
const app = initializeApp(firebaseConfig);






const LoginPage = () => {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
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