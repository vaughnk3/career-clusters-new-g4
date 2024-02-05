import ClusterPage from "../cluster_Components/ClusterPage";
import './StaffClusters.css';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import OverlayRectangle from "./OverlayRectangle";
import './OverlayRectangle.css'
import { useState , useEffect} from "react";
import Cluster_S from "./Cluster_S";
import './Cluster_S.css'
import BottomRectangle from "../page_Components/BottomRectangle";
import { getAuth, signOut } from "firebase/auth";

const StaffClusters = () => {

    const navigate = useNavigate();
    const [clusters, setClusters] = useState([]);

    useEffect(() => {
        const fetchClusters = async () => {
            try {
                const response = await (fetch('http://localhost:3001/login/staffclusters'));
                if(!response.ok) {
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
    navigate('/login/adminpage/modifyperms');
  };


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
            <div class="staff-button-column">
              <a class="staff-button" onClick={handleButtonClickClusterManagement}>Cluster Management</a>
              <a class="staff-button" onClick={handleButtonClickLogout}>Logout</a>
            </div>
            <div class="staff-button-column">
              <a class="staff-button" onClick={handleButtonClickStaff}>Staff Management</a>
              <a class="staff-button" onClick={handleButtonClickExportData}>Export Data (.xlsx)</a>
            </div>
          </div>
          <BottomRectangle/>
        </div>
    )
}


export default StaffClusters;

