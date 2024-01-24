    import React from "react";
    import './SubCluster.css'

    /*
    This is the OLD way we picked a subcluster to render
    <img src={ require('../Cluster_Pictures/Mathematics.png') } alt="SubCluster Picture" className="subcluster-pics"></img>
    <h2> { GetFieldNameByIDS(CareerClusterMap, ID, subID) } </h2>

    */


    const SubCluster = ( {ID, subID, subclusterName, onClick} ) => {
        return (
            <div onClick={() => onClick(subID)} class="subcluster"> 
            <img src={ require('../Cluster_Pictures/Mathematics.png') } alt="SubCluster Picture" className="subcluster-pics"></img>
            <h2>{subclusterName}</h2>
            </div>
        );
    };  

    export default SubCluster

    //GetFieldImageByIDS(CareerClusterMap, ID, subID)