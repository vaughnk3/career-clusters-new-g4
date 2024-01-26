import './ManagementCluster.css';
import React, { useState, useEffect } from "react";


const ReplaceImageButton = ({ID}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [newImage, setNewImage] = useState('');
    const openPopup = () => {
        setIsOpen(true);
    }

    const closePopup = () => {
        setIsOpen(false);
    }

    const changeClusterImage = async () => {
        try {

            const response = await(fetch('http://localhost:3001/login/staffclusters/clustermanagementpage/edit-cluster-img', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newImage, ID })
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
        <div id="replace">
            <button onClick={openPopup} id="replace_Image">Replace Image</button>
            {isOpen && (
                <div className="popup">
                    <div className="popup-content">  
                        <h2>Test Replace</h2>
                        <input type="file" id="img" name="img" accept="image/*" value={newImage} onChange={(e) => setNewImage(e.target.value)}></input>
                        <button id="submitImg" onClick={changeClusterImage}>Submit</button>
                        <button onClick={closePopup} className="cancelButton">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    )
}



export default ReplaceImageButton;