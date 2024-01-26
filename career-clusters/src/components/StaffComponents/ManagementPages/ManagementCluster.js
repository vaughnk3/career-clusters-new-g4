import './ManagementCluster.css';
import React, { useState, useEffect } from "react";
import EditNameButton from './EditNameButton';
import ReplaceImageButton from './ReplaceImageButton';
import DeleteClusterButton from './DeleteClusterButton';

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
            <EditNameButton ID={ID} clusterName={clusterName}/>
            <ReplaceImageButton/>
            <DeleteClusterButton/>
        </div>
    )
}

export default ManagementCluster;


