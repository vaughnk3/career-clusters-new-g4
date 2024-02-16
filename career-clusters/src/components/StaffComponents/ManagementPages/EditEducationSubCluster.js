import './ManagementSubCluster.css'
import './ManagementCluster.css'
import React, { useState, useEffect } from "react";

const EditEducationSubCluster = ({ID}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [subclusterEducation, setsubclusterEducation] = useState('');


    const openPopup = () => {
        setIsOpen(true);
    }

    const closePopup = () => {
        setIsOpen(false);
    }

    const refreshPage = () => {
        window.location.reload();
    }

    const changeSubClusterEducation = async () => {
        try {

            const response = await(fetch('http://localhost:3001/subclustermanagementpage/edit-subcluster-education', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ subclusterEducation, ID })
            }));
            if (response.ok) {
                console.log('SubCluster name updated successfully');
            } else {
                console.error('Failed to update subcluster name');
            } 
        }   catch (error) {
            console.error('Error updating subcluster name: ', error);
        }
        console.log('POST request sent from edit button')
        setIsOpen(false);
        refreshPage();
    }



    return (
        <div className="Education">
            <button className="editEducation" onClick={openPopup}>Edit Education Level</button>
            {isOpen && (
                    <div className="popup">
                        <div className="popup-content">  
                            <label for="subclusterEducation" className="newsc-left">Edit Education Level</label>
                            <input type="text" id="subclusterEducation" name="subclusterEducation" placeholder="Enter the changed SubCluster education level." value={subclusterEducation} onChange={(e) => setsubclusterEducation(e.target.value)}></input>
                            <div className='replacebuttonrow'>
                            <button onClick={closePopup} className="cancelButton">Cancel</button>
                            <button id="submitName" onClick={changeSubClusterEducation}>Submit</button>
                            </div>
                        </div>
                    </div>
            )}
        </div>
    )
}


export default EditEducationSubCluster;
