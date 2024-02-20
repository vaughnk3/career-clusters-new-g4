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
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Account created successfully!", userCredential);
        } catch (error) {
            console.error("Error creating account:", error.message);
        }

        refreshPage();
        navigate('/login/adminpage')
    }

    return (
    <>
        <TopRectangle/>
            
                <form id="form" onSubmit={handleSignUp}>
                <div>
                    <label> New Email</label>
                        <input type="email" value={email} className="field" onChange={(e) => setUserEmail(e.target.value)} required />
                
                <br></br>
                
                    <label> New Password</label>
                        <input type="password" value={password} className="field" onChange={(e) => setPassword(e.target.value)} required />
                        <br></br>
                        <button id="createAcc" type="submit">Create Account</button>
                    </div>
                   

                
                </form>

            <BottomRectangle/>
        </>
    )
}


export default CreateStaffAccount;