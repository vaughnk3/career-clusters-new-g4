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

        // Create account with inputted pw and email
        let uid = "";
        try {
        const response = await(fetch('http://localhost:3001/login/adminpage/create-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        }))

        if (response.ok) {
            const data = await response.json();
            uid = data.uid;
            console.log(uid);
        }

        }   catch (error) {
            console.log("Error");
        }
        
        
        //const [testUID, setTestUID] = useState('');
        //setTestUID(uid);
        
        /*
        try { uid = data.uid; } catch (error) {
            console.log("error getting UID");
        }*/
        
        console.log("NEW UID:    ", uid)
        
        const claims = {
            "uid": uid,
            "claims": {
              "admin": false,
              "clusterManagement": false,
              "subclusterManagement": false,
              "exportExcel": false,
              "createStaff": false,
              "modifyPerms": false,
              "schoolManagement":false,
              "clearClicks":false,
              "accessLevel": 1
            }
          }


          // Now that you should have the UID, set claims for that user
        const attemptPermsSet = async () => {
            try {
            const response = await(fetch('http://localhost:3001/login/adminpage/modifyperms/add-user-permission', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ uid, claims })
            }));
        } 
        catch (error) {
            console.log(error);
        }
    }

    // Call claims
        attemptPermsSet();


        //refreshPage();
        //navigate('/login/adminpage')
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