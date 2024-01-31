import './ManagementSubCluster.css'
import './ManagementCluster.css'
import React, { useState, useEffect } from "react";

const EditSalarySubCluster = ({ID}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [subclusterSalary, setsubclusterSalary] = useState('');


    const openPopup = () => {
        setIsOpen(true);
    }

    const closePopup = () => {
        setIsOpen(false);
    }

    const refreshPage = () => {
        window.location.reload();
    }

    const changeSubClusterSalary = async () => {
        try {

            const response = await(fetch('http://localhost:3001/login/staffclusters/staffsubclusters/subclustermanagementpage/edit-subcluster-salary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ subclusterSalary, ID })
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
        <div className="Salary">
            <button className="editSalary" onClick={openPopup}>Edit Salary</button>
            {isOpen && (
                    <div className="popup">
                        <div className="popup-content">  
                            <h2>Test Edit Education Level</h2>
                            <input type="text" id="subclusterSalary" name="subclusterSalary" placeholder="Enter the changed SubCluster salary." value={subclusterSalary} onChange={(e) => setsubclusterSalary(e.target.value)}></input>
                            <button id="submitName" onClick={changeSubClusterSalary}>Submit</button>
                            <button onClick={closePopup} className="cancelButton">Cancel</button>
                        </div>
                    </div>
            )}
        </div>
    )
}


export default EditSalarySubCluster;