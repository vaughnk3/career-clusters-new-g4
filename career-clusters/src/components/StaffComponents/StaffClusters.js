import ClusterPage from "../cluster_Components/ClusterPage";
import './StaffClusters.css';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import OverlayRectangle from "./OverlayRectangle";

const StaffClusters = () => {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/clustermanagementpage');
    };

    return (
        <div>
           <ClusterPage/>
           
          <OverlayRectangle/>
        </div>
    )
}


export default StaffClusters;

