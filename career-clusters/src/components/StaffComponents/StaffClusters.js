import './StaffClusters.css';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import './OverlayRectangle.css'
import { useState , useEffect} from "react";
import Cluster_S from "./Cluster_S";
import './Cluster_S.css'
import BottomRectangle from "../page_Components/BottomRectangle";
import { getAuth, signOut } from "firebase/auth";
import './StaffClusters.css'
import { ExcelGenerationQueue } from './ExcelGeneration';

const StaffClusters = () => {

    const navigate = useNavigate();
    const [clusters, setClusters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClusters = async () => {
            try {
                const response = await (fetch('http://localhost:3001/login/staffclusters'));
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
      return <h1>cum</h1>
    }

  const handleClusterClick = (ID) => {
      console.log(ID)
      navigate(`/login/staffclusters/staffsubclusters/${ID}`);
      ///login/staffclusters/staffsubclusters/${ID}
      return ID;
  }

  const handleFormSubmit =(e) => {
    e.preventDefault();
    navigate('/cluster/subcluster')
  }

  const handleButtonClickClusterManagement = () => {
    navigate('/login/staffclusters/clustermanagementpage');
  };
  const handleButtonClickLogout = async () => {
    //Logout
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("Logout.");
      navigate('/login');
    } catch(error) {
      console.error('Logout error:', error.message);
    }
  };
  const handleButtonClickExportData = () => {
    console.log("Export Data");
  };
  const handleButtonClickStaff = () => {
    //Need to check whether or not user has correct permissions. 
    navigate('/login/adminpage');
  };

  const handleSubclusterManagementClick = () => {
    navigate('/subclustermanagementpage');
  }


    return (
        <div>
          <br></br><br></br><br></br><br></br><br></br><br></br> 
          <li id="c_array">
                {clusters.map(cluster => (
                <form id="form1" onSubmit={handleFormSubmit}>
                    <Cluster_S key={cluster.id} id={cluster.id} clusterName={cluster.clusterName} onClick={handleClusterClick}/>
                </form>
                ))}
            </li>
          <div className="overlay">
            <div class="staff-button-column-one">
              <a class="staff-button" onClick={handleButtonClickClusterManagement}>Cluster Management</a>
              <a class="staff-button" onClick={handleButtonClickLogout}>Logout</a>
            </div>
            <div class="staff-button-column-two">
              <a class="staff-button" onClick={handleButtonClickStaff}>Admin Landing Page</a>
              <a class="staff-button" onClick={ExcelGenerationQueue}>Export Data (.xlsx)</a>
            </div>
            <div class="staff-button-column-three">
              <a class="staff-button" onClick={handleSubclusterManagementClick}>SubCluster Management</a>
              <a class="staff-button">Pathways Management</a>
            </div>
          </div>
          <BottomRectangle/>
        </div>
    )
}


export default StaffClusters;

