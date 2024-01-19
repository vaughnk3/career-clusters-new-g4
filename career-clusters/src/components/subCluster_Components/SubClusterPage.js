import BottomRectangle from "../page_Components/BottomRectangle.js";
import UserIcon from "../page_Components/UserIcon.js";
import TopRectangle from "../page_Components/TopRectangle.js";
import { useLocation } from 'react-router-dom';
import SubCluster from "./SubCluster.js";
import './SubClusterPage.css'
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Cluster from "../cluster_Components/Cluster.js";




const SubClusterPage = ( {} ) => {
    const navigate = useNavigate();
   

    const handleClusterClick = (SubID) => {
        console.log(SubID)
        navigate('/cluster/subcluster/subclusterinfo')

    }

    return (
        <div id="page">
        <div id="_topRectangle">
            <p>Please select a subcluster within the BLANK cluster.</p>
        </div>
            <UserIcon/>
            {/* <h1 id="test">{clusterID}</h1> */}
            <div id="content">
                <br></br>
                <br></br>
                <h2>SubCluster Page</h2>
            </div>

            <BottomRectangle/>
        </div>
    )
}


export default SubClusterPage;