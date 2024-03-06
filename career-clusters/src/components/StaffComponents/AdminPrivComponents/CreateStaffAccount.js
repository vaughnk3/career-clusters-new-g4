import TopRectangle from "../../page_Components/TopRectangle";
import BottomRectangle from "../../page_Components/BottomRectangle";
import React, { useState } from 'react'
import app from "../../login_components/FirebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import './CreateStaffAccount.css'


const CreateStaffAccount = () => {
    const [email, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth(app);

    const refreshPage = () => {
        window.location.reload();
    }

    const navigate = useNavigate();

    
    
    
    const handleSignUp = async (e) => {
        // OLD SIGN UP METHOD
        /*
        let userCredential = "";
        e.preventDefault();
        try {
            userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Account created successfully!", userCredential);
        } catch (error) {
            console.error("Error creating account:", error.message);
        }
        */
        e.preventDefault();
        // Create account with inputted pw and email
        try {
        const response = await(fetch('http://localhost:3001/login/adminpage/create-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        }))


        if (response.ok) {
            console.log('Sucessfully created user')
        }
        
        }   catch (error) {
            console.log("Error");
        }
             
        //refreshPage();
        navigate('/login/adminpage')
    }


    return (
    <div id="page">
        <TopRectangle/>
        <div class="content content-margin">
            <form id="form" onSubmit={handleSignUp}>
                <div>
                    <label> New Email</label>
                        <input type="email" value={email} className="field" onChange={(e) => setUserEmail(e.target.value)} required />
                    <label> New Password</label>
                        <input type="password" value={password} className="field" onChange={(e) => setPassword(e.target.value)} required />

                        <button id="createAcc" type="submit">Create Account</button>
                    </div>
                </form>
        </div>
        <BottomRectangle/>
        </div>
    )
}


export default CreateStaffAccount;