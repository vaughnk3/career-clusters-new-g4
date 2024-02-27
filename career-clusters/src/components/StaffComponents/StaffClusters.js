import './StaffClusters.css';
import React from 'react';
import {useNavigate, Link } from 'react-router-dom';
import './OverlayRectangle.css'
import { useState , useEffect} from "react";
import Cluster_S from "./Cluster_S";
import BottomRectangle from "../page_Components/BottomRectangle";
import { getAuth, signOut } from "firebase/auth";
import './StaffClusters.css'
import { ExcelGenerationQueue } from './ExcelGeneration';
import SchoolManagementPage from './ManagementPages/SchoolManagementPage';

const StaffClusters = () => {

    const navigate = useNavigate();
    const [clusters, setClusters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const closePopup = () => {
      setIsOpen(false);
      window.location.reload();
    }

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
                setLoading(false);
                setIsOpen(true);
                console.error('Error: ', error);
            }
        }
        fetchClusters();
    }, []);

    if (loading) {
      return <div id="loading-animation"></div>
    }

  const handleClusterClick = (ID) => {
      console.log(ID)
      navigate(`/login/staffclusters/staffsubclusters/${ID}`);
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
  
  
  
  const handleButtonClickStaff = () => {
    //Need to check whether or not user has correct permissions. 
    navigate('/login/adminpage');
  };

  const handleSubclusterManagementClick = () => {
    navigate('/subclustermanagementpage');
  }

  const handleSchoolManagementClick = () => {
    navigate('/school-management-page');
  }


    return (
        <div>
          <br></br><br></br><br></br><br></br><br></br><br></br> 
          {isOpen && (
          <div className="popup">
            <div id="popup-content">
              <h1>Error</h1>
              <p>An error occurred while fetching clusters.</p>
              <button onClick={closePopup}>Acknowledge and Refresh</button>
            </div>
          </div>
        )}
          <li id="c_array">
                {clusters.map(cluster => (
                <form id="form1" onSubmit={handleFormSubmit}>
                    <Cluster_S key={cluster.id} id={cluster.id} clusterName={cluster.clusterName} onClick={handleClusterClick}/>
                </form>
                ))}
            </li>
          <div className="overlay">
            <Link to="/login/staffclusters"><img src={require('./HomeButton.png')} alt="Home Button" className="home-button"></img></Link>
            <div class="staff-button-column-one">
              <a class="staff-button" onClick={handleButtonClickClusterManagement}>Cluster Management</a>
              <a class="staff-button" onClick={handleButtonClickLogout}>Logout</a>
            </div>
            <div class="staff-button-column-two">
              <a class="staff-button" onClick={handleButtonClickStaff}>Admin Landing Page</a>
              <a class="staff-button" onClick={handleSchoolManagementClick}>School Management</a>
            </div>
            <div class="staff-button-column-three">
              <a class="staff-button" onClick={handleSubclusterManagementClick}>SubCluster Management</a>
              <a class="staff-button" onClick={ExcelGenerationQueue}>Export Data (.xlsx)</a>
            </div>
          </div>
          <BottomRectangle/>
        </div>
    )
}


export default StaffClusters;

