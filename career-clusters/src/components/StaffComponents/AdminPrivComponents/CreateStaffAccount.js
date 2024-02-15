import TopRectangle from "../../page_Components/TopRectangle";
import BottomRectangle from "../../page_Components/BottomRectangle";
import React, { useState } from 'react'
import app from "../../login_components/FirebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const CreateStaffAccount = () => {
    const [email, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth(app);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Account created successfully!", userCredential);
        } catch (error) {
            console.error("Error creating account:", error.message);
        }
    }

    return (
        <div>
            <TopRectangle/>
            <div>
                <form onSubmit={handleSignUp}>
                    <label>
                        Email: 
                        <input type="email" value={email} onChange={(e) => setUserEmail(e.target.value)} required />
                    </label>

                    <label>
                        Password: 
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>

                <button type="submit">Create Account</button>
                </form>

            </div>
            <BottomRectangle/>
        </div>
    )
}


export default CreateStaffAccount;