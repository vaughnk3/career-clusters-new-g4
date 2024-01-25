//import SubClusterPage from "../subCluster_Components/SubClusterPage";
//import OverlayRectangle from "./OverlayRectangle";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
//import Cluster from "../cluster_Components/Cluster.js";
import { useParams } from 'react-router-dom';
import SubCluster_S from "./SubCluster_S";

const StaffSubClusters = () => {
  const navigate = useNavigate();


    const handleClusterClick = (SubID) => {
        console.log(SubID)
        navigate('/login/staffclusters/staffsubclusters/staffsubclusterinfo')

    }

    const { clusterId } = useParams();
    const [subclusters, setSubclusters] = useState([]);

    useEffect(() => {
        const fetchSubclusters = async () => {
            try {
                const response = await fetch(`http://localhost:3001/login/staffclusters/staffsubclusters/${clusterId}`);
                if (!response.ok) {
                    throw new Error('Error fetching subclusters');
                }
                const data = await response.json();
                setSubclusters(data);
            } catch (error) {
                console.error('Error: ', error);
            }
        }

        fetchSubclusters();
    }, [clusterId])

    //const subclusterF = subclusters.length > 0 ? subclusters[0] : {};

    return (
        <div>
           <br></br><br></br><br></br><br></br><br></br><br></br> 
            <ul>
              {subclusters.map((subcluster) => (
                <li>
                  <SubCluster_S key={subcluster.id} ID={subcluster.id} subID={subcluster.clusterID} subclusterName={subcluster.subclusterName} onClick={handleClusterClick}/>
                 </li>
                ))}
            </ul>
            <div className="overlay">
            <div class="staff-button-column">
              <a class="staff-button" >Sub-Cluster Management</a>
              <a class="staff-button" >Logout</a>
            </div>
            <div class="staff-button-column">
              <a class="staff-button">Staff Management</a>
              <a class="staff-button">Export Data (.xlsx)</a>
            </div>
          </div>
        </div>
    )


}


export default StaffSubClusters;