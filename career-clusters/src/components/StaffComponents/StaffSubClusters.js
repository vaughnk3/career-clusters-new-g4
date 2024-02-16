import React, { useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import SubCluster_S from "./SubCluster_S";
import { getAuth, signOut } from "firebase/auth";
import { ExcelGenerationQueue } from './ExcelGeneration';

const StaffSubClusters = () => {
    //Declare navigate hook
    const navigate = useNavigate();

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
            }
        }

        fetchSubclusters();
    }, [clusterId])

    //Loading animation
    if (loading) {
      return<div id="loading-animation"></div>
    }
   

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
            <div class="staff-button-column-one">
              <a class="staff-button" onClick={handleButtonClickClusterManagement}>Cluster Management</a>
              <a class="staff-button" onClick={handleButtonClickLogout}>Logout</a>
            </div>
            <div class="staff-button-column-two">
              <a class="staff-button" onClick={handleButtonClickStaff}>Admin Landing Page</a>
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