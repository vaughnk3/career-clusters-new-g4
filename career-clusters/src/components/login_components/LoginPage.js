import React from 'react';
import TopLeftLogo from '../page_Components/TopLeftLogo';
import BottomRectangle from '../page_Components/BottomRectangle';
import './LoginPage.css'



const LoginPage = () => {
    return (
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
    )
};


export default LoginPage;