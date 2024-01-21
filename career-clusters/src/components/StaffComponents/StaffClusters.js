import ClusterPage from "../cluster_Components/ClusterPage";
import './StaffClusters.css';
import React from 'react';
import {useNavigate} from 'react-router-dom';

const StaffClusters = () => {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/clustermanagementpage');
    };

    return (
        <div>
            <ClusterPage>
                <div>
                <button content="Cluster Management" id="cluster_management_button" onClick={handleButtonClick} />
                </div>
            </ClusterPage>
            
        </div>
    )
}


export default StaffClusters;

//<button id="cluster_management_button" onClick={handleButtonClick} />