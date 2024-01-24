import ClusterPage from "../cluster_Components/ClusterPage";
import './StaffClusters.css';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import OverlayRectangle from "./OverlayRectangle";
import './OverlayRectangle.css'

const StaffClusters = () => {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/login/staffclusters/clustermanagementpage');
    };

    return (
        <div>
           <ClusterPage/>
          <div className="overlay">
            <div class="staff-button-column">
              <a class="staff-button" onClick={handleButtonClick}>Cluster Management</a>
              <a class="staff-button" onClick={handleButtonClick}>Logout</a>
            </div>
            <div class="staff-button-column">
              <a class="staff-button" onClick={handleButtonClick}>Staff Management</a>
              <a class="staff-button" onClick={handleButtonClick}>Export Data (.xlsx)</a>
            </div>
          </div>
        </div>
    )
}


export default StaffClusters;

