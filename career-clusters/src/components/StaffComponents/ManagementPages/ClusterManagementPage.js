import TopRectangle from "../../page_Components/TopRectangle";
import BottomRectangle from "../../page_Components/BottomRectangle";
import './ClusterManagementPage.css';
import OverlayRectangle from "../OverlayRectangle";
import ManagementCluster from "./ManagementCluster";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const ClusterManagementPage = () => {

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



    return (
        <div id="page">
            <div id="_topRectangle">
                <h2>Cluster Management Page</h2>
                <h4>Please select an option for cluster management.</h4>
            </div>

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