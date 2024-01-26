import './ManagementCluster.css';
import React, { useState, useEffect } from "react";


const DeleteClusterButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openPopup = () => {
        setIsOpen(true);
    }

    const closePopup = () => {
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
                        </div>
                    </div>
                )}
            </div>
    )
}



export default DeleteClusterButton;