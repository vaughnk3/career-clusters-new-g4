import React from 'react';
import { useState, useEffect } from 'react';
import './Cluster_S.css';

const Cluster_S = ( {id, clusterName, onClick} ) => {

  //This will get the image from the database as a blob, 
  //Then be read as a data URL to put into the src{} tag.  
  const [imageSrc, setImageSrc] = useState('');
    //console.log("INSIDE FUNC: ID  ", id)
    useEffect(() => {
      const fetchImage = async () => {
        const response = await (fetch(`/n-image/${id}`));
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
    }, [id]);

  return (
    <div onClick={() => onClick(id)} className="cluster">
        <h2> {clusterName}
        </h2>
        <img src={imageSrc} alt="Cluster Picture" className="cluster-pics"></img>
    </div>
  );
}

export default Cluster_S;
