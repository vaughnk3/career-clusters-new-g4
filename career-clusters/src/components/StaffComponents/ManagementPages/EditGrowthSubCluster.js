import './ManagementSubCluster.css'
import './ManagementCluster.css'
import React, { useState, useEffect } from "react";


const EditGrowthSubCluster = ({ID}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [subclusterGrowthRate, setsubclusterGrowthRate] = useState('');

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

    const changeSubClusterGrowthRate = async () => {
        try {

            const response = await(fetch('http://localhost:3001/login/staffclusters/staffsubclusters/subclustermanagementpage/edit-subcluster-growthrate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ subclusterGrowthRate, ID })
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
                            <button id="submitName" onClick={changeSubClusterGrowthRate}>Submit</button>
                            <button onClick={closePopup} className="cancelButton">Cancel</button>
                        </div>
                    </div>
            )}
        </div>
    )
}

export default EditGrowthSubCluster;