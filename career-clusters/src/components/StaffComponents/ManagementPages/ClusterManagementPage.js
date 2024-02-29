import BottomRectangle from "../../page_Components/BottomRectangle";
import './ClusterManagementPage.css';
import ManagementCluster from "./ManagementCluster";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './ManagementCluster.css';
import { getAuth } from "firebase/auth";
import app from "../../login_components/FirebaseConfig";


const ClusterManagementPage = () => {
    //Set all useState variables to be used in the file. 
    const navigate = useNavigate();
    const [clusters, setClusters] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [clusterName, setClusterName] = useState('');
    const [newImage, setNewImage] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth(app);

    //Open the popup
    const openPopup = () => {
        setIsOpen(true);
    }

    //Close the popup
    const closePopup = () => {
        setIsOpen(false);
    }

    //Refresh the page function when an add is done
    const refreshPage = () => {
        window.location.reload();
      }


    // Post request for adding a cluster
    const addCluster = async () => {
        try {
            const user = auth.currentUser;
            if(user) {
                const token = await user.getIdToken();
                const formData = new FormData();
                formData.append('image', newImage); // Append the file
                formData.append('clusterName', clusterName); // Append the clusterName as a text field
        
                const response = await fetch('http://localhost:3001/login/staffclusters/clustermanagementpage/add-cluster', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData,
                   
                });
        
                if (response.ok) {
                    console.log('Cluster and image added successfully');
    
                } else {
                    console.error('Failed to add cluster and upload image');
                }
            }
        } catch (error) {
            console.error('Error adding cluster and uploading image: ', error);
        }
        setIsOpen(false);
        refreshPage();
    };
    

    //Grab all the cluster information to display on the page
    useEffect(() => {
        const fetchClusters = async () => {
            try {
                const response = await (fetch('http://localhost:3001/login/staffclusters/clustermanagementpage'));
                if (!response.ok) {
                    throw new Error('Error fetching clusters');
                }
                const data = await response.json();
                setClusters(data);
                setLoading(false);
            } catch (error) {
                console.error('Error: ', error);
            }
        }
        fetchClusters();
    }, []);

    //If the page takes a while to load, display loading image.
    if (loading) {
        return <div id="loading-animation"></div>
    }

    //Navigation for a user clicking the back button
    const backButtonHandler = () => 
    {
        navigate('/login/staffclusters');
    }

    //Set the image when the user selects an image file to input
    const handleFileInputChange = (e) => 
    {
        setNewImage(e.target.files[0]);
    }

    return (
        <div id="page">
            <div id="_topRectangle">
                <button id="back_button" onClick={backButtonHandler}>Back</button>
                <button onClick={openPopup} id="add_cluster">Add Cluster +</button>
                {isOpen && (
                    <div className="popup">
                        <div className="popup-content">                           
                            <div id="popupLeft">
                                <h4> Name </h4>
                                <h4> Image </h4>
                                <br></br>
                            </div>
                            <div id="popupRight">
                                <input type="text" id="clusterNamePop" name="clusterName" placeholder="Enter the name of new cluster" value={clusterName} onChange={(e) => setClusterName(e.target.value)}></input>
                                <input type="file" id="imgN" name="imgN" accept="image/*" onChange={handleFileInputChange}></input>
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
            
            <br></br><br></br>
            <ul class="mgmt_list">
                {clusters.map((cluster) => (
                    <li>
                        <ManagementCluster key={cluster.id} ID={cluster.id} clusterName={cluster.clusterName} />
                    </li>
                ))}
            </ul>


            <BottomRectangle />
        </div>



    )
}

export default ClusterManagementPage;

