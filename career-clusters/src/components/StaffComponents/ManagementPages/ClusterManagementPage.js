import TopRectangle from "../../page_Components/TopRectangle";
import BottomRectangle from "../../page_Components/BottomRectangle";
import './ClusterManagementPage.css';
import OverlayRectangle from "../OverlayRectangle";
import ManagementCluster from "./ManagementCluster";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './PopUps.css';



const ClusterManagementPage = () => {
    const navigate = useNavigate();
    const [clusters, setClusters] = useState([]);

    useEffect(() => {
        const fetchClusters = async () => {
            try {
                const response = await (fetch('http://localhost:3001/login/staffclusters/clustermanagementpage'));
                if(!response.ok) {
                    throw new Error('Error fetching clusters');
                }
                const data = await response.json();
                setClusters(data);
            } catch (error) {
                console.error('Error: ', error);
            }
        }
        fetchClusters();
    }, []);


    const backButtonHandler = () => {
        navigate('/login/staffclusters');
    }
    return (
        <div id="page">
            <link rel="stylesheet" href="./PopUps.css"></link>
            <div id="_topRectangle">
                <button id="add_cluster" >Add Cluster</button>
                <button id="back_button" onClick={backButtonHandler}>Back</button>
                <h2>Cluster Management Page</h2>
                <h4>Please select an option for cluster management.</h4>
            </div>
            <br></br><br></br><br></br><br></br><br></br><br></br>
            <ul>
                    {clusters.map((clusters) => (
                        <li>
                            <ManagementCluster key={clusters.id} ID={clusters.id} clusterName={clusters.clusterName} onClick=""/>
                        </li>
                    ))}
                </ul>

            <BottomRectangle/>

        </div>


        
    )
}


export default ClusterManagementPage;