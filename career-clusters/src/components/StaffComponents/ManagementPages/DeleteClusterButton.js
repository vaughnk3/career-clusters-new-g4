import './ManagementCluster.css';
import React, { useState } from "react";


const DeleteClusterButton = ({ID}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);

    const openPopup = () => {
        setIsOpen(true);
    }

    const closePopup = () => {
        setIsOpen(false);
    }

    const closeError = () => {
        setErrorOpen(false);
        refreshPage();
    }

    
    const refreshPage = () => {
        window.location.reload();
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
                setIsOpen(false);
                refreshPage();
            } else {
                console.error('Failed to delete cluster');
                setIsOpen(false);
                setErrorOpen(true);
            } 
        }   catch (error) {
            console.error('Error deleting cluster: ', error);
            setIsOpen(false);
            setErrorOpen(true);
        }
        //console.log('POST request sent from delete button')
        //setIsOpen(false);
        //refreshPage();
    }

    return (
        <div id="deleteB">
                <button id="delete" onClick={openPopup}>Delete</button>
                {isOpen && (
                    <div className="popup">
                        <div className="delete-popup-content">  
                            <label htmlFor='deletebuttonrow'>Are you sure you want to delete this cluster?</label>
                            <div class="deletebuttonrow">
                            <button onClick={closePopup} className="cancelButton">Cancel</button>
                            <button id="deleteCluster" onClick={deleteCluster}>Delete</button>
                            </div>
                        </div>
                    </div>
                )}

                {errorOpen && (
                    <div className="popup">
                        <div className="popup-content">
                            <h1>Error</h1>
                            <p>Error deleting the cluster.</p>
                            <button onClick={closeError}>Acknowledge and Refresh</button>
                        </div>
                    </div>
                )}
            </div>
    )
}



export default DeleteClusterButton;