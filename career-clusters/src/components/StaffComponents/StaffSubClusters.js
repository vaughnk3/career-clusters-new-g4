import React, { useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import SubCluster_S from "./SubCluster_S";
import { getAuth, signOut } from "firebase/auth";
import { ExcelGenerationQueue } from './ExcelGeneration';
import { Link } from 'react-router-dom';
import './StaffSubClusters.css';
import BottomRectangle from "../page_Components/BottomRectangle";

const StaffSubClusters = () => {
    //Declare navigate hook
    const navigate = useNavigate();

    const refreshPage = () => {
      window.location.reload();
  }

    //Handle the cluster click
    const handleClusterClick = (ID) => {
        console.log(ID)
    }
    
    //Route to the subcluster management page if button is clicked
    const handleSubclusterManagementClick = () => {
      navigate('/subclustermanagementpage')
    }

    // Route to the cluster management page is button is clicked
    const handleButtonClickClusterManagement = () => {
      navigate('/login/staffclusters/clustermanagementpage');
    };

    //Handle logout
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


    //Handle route to admin page
    const handleButtonClickStaff = () => {
      //Need to check whether or not user has correct permissions. 
      navigate('/login/adminpage');
    };


    const { clusterId } = useParams();
    const [subclusters, setSubclusters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openError, setOpenError] = useState(false);

    //Grab all the subclusters to be mapped on display
    useEffect(() => {
        const fetchSubclusters = async () => {
            try {
                const response = await fetch(`http://localhost:3001/login/staffclusters/staffsubclusters/${clusterId}`);
                if (!response.ok) {
                    throw new Error('Error fetching subclusters');
                }
                const data = await response.json();
                setSubclusters(data);
                setLoading(false);
            } catch (error) {
                console.error('Error: ', error);
                setLoading(false);
                setOpenError(true);
            }
        }

        fetchSubclusters();
    }, [clusterId])

    //Loading animation
    if (loading) {
      return<div id="loading-animation"></div>
    }
   

    const handleSchoolManagementClick = () => {
      navigate('/school-management-page');
    }

    const closeError = () => {
      setOpenError(false);
      refreshPage();
    }

    

    return (
        <div>
           <br></br><br></br><br></br><br></br><br></br><br></br> 
           {openError && (
              <div className="popup">
                <div className="popup-content">
                  <h1>Error</h1>
                  <p>An error occurred while fetching SubClusters.</p>
                  <button onClick={closeError}>Acknowledge and Refresh</button>
                </div>
              </div>
            )}


            <ul>
              {subclusters.map((subcluster) => (
                <li>
                  <SubCluster_S key={subcluster.id} ID={subcluster.id} subID={subcluster.clusterID} subclusterName={subcluster.subclusterName} onClick={handleClusterClick}/>
                 </li>
                ))}
            </ul>
            
            <BottomRectangle/>

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
        </div>
    )


}

export default StaffSubClusters;