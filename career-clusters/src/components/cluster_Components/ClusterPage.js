import React, { useState, useEffect } from "react";
import Cluster from './Cluster.js'
import BottomRectangle from "../page_Components/BottomRectangle.js"
import UserIcon from "../page_Components/UserIcon.js";
import { useNavigate } from 'react-router-dom';
import './ClusterPage.css';


const ClusterPage = () => {
    const navigate = useNavigate();
    const [clusters, setClusters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClusters = async () => {
            try {
                const response = await (fetch('http://localhost:3001/cluster'));
                if(!response.ok) {
                    throw new Error('Error fetching clusters');
                }
                const data = await response.json();
                setClusters(data);
                setLoading(false);
            } catch (error) {
                console.error('Error: ', error);
                //setLoading(false);
            }
        }
        fetchClusters();
    }, []);

    if (loading) {
        return <div id="loading-animation"></div>
     }

    const handleClusterClick = (ID) => {
        // Define method for updatinng cluster click count
        const updateClusterClickCount = async () => {
            try {
                console.log("IDDDDDD, ", ID)
                const response = await (fetch('http://localhost:3001/update-clust-clickCnt', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( { clusterID: ID })
                }));
                if (response.ok) {
                    console.log('Cluster click count updated successfully');
                } else {
                    console.error('Failed to update cluster clickount')
                }
            } catch (error) {
                console.error('Error updating cluster clickcount: ', error)
            }
        }

        // Call the update cluster click count method
        updateClusterClickCount();

        // Navigate to subcluster page
        navigate(`/cluster/subcluster/${ID}`);
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
 
            <li id="c_array">
                {clusters.map(cluster => (
                <form id="form1" onSubmit={handleFormSubmit}>
                    <Cluster key={cluster.id} id={cluster.id} clusterName={cluster.clusterName} onClick={handleClusterClick}/>
                </form>
                ))}
            </li>
     

  
        <BottomRectangle/>

    </div>
    )
}


export default ClusterPage;


