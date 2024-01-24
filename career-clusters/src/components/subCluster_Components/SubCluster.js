    import React from "react";
    import './SubCluster.css'
    import { Link } from 'react-router-dom';

    /*
    This is the OLD way we picked a subcluster to render
    <img src={ require('../Cluster_Pictures/Mathematics.png') } alt="SubCluster Picture" className="subcluster-pics"></img>
    <h2> { GetFieldNameByIDS(CareerClusterMap, ID, subID) } </h2>

    */


    const SubCluster = ( {ID, subID, subclusterName, onClick} ) => {
        return (
            <Link to={`/cluster/subcluster/subclusterinfo/${ID}`}>
            <div onClick={() => onClick(subID)} class="subcluster"> 
            <img src={ require('../Cluster_Pictures/Mathematics.png') } alt="SubCluster Picture" className="subcluster-pics"></img>
            <h2>{subclusterName}</h2>
            </div>
            </Link>
        );
    };  

    export default SubCluster

    //GetFieldImageByIDS(CareerClusterMap, ID, subID)