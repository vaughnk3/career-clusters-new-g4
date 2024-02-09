import './ManagementCluster.css';
import React, { useState, useEffect } from "react";
import EditNameButton from './EditNameButton';
import ReplaceImageButton from './ReplaceImageButton';
import DeleteClusterButton from './DeleteClusterButton';

const ManagementCluster = ({ ID, clusterName, onClick }) => {


    const [imageSrc, setImageSrc] = useState('');
    //console.log("INSIDE FUNC: ID  ", id)
    useEffect(() => {
      const fetchImage = async () => {
        const response = await (fetch(`/n-image/${ID}`));
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = function() {
          setImageSrc(reader.result);
        }
        reader.readAsDataURL(blob);
      };
  
      try {fetchImage();}
      catch (error) {
        console.log(error);
      }
    }, [ID]);

    return (
        <div className='cluster_m'>
            <img src={imageSrc} className="cluster-pics" />
            <h2>{clusterName}</h2>
            <div class="mgmt_list_right"> 
            <EditNameButton ID={ID} clusterName={clusterName}/>
            <ReplaceImageButton ID={ID}/>
            <DeleteClusterButton ID={ID}/>
            </div>
        </div>
    )
}

export default ManagementCluster;


