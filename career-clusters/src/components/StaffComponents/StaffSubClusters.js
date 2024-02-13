import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import SubCluster_S from "./SubCluster_S";
import { getAuth, signOut } from "firebase/auth";

const StaffSubClusters = () => {
    const navigate = useNavigate();


    const handleClusterClick = (SubID) => {
        console.log(SubID)
        navigate('/login/staffclusters/staffsubclusters/staffsubclusterinfo')
        ///login/staffclusters/staffsubclusters/staffsubclusterinfo

    }

    const handleSubclusterManagementClick = () => {
      navigate('/subclustermanagementpage')
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

    const { clusterId } = useParams();
    const [subclusters, setSubclusters] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
      return <h1>This page loading</h1>
    }
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
            <div class="staff-button-column-one">
              <a class="staff-button" onClick={handleButtonClickClusterManagement}>Cluster Management</a>
              <a class="staff-button" onClick={handleButtonClickLogout}>Logout</a>
            </div>
            <div class="staff-button-column-two">
              <a class="staff-button" onClick={handleButtonClickStaff}>Admin Landing Page</a>
              <a class="staff-button" onClick={handleButtonClickExportData}>Export Data (.xlsx)</a>
            </div>
            <div class="staff-button-column-three">
              <a class="staff-button" onClick={handleSubclusterManagementClick}>SubCluster Management</a>
              <a class="staff-button">Pathways Management</a>
            </div>
          </div>
        </div>
    )


}


export default StaffSubClusters;