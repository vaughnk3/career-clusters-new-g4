import './ManagementSubCluster.css'
import './ManagementCluster.css'
import React, { useState } from "react";

const EditDescriptionSubcluster = ({ID}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [subclusterDescrip, setsubclusterDescrip] = useState('');
    const [openError, setOpenError] = useState(false);


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

    const changeSubClusterDescrip = async () => {
        try {

            const response = await(fetch('http://localhost:3001/subclustermanagementpage/edit-subcluster-descrip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ subclusterDescrip, ID })
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
        <div className="Description">
            <button className="editDescription" onClick={openPopup}>Edit Description</button>
            {isOpen && (
                    <div className="popup">
                        <div className="popup-content">  
                            <label for='subclusterDescription' className='newsc-left'>Edit Description</label>
                            <input type="text" id="subclusterDescrip" name="subclusterDescrip" placeholder="Enter the changed SubCluster description." value={subclusterDescrip} onChange={(e) => setsubclusterDescrip(e.target.value)}></input>
                            <div className='replacebuttonrow'>
                            <button onClick={closePopup} className="cancelButton">Cancel</button>
                            <button id="submitName" onClick={changeSubClusterDescrip}>Submit</button>
                            </div>
                        </div>
                    </div>
            )}

            {openError && (
                <div className="popup">
                    <div className="popup-content">
                        <h1>Error</h1>
                            <p>Error updating SubCluster description.</p>
                            <button onClick={closeError}>Acknowledge and Refresh</button>
                     </div>
                </div>
            )}
        </div>
    )
}


export default EditDescriptionSubcluster;