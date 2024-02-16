import './ManagementSubCluster.css'
import './ManagementCluster.css'
import React, { useState } from "react";


const DeleteSubClusterButton = ({ID}) => {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => {
        setIsOpen(true);
    }

    const closePopup = () => {
        setIsOpen(false);
    }

    const refreshPage = () => {
        window.location.reload();
    }

    const DeleteSubCluster = async () => {
        try {

            const response = await(fetch('http://localhost:3001/subclustermanagementpage/delete-subcluster', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ID })
            }));
            if (response.ok) {
                console.log('SubCluster deleted successfully');
            } else {
                console.error('Failed to delete subcluster');
            } 
        }   catch (error) {
            console.error('Error deleting subcluster: ', error);
        }
        console.log('POST request sent from delete subcluster')
        setIsOpen(false);
        refreshPage();
    }

    return (
        <div className="Delete">
            <button className="deleteButton" onClick={openPopup} >Delete</button>
            {isOpen && (
                    <div className="popup">
                        <div className="delete-popup-content">  
                            <label for='deletebuttonrow'>Are you sure you want to delete this subcluster?</label>
                            <div className='deletebuttonrow'>
                            <button onClick={closePopup} className="cancelButton">Cancel</button>
                            <button id="deleteCluster" onClick={DeleteSubCluster}>Delete</button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}


export default DeleteSubClusterButton;