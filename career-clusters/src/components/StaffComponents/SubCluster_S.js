import React from "react";
import './SubCluster_S.css'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'


const SubCluster_S = ( {ID, subID, subclusterName, onClick} ) => {

    //This will get the image from the database as a blob, 
  //Then be read as a data URL to put into the src{} tag.  
  const [imageSrc, setImageSrc] = useState('');
  useEffect(() => {
    const fetchImage = async () => {
      console.log("TEST SUB ID: ", ID)
      const response = await (fetch(`http://localhost:3001/subclust-img-pull/${ID}`));
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
        <Link to={`/login/staffclusters/staffsubclusters/staffsubclusterinfo/${ID}`}>
        <div onClick={() => onClick(ID)} class="subcluster"> 
        <img src={ imageSrc } alt="SubCluster Picture" className="subcluster-pics"></img>
        <h2>{subclusterName}</h2>
        </div>
        </Link>
    );
};  

export default SubCluster_S;

