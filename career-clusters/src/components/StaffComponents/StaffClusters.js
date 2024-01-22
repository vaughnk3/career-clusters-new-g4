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
          <div className="overlay" >
            <button className='staff_management_button' onClick={handleButtonClick} content='Cluster Management'>Cluster Management</button>
          </div>
        </div>
    )
}


export default StaffClusters;

