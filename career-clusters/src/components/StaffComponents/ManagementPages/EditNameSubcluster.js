import './ManagementSubCluster.css'
import './ManagementCluster.css'
import React, { useState, useEffect } from "react";


const EditNameSubcluster = ({ID}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [subclusterName, setsubclusterName] = useState('');

    const openPopup = () => {
        setIsOpen(true);
    }

    const closePopup = () => {
        setIsOpen(false);
    }

    const refreshPage = () => {
        window.location.reload();
    }

    const changeSubClusterName = async () => {
        try {

            const response = await(fetch('http://localhost:3001/subclustermanagementpage/edit-subcluster-name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ subclusterName, ID })
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
        <div className="Name">
            <button className="editName" onClick={openPopup}>Edit Name</button>
            {isOpen && (
                    <div className="popup">
                        <div className="popup-content">
                         
                            <label for="subclusterName" className="newsc-left"><b>Edit Subcluster Name</b></label>
                            <input type="text" id="subclusterName" name="subclusterName" className='newsc-right2' placeholder="Enter the SubCluster name." value={subclusterName} onChange={(e) => setsubclusterName(e.target.value)}></input>
                        
                            <div className="replacebuttonrow">
                            <button onClick={closePopup} className="cancelButton">Cancel</button>
                            <button id="submitName" onClick={changeSubClusterName}>Submit</button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}


export default EditNameSubcluster;