import './ManagementCluster.css';
import React, { useState, useEffect } from "react";

const ManagementCluster = ({ ID, clusterName, onClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const openPopup = () => {
        setIsOpen(true);
    }

    const closePopup = () => {
        setIsOpen(false);
    }


    return (
        <div className='cluster_m'>
            <img src={require('../../Cluster_Pictures/Mathematics.png')} className="cluster-pics" />
            <h2>{clusterName}</h2>
            <button id="edit_Name" onClick={openPopup}>Edit Name</button>
            <button id="replace_Image">Replace Image</button>
            <button id="delete">Delete</button>
        </div>
    )
}

export default ManagementCluster;


