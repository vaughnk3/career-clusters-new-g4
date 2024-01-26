import './ManagementCluster.css';
import React, { useState, useEffect } from "react";


const EditNameButton = ({ID, ClusterName}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [clusterName, setClusterName] = useState('');
    const openPopup = () => {
        setIsOpen(true);
    }

    const closePopup = () => {
        setIsOpen(false);
    }

    const changeClusterName = async () => {
        try {

            const response = await(fetch('http://localhost:3001/login/staffclusters/clustermanagementpage/edit-cluster-name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ clusterName, ID })
            }));
            if (response.ok) {
                console.log('Cluster updated successfully');
            } else {
                console.error('Failed to update cluster');
            } 
        }   catch (error) {
            console.error('Error updating cluster: ', error);
        }
        console.log('POST request sent from update button')
        setIsOpen(false);
    }

    return (
        <div id="name">
                <button id="edit_Name" onClick={openPopup}>Edit Name</button>
                {isOpen && (
                    <div className="popup">
                        <div className="popup-content">  
                            <h2>Test Edit</h2>
                            <input type="text" id="clusterName" name="clusterName" placeholder="Enter the changed cluster name." value={clusterName} onChange={(e) => setClusterName(e.target.value)}></input>
                            <button id="submitName" onClick={changeClusterName}>Submit</button>
                            <button onClick={closePopup} className="cancelButton">Cancel</button>
                        </div>
                    </div>
                )}
            </div>
    )
}



export default EditNameButton;