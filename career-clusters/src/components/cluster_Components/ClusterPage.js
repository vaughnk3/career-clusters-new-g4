import React, { useState, useEffect } from "react";
import Cluster from './Cluster.js'
import BottomRectangle from "../page_Components/BottomRectangle.js"
import UserIcon from "../page_Components/UserIcon.js";
import { useNavigate } from 'react-router-dom';
import TopRectangle from "../page_Components/TopRectangle.js";
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
            }
        }
        fetchClusters();
    }, []);

    if (loading) {
        return <h1>OOOOH Dat page be loadinnggggg</h1>
     }

    const handleClusterClick = (ID) => {
        console.log(ID)
        navigate(`/cluster/subcluster/${ID}`);
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


