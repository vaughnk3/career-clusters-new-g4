import { useNavigate } from 'react-router-dom'
import './SchoolManagementPage.css';
import React, { useState, useEffect } from "react";
import SchoolPod from './SchoolPod';
import BottomRectangle from '../../page_Components/BottomRectangle';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../login_components/FirebaseConfig"

const SchoolManagementPage = () => {

    const navigate = useNavigate();
    const auth = getAuth(app);
    const [schools, setSchools] = useState([]);
    const [newSchool, setNewSchool] = useState('')
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchSchools = async () => {
            try { 
                const response = await (fetch('http://localhost:3001/school'));
                if(!response.ok) {
                    throw new Error('Error fetching schools');
                }
                const data = await response.json();
                //console.log(data)
  
                setSchools(data);
                
            } catch (error) {
                console.error('Error: ', error);
            }
        }
        fetchSchools();
    }, []);

    const backButtonHandler = () => {
        navigate('/login/staffclusters/clustermanagementpage')
    }

     //Open the popup
     const openPopup = () => {
        setIsOpen(true);
    }

    //Close the popup
    const closePopup = () => {
        setIsOpen(false);
    }

    //Refresh the page function when an add is done
    const refreshPage = () => {
        window.location.reload();
      }



    const addNewSchool = async () => {
        try {
            const user = auth.currentUser;
            if(user){ 
                const token = await user.getIdToken();
                const response = await(fetch('http://localhost:3001/new-school', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ newSchool })
                }));
                if (response.ok) {
                    console.log('School added successfully');
                } else {
                    console.error('Failed to add new school');
                } 
            }
        }   catch (error) {
            console.error('Error adding school: ', error);
        }
        console.log('POST request sent from update button')
        setIsOpen(false);
        refreshPage();
    }

    return (
        <div id="page">
            <div id="_topRectangle">
                <button id="back_button_school" onClick={backButtonHandler}>Back</button>
                <button  id="add_school" onClick={openPopup}>Add School +</button>
                {isOpen && (
                    <div className="popup">
                        <div className="popup-content">                           
                            
                                <input type="text"  placeholder="Enter the name of new school" value={newSchool} onChange={(e) => setNewSchool(e.target.value)}></input>
                                <button onClick={closePopup}>Cancel</button>
                                <button onClick={addNewSchool}>Add School</button>
                            
                        </div>
                    </div>
                )}
            </div>
            <div class="content content-margin">
                <div id="school-management-list">
                {schools.map((school) => (
                <SchoolPod key={school.id} value={school.id} ID={school.id} schoolName={school.schoolName} />
                
                 ))}
                </div>
            </div>

            <BottomRectangle/>
        </div>
    )
}


export default SchoolManagementPage;