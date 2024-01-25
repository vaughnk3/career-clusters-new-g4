import React from 'react';
//import { Link } from 'react-router-dom';


import './Cluster_S.css';


const Cluster_S = ( {id, clusterName, onClick} ) => {

  return (
    <div onClick={() => onClick(id)} className="cluster">
        <h2> {clusterName}
        </h2>
        <img src={require('../Cluster_Pictures/Mathematics.png') } alt="Cluster Picture" className="cluster-pics"></img>
    </div>
  );
}

export default Cluster_S;
