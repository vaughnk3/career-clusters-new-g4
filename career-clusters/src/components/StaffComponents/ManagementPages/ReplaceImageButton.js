import './ManagementCluster.css';
import React, { useState, useEffect } from "react";


const ReplaceImageButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openPopup = () => {
        setIsOpen(true);
    }

    const closePopup = () => {
        setIsOpen(false);
    }


    return (
        <div id="replace">
            <button onClick={openPopup} id="replace_Image">Replace Image</button>
            {isOpen && (
                <div className="popup">
                    <div className="popup-content">  
                        <h2>Test Replace</h2>
                        <button onClick={closePopup} className="cancelButton">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    )
}



export default ReplaceImageButton;