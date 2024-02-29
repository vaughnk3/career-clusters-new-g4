import React, { useState  } from "react";
import TopLeftLogo from '../page_Components/TopLeftLogo';
import BottomRectangle from '../page_Components/BottomRectangle';
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {getAuth, sendPasswordResetEmail, signInWithEmailAndPassword} from "firebase/auth";
import app from "./FirebaseConfig"; 



// Initialize auth
const auth = getAuth(app);


const LoginPage = () => {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[email, setEmail] = useState('')

    //Define state methods for popup
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => { setIsOpen(true) }
    const closePopup = () => { setIsOpen(false) }


    const navigate = useNavigate();
    const adminUID = 'NW0QYGlDcaRCgEk8T8r9n3MgvP22'
    
    //Sign in handler with firebase
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
          const userCredential = await signInWithEmailAndPassword(auth, username, password);
          const user = userCredential.user;
          console.log('User logged in: ', user);
          if(user.uid === adminUID) {
            navigate('/login/adminpage')
          } else {
            navigate('/login/staffclusters')
          }
        } catch (error) {
          console.error('Login error:', error.message);
        }
    };


    //Handler for forgot password click with firebase
    const handleForgotPassSubmit = async (event) => {
      event.preventDefault();
       try {
        await sendPasswordResetEmail(auth, email);
       }
       catch (error) {
        console.error("Error sending password reset email: ", error);
       }
       setIsOpen(false);
    };

    return (
        <div id="page">
          <div id="topbar">
            <TopLeftLogo />
          </div>
          <div class="content">
            <div id="login-form">
              <form onSubmit={handleSubmit}>
                <label htmlFor="usernameField"><h3>Username</h3></label>
                <input
                  type="text"
                  className="field"
                  placeholder='Input username here'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="passwordField"><h3>Password</h3></label>
                <input
                  type="password"
                  className="field"
                  placeholder='Input password here'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p onClick={openPopup} >Forgot Password?</p>
                {isOpen && (
                  <div className="pass-popup"> 
                    <div className="pass-popup-content">
                        <label>
                          <h2 className="title">Email</h2>
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                        </label>
                        <button className="forgot-submit" type="submit" onClick={handleForgotPassSubmit}>Send Password Reset Email</button>
                        <button onClick={closePopup}>Cancel</button>
                    
                    </div>
                  </div>
                )}
                <button type="submit" class="demographic-button">Login</button>
              </form>
            </div>
          </div>
    
          <BottomRectangle />
        </div>
      );


};


export default LoginPage;