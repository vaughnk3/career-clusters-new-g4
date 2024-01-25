import TopRectangle from "../../page_Components/TopRectangle";
import BottomRectangle from "../../page_Components/BottomRectangle";
import './ClusterManagementPage.css';
import OverlayRectangle from "../OverlayRectangle";
import ManagementCluster from "./ManagementCluster";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import PopAddCluster from "./PopAddCluster";
import './ManagementCluster.css';



const ClusterManagementPage = () => {
    const navigate = useNavigate();
    const [clusters, setClusters] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const openPopup = () => {
        setIsOpen(true);
    }

    const closePopup = () => {
        setIsOpen(false);
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
                                <button className="cancelButton" onClick={closePopup}>Cancel</button>
                            </div>
                            <div id="popupRight">
                                <p>placeholder text</p>
                                <p>placeholder img</p>
                                <button className="addButton">Add</button>
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