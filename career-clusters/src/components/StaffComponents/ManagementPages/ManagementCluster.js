import React from "react";
import './ManagementCluster.css';

const ManagementCluster = ({ID, clusterName, onClick}) => {


    return (
        <div className='cluster_m'>
            <img src={ require('../../Cluster_Pictures/Mathematics.png') } className="cluster-pics" />
            <h2>{clusterName}</h2>
            <button id="edit_Name">Edit Name</button>
            <button id="replace_Image">Replace Image</button>
            <button id="delete">Delete</button>
        </div>
    )
}

export default ManagementCluster;