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

            const response = await(fetch('http://localhost:3001/login/staffclusters/staffsubclusters/subclustermanagementpage/edit-subcluster-name', {
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
                            <h2>Test Edit Name</h2>
                            <input type="text" id="subclusterName" name="subclusterName" placeholder="Enter the changed SubCluster name." value={subclusterName} onChange={(e) => setsubclusterName(e.target.value)}></input>
                            <button id="submitName" onClick={changeSubClusterName}>Submit</button>
                            <button onClick={closePopup} className="cancelButton">Cancel</button>
                        </div>
                    </div>
                )}
        </div>
    )
}


export default EditNameSubcluster;