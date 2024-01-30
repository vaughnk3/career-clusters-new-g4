import TopRectangle from "../../page_Components/TopRectangle";
import BottomRectangle from "../../page_Components/BottomRectangle";
import './ClusterManagementPage.css';
import OverlayRectangle from "../OverlayRectangle";
import ManagementCluster from "./ManagementCluster";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './ManagementCluster.css';



const ClusterManagementPage = () => {
    const navigate = useNavigate();
    const [clusters, setClusters] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [clusterName, setClusterName] = useState('');
    const openPopup = () => {
        setIsOpen(true);
    }

    const closePopup = () => {
        setIsOpen(false);
    }

    const refreshPage = () => {
        window.location.reload();
      }

    const addCluster = async () => {
        try {

            const response = await(fetch('http://localhost:3001/login/staffclusters/clustermanagementpage/add-cluster', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ clusterName })
            }));
            if (response.ok) {
                console.log('Cluster added successfully');
            } else {
                console.error('Failed to add cluster');
            } 
        }   catch (error) {
            console.error('Error adding cluster: ', error);
        }
        console.log('POST request sent from add button')
        setIsOpen(false);
        refreshPage();
    }

    useEffect(() => {
        const fetchClusters = async () => {
            try {
                const response = await (fetch('http://localhost:3001/login/staffclusters/clustermanagementpage'));
                if (!response.ok) {
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
            <div id="_topRectangle">
                <button id="back_button" onClick={backButtonHandler}>Back</button>
                <button onClick={openPopup} id="add_cluster">Add Cluster</button>
                {isOpen && (
                    <div className="popup">
                        <div className="popup-content">                           
                            <div id="popupLeft">
                                <h2> Name </h2>
                                <h2> Image </h2>
                            </div>
                            <div id="popupRight">
                                <input type="text" id="clusterName" name="clusterName" placeholder="Enter the name of new cluster" value={clusterName} onChange={(e) => setClusterName(e.target.value)}></input>
                                <input type="file" id="img" name="img" accept="image/*"></input>
                            </div>
                            <div className="button-row">
                                <button className="cancelButton" onClick={closePopup}>Cancel</button>
                                <button className="addButton" onClick={addCluster}>Add</button>
                            </div>
                        </div>
                    </div>
                )}
                <h2>Cluster Management Page</h2>
                <h4>Please select an option for cluster management.</h4>
            </div>
            
            <br></br><br></br><br></br><br></br><br></br><br></br>
            <ul>
                {clusters.map((cluster) => (
                    <li>
                        <ManagementCluster key={cluster.id} ID={cluster.id} clusterName={cluster.clusterName} onClick="" />
                    </li>
                ))}
            </ul>


            <BottomRectangle />
        </div>



    )
}


export default ClusterManagementPage;
//<button id="add_cluster" >Add Cluster</button>

/*
<div>
                <button onClick={openPopup} id="add_cluster">Open Popup</button>
                {isOpen && (
                    <div className="popup">
                        <div className="popup-content">
                            <span className="close" onClick={closePopup}>&times;</span>                            
                            <div id="popupLeft">
                                <h2> Name </h2>
                                <h2> Image </h2>
                            </div>
                            <div id="popupRight">
                                <p>placeholder text</p>
                                <p>placeholder img</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>


*/