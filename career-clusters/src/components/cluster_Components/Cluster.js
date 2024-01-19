import React from 'react';
//import { Link } from 'react-router-dom';


import './Cluster.css';


// THIS IS WHAT USED TO BE USED FOR QUERYING A CLUSTER TO DISPLAY
/*
<img src={require('./Cluster_Pictures/Mathematics.png') } alt="Cluster Picture" className="cluster-pics"></img> 
      <h2>{GetClusterNameByID(CareerClusterMap, ID)}</h2>
*/

const Cluster = ( {ID, onClick} ) => {

  return (
    <div onClick={() => onClick(ID)} class="cluster">
        <h2> Placeholder for cluster name / image
        <img src={require('../Cluster_Pictures/Mathematics.png') } alt="Cluster Picture" className="cluster-pics"></img> 
        </h2>
    </div>
  );
}

export default Cluster;
