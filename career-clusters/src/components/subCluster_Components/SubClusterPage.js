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


    const handleClusterClick = (SubID) => {
        console.log(SubID)
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
        return <h1>This page loading</h1>
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
                <h2>SubCluster Page</h2>
                <p>Cluster ID: {clusterId}</p>
                <ul>
                    {subclusters.map((subcluster) => (
                        <li>
                            <SubCluster key={subcluster.id} ID={subcluster.id} subID={subcluster.clusterID} subclusterName={subcluster.subclusterName} onClick={handleClusterClick}/>
                        </li>
                    ))}
                </ul>
            </div>

            <BottomRectangle />
        </div>
    )
}


export default SubClusterPage;