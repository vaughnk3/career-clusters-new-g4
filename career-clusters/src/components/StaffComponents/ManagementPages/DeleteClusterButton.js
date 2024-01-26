import './ManagementCluster.css';
import React, { useState, useEffect } from "react";


const DeleteClusterButton = ({ID}) => {
    const [isOpen, setIsOpen] = useState(false);
    const openPopup = () => {
        setIsOpen(true);
    }

    const closePopup = () => {
        setIsOpen(false);
    }
    const deleteCluster = async () => {
        try {

            const response = await(fetch('http://localhost:3001/login/staffclusters/clustermanagementpage/delete-cluster', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ID })
            }));
            if (response.ok) {
                console.log('Cluster deleted successfully');
            } else {
                console.error('Failed to delete cluster');
            } 
        }   catch (error) {
            console.error('Error deleting cluster: ', error);
        }
        console.log('POST request sent from delete button')
        setIsOpen(false);
    }

    return (
        <div id="deleteB">
                <button id="delete" onClick={openPopup}>Delete</button>
                {isOpen && (
                    <div className="popup">
                        <div className="popup-content">  
                            <h2>Test Delete</h2>
                            <button onClick={closePopup} className="cancelButton">Cancel</button>
                            <button id="deleteCluster" onClick={deleteCluster}>Delete</button>
                        </div>
                    </div>
                )}
            </div>
    )
}



export default DeleteClusterButton;