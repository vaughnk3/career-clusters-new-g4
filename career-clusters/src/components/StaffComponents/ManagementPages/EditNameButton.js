import './ManagementCluster.css';
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import app from "../../login_components/FirebaseConfig";


const EditNameButton = ({ID}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [clusterName, setClusterName] = useState('');
    const [errorOpen, setErrorOpen] = useState(false);

    const auth = getAuth(app);

    // Once the post request occurs, refresh the page so we can see the changes. 
    const refreshPage = () => {
        window.location.reload();
    }


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

    

    const changeClusterName = async () => {
        try {
            const user = auth.currentUser;
            if(user) {
                const token = await user.getIdToken();
                const response = await(fetch('http://localhost:3001/login/staffclusters/clustermanagementpage/edit-cluster-name', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ clusterName, ID })
            }));
            if (response.ok) {
                console.log('Cluster updated successfully');
                setIsOpen(false);
                refreshPage();
            } else {
                console.error('Failed to update cluster');
                setIsOpen(false);
                setErrorOpen(true);
            } 
        }
        }   catch (error) {
            console.error('Error updating cluster: ', error);
            setIsOpen(false);
            setErrorOpen(true);
        }
        //console.log('POST request sent from update button')
        //setIsOpen(false);
        //refreshPage();
    }


    

    return (
        <div id="name">
                <button id="edit_Name" onClick={openPopup}>Edit Name</button>
                {isOpen && (
                    <div className="popup">
                        <div className="popup-content">  
                            <h2>New Name</h2>
                            <input type="text" id="clusterName" name="clusterName" placeholder="Enter the changed cluster name." value={clusterName} onChange={(e) => setClusterName(e.target.value)}></input>
                            <div class="editbuttonrow">
                            <button onClick={closePopup} className="cancelButton">Cancel</button>
                            <button id="submitName" onClick={changeClusterName}>Submit</button>
                            </div>
                        </div>
                    </div>
                )}

                {errorOpen && (
                    <div className="popup">
                        <div className="popup-content">
                            <h1>Error</h1>
                            <p>Error editing cluster name.</p>
                            <button onClick={closeError}>Acknowledge and Refresh</button>
                        </div>
                    </div>
                )}

            </div>
    )
}



export default EditNameButton;