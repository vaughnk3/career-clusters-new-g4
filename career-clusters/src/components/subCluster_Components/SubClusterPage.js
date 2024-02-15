import BottomRectangle from "../page_Components/BottomRectangle.js";
import UserIcon from "../page_Components/UserIcon.js";
import TopRectangle from "../page_Components/TopRectangle.js";
import { useLocation } from 'react-router-dom';
import SubCluster from "./SubCluster.js";
import './SubClusterPage.css'
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Cluster from "../cluster_Components/Cluster.js";
import { useParams } from 'react-router-dom';



const SubClusterPage = ({ }) => {
    const navigate = useNavigate();

    /*
    useEffect(() => {
        const handleBroswerBackClick = (event) => {
            event.preventDefault();
            navigate('/cluster')
        }

        window.addEventListener('popstate', handleBroswerBackClick);

    return () => window.removeEventListener('popstate', handleBroswerBackClick);
    }, [navigate]);
    */
    
    
    

    const handleSubClusterClick = (ID) => {
        console.log(ID)

        // Update the click count for subclusters
        const updateSubClusterClickCount = async () => {
            try {
                console.log("SUB   IDDDDDD, ", ID)
                const response = await (fetch('http://localhost:3001/updates-subclust-clickCnt', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( { subclusterID: ID })
                }));
                if (response.ok) {
                    console.log('SubCluster click count updated successfully');
                } else {
                    console.error('Failed to update subcluster clickount')
                }
            } catch (error) {
                console.error('Error updating subcluster clickcount: ', error)
            }
        }

        // Call the update click count function
        updateSubClusterClickCount();

        navigate('/cluster/subcluster/subclusterinfo')

    }

    const { clusterId } = useParams();
    const [subclusters, setSubclusters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubclusters = async () => {
            try {
                const response = await fetch(`http://localhost:3001/cluster/subcluster/${clusterId}`);
                if (!response.ok) {
                    throw new Error('Error fetching subclusters');
                }
                const data = await response.json();
                setSubclusters(data);
                setLoading(false);
            } catch (error) {
                console.error('Error: ', error);
            }
        }

        fetchSubclusters();
    }, [clusterId])

    if (loading) {
        return <div id="loading-animation"></div>
    }

    const subclusterF = subclusters.length > 0 ? subclusters[0] : {};

    return (
        <div id="page">
            <div id="_topRectangle">
                <p>Please select a subcluster within the {subclusterF.subclusterName} cluster.</p>
            </div>
            <UserIcon />
            {/* <h1 id="test">{clusterID}</h1> */}
            <div id="content">
                <br></br>
                <br></br>
                <br></br><br></br>
                <br></br><br></br>
                <ul>
                    {subclusters.map((subcluster) => (
                        <li>
                            <SubCluster key={subcluster.id} ID={subcluster.id} subID={subcluster.clusterID} subclusterName={subcluster.subclusterName} onClick={handleSubClusterClick}/>
                        </li>
                    ))}
                </ul>
            </div>

            <BottomRectangle />
        </div>
    )
}


export default SubClusterPage;