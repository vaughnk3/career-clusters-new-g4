import './ManagementSubCluster.css'
import './ManagementCluster.css'
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import app from "../../login_components/FirebaseConfig";

const EditSalarySubCluster = ({ID}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [subclusterSalary, setsubclusterSalary] = useState('');
    const [openError, setOpenError] = useState(false);

    const auth = getAuth(app);


    const openPopup = () => {
        setIsOpen(true);
    }

    const closePopup = () => {
        setIsOpen(false);
    }

    const refreshPage = () => {
        window.location.reload();
    }

    const closeError = () => {
        setOpenError(false);
        refreshPage();
    }

    const changeSubClusterSalary = async () => {
        try {
            const user = auth.currentUser;
            if(user) {
                const token = await user.getIdToken();
                const response = await(fetch('http://localhost:3001/subclustermanagementpage/edit-subcluster-salary', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ subclusterSalary, ID })
                }));
                if (response.ok) {
                    console.log('SubCluster name updated successfully');
                    setIsOpen(false);
                    refreshPage();
                } else {
                    console.error('Failed to update subcluster name');
                    setIsOpen(false);
                    setOpenError(true);
                } 
            }
        }   catch (error) {
            console.error('Error updating subcluster name: ', error);
            setIsOpen(false);
            setOpenError(true);
        }
        //console.log('POST request sent from edit button')
        //setIsOpen(false);
        //refreshPage();
    }

    return (
        <div className="cluster-button">
            <button className="editSalary" onClick={openPopup}>Edit Salary</button>
            {isOpen && (
                    <div className="popup">
                        <div className="popup-content">  
                            <label for="subclusterSalary" className="newsc-left">Salary</label>
                            <input type="text" id="subclusterSalary" name="subclusterSalary" placeholder="Enter the changed SubCluster salary." value={subclusterSalary} onChange={(e) => setsubclusterSalary(e.target.value)}></input>
                            <div className="replacebuttonrow">
                            <button onClick={closePopup} className="cancelButton">Cancel</button>
                            <button id="submitName" onClick={changeSubClusterSalary}>Submit</button>
                            </div>
                        </div>
                    </div>
            )}

            {openError && (
                <div className="popup">
                    <div className="popup-content">
                        <h1>Error</h1>
                        <p>Error updating SubCluster Salary.</p>
                        <button onClick={closeError}>Acknowledge and Refresh</button>
                    </div>
                </div>
            )}

        </div>
    )
}


export default EditSalarySubCluster;