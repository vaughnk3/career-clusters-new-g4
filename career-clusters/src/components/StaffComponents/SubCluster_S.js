import React from "react";
import './SubCluster_S.css'
import { Link } from 'react-router-dom';


const SubCluster_S = ( {ID, subID, subclusterName, onClick} ) => {
    return (
        <Link to={`/login/staffclusters/staffsubclusters/staffsubclusterinfo/${ID}`}>
        <div onClick={() => onClick(subID)} class="subcluster"> 
        <img src={ require('../Cluster_Pictures/Mathematics.png') } alt="SubCluster Picture" className="subcluster-pics"></img>
        <h2>{subclusterName}</h2>
        </div>
        </Link>
    );
};  

export default SubCluster_S;

//GetFieldImageByIDS(CareerClusterMap, ID, subID)