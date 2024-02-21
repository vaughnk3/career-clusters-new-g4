import React, { useState } from "react";
import './SchoolManagementPage.css'

const SchoolPod = ({ID, schoolName}) => {
    console.log(schoolName, " ", ID)
    const [isOpen, setIsOpen] = useState(false);
    const [newSchoolName, setSchoolName] = useState('');

    const openPopup = () => {
        setIsOpen(true);
    }

    const closePopup = () => {
        setIsOpen(false);
    }

    const refreshPage = () => {
        window.location.reload();
    }


    const changeSchoolName = async () => {
        try {
            console.log(newSchoolName, ":", ID)
            const response = await(fetch('http://localhost:3001/manage-school-name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newSchoolName, ID })
            }));
            if (response.ok) {
                console.log('School name updated successfully');
            } else {
                console.error('Failed to update school name');
            } 
        }   catch (error) {
            console.error('Error updating school name: ', error);
        }
        console.log('POST request sent from edit button')
        setIsOpen(false);
        refreshPage();
    }
    return (
        <div id="school_pod">
            <h1>{schoolName}</h1>
            <button onClick={openPopup}>Edit School Name</button>
            {isOpen && (
                    <div className="popup">
                        <div className="popup-content">
                         
                            <label>Edit Name</label>
                            <input type="text" name="newSchoolName" placeholder="Enter the new school name." value={newSchoolName} onChange={(e) => setSchoolName(e.target.value)}></input>
                            <button onClick={closePopup}>Cancel</button>
                            <button onClick={changeSchoolName}>Submit</button>
                        </div>
                    </div>
                )}

        </div>
    )
}

export default SchoolPod;