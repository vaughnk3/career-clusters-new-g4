import './ManagementSubCluster.css'
import './ManagementCluster.css'
import React, { useState, useEffect } from "react";

const EditDescriptionSubcluster = ({ID}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [subclusterDescrip, setsubclusterDescrip] = useState('');


    const openPopup = () => {
        setIsOpen(true);
    }

    const closePopup = () => {
        setIsOpen(false);
    }

    const refreshPage = () => {
        window.location.reload();
    }

    const changeSubClusterDescrip = async () => {
        try {

            const response = await(fetch('http://localhost:3001/login/staffclusters/staffsubclusters/subclustermanagementpage/edit-subcluster-descrip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ subclusterDescrip, ID })
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
        <div className="Description">
            <button className="editDescription" onClick={openPopup}>Edit Description</button>
            {isOpen && (
                    <div className="popup">
                        <div className="popup-content">  
                            <h2>Test Edit Descrip</h2>
                            <input type="text" id="subclusterDescrip" name="subclusterDescrip" placeholder="Enter the changed SubCluster description." value={subclusterDescrip} onChange={(e) => setsubclusterDescrip(e.target.value)}></input>
                            <button id="submitName" onClick={changeSubClusterDescrip}>Submit</button>
                            <button onClick={closePopup} className="cancelButton">Cancel</button>
                        </div>
                    </div>
            )}
        </div>
    )
}


export default EditDescriptionSubcluster;