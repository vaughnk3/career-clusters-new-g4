import './ClusterManagementPage.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import BottomRectangle from '../../page_Components/BottomRectangle';
import ManagementSubCluster from './ManagementSubCluster';

const SubClusterManagementPage = () => {
    const navigate = useNavigate();
    const[subClusters, setSubClusters] = useState([]);

    const handleBackButton = () => {
        navigate('/login/staffclusters/staffsubclusters')
    }


    useEffect(() => {
        const fetchSubClusters = async () => {
            try {
                const response = await (fetch('http://localhost:3001/login/staffclusters/staffsubclusters/subclustermanagementpage'));
                if (!response.ok) {
                    throw new Error('Error fetching subclusters');
                }
                const data = await response.json();
                setSubClusters(data);
            } catch (error) {
                console.error('Error: ', error);
            }
        }
        fetchSubClusters();
    }, []);








    return (
        <div id="page">
            <div id="_topRectangle">
                <button id="back_button" onClick={handleBackButton}>Back</button>
                <button id="add_cluster" onClick={""}>Add SubCluster</button>


                <h1>SubCluster Managment Page</h1>
            </div>
            <br></br><br></br><br></br><br></br><br></br><br></br>


            <ul>
                {subClusters.map((subcluster) => (
                    <li>
                        <ManagementSubCluster key={subcluster.id} ID={subcluster.id} subclusterName={subcluster.subclusterName} onClick=""/>
                    </li>
                ))}
            </ul>


            <BottomRectangle/>
        </div>
    )
}



export default SubClusterManagementPage;