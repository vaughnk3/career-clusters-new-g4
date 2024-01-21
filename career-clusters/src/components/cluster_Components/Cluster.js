import React from 'react';
//import { Link } from 'react-router-dom';


import './Cluster.css';


// THIS IS WHAT USED TO BE USED FOR QUERYING A CLUSTER TO DISPLAY
/*
<img src={require('./Cluster_Pictures/Mathematics.png') } alt="Cluster Picture" className="cluster-pics"></img> 
      <h2>{GetClusterNameByID(CareerClusterMap, ID)}</h2>
*/

const Cluster = ( {id, clusterName, onClick} ) => {

  return (
    <div onClick={() => onClick(id)} class="cluster">
        <h2> {clusterName}
        </h2>
        <img src={require('../Cluster_Pictures/Mathematics.png') } alt="Cluster Picture" className="cluster-pics"></img>
    </div>
  );
}

export default Cluster;
