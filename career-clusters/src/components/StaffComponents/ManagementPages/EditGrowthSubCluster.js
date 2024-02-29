import './ManagementSubCluster.css'
import './ManagementCluster.css'
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import app from "../../login_components/FirebaseConfig";


const EditGrowthSubCluster = ({ID}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [subclusterGrowthRate, setsubclusterGrowthRate] = useState('');
    const [openError, setOpenError] = useState(false);

    const auth = getAuth(app);

    //When an option is selected, set the value in subclusterGrowth rate
    const handleSelectChange = (event) => {
        setsubclusterGrowthRate(event.target.value);
    };

    //Open popup function
    const openPopup = () => {
        setIsOpen(true);
    }

    //Close popup function
    const closePopup = () => {
        setIsOpen(false);
    }

    // Once the post request occurs, refresh the page so we can see the changes. 
    const refreshPage = () => {
        window.location.reload();
    }

    const closeError = () => {
        setOpenError(false);
        refreshPage();
    }

    const changeSubClusterGrowthRate = async () => {
        try {
            const user = auth.currentUser;
            if(user) {
                const token = await user.getIdToken();
                const response = await(fetch('http://localhost:3001/subclustermanagementpage/edit-subcluster-growthrate', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ subclusterGrowthRate, ID })
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
        <div className="GrowthRate">
            <button className="editGrowthRate" onClick={openPopup}>Edit Growth Rate</button>
            {isOpen && (
                    <div className="popup">
                        <div className="popup-content">  
                            <h2>Test Edit Descrip</h2>
                            <select id="growth-rate" name="rate" value={subclusterGrowthRate} onChange={handleSelectChange} >
                                <option>Select Below</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                            <div className="replacebuttonrow">
                            <button onClick={closePopup} className="cancelButton">Cancel</button>
                            <button id="submitName" onClick={changeSubClusterGrowthRate}>Submit</button>
                            </div>
                        </div>
                    </div>
            )}

            {openError && (
                <div className="popup">
                    <div className="popup-content">
                        <h1>Error</h1>
                        <p>Error updating SubCluster Growth Rate.</p>
                        <button onClick={closeError}>Acknowledge and Refresh</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditGrowthSubCluster;