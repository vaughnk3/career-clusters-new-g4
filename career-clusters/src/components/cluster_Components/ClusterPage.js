import React, { useState } from "react";
import Cluster from './Cluster.js'
import BottomRectangle from "../page_Components/BottomRectangle.js"
import UserIcon from "../page_Components/UserIcon.js";
import { useNavigate } from 'react-router-dom';
import TopRectangle from "../page_Components/TopRectangle.js";
import './ClusterPage.css';


const ClusterPage = () => {
    const navigate = useNavigate();


    const handleClusterClick = (ID) => {
        console.log(ID)
        navigate('/cluster/subcluster')
        return ID;
    }

    const handleFormSubmit =(e) => {
        e.preventDefault();
        navigate('/cluster/subcluster')
    }

    return (
    <div>
        <div id="topRectangle">
            <h1>Welcome</h1>
            <p>Please select a cluster that interests you. This website will help match you with potential careers in your area of interest.</p>
        </div>
        <br></br><br></br><br></br><br></br><br></br><br></br> 
        <UserIcon/>
 
            <h2>Placeholder for cluster page</h2>
     

  
        <BottomRectangle/>

    </div>
    )
}


export default ClusterPage;


