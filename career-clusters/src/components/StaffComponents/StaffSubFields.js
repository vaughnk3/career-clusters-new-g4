import SubFieldsPage from "../SubFieldInfo/SubFieldPage";
import BottomRectangle from "../page_Components/BottomRectangle";
import OverlayRectangle from "./OverlayRectangle";
import './StaffSubFields.css'
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { ExcelGenerationQueue } from './ExcelGeneration';


const StaffSubFields = () => {
  const { subclusterId } = useParams();
  const [ subFields, setSubFields] = useState([]);

  useEffect(() => {
      const fetchSubFields = async () => {
          try {
              const response = await fetch(`http://localhost:3001/login/staffclusters/staffsubclusters/staffsubclusterinfo/${subclusterId}`);
              if(!response.ok) {
                  throw new Error('Error fetching subcluster info');
              }
              const data = await response.json();
              setSubFields(data);
          } catch (error) {
              console.error('Error: ', error);
          }
      }
      fetchSubFields();
  }, [subclusterId])


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

  const handleButtonClickStaff = () => {
    //Need to check whether or not user has correct permissions. 
    navigate('/login/adminpage');
  };
  
  const field = subFields.length > 0 ? subFields[0] : {};

    return (
        <div id="page">
          <div className="overlay">
            <div class="staff-button-column-one">
              <a class="staff-button" onClick={handleButtonClickClusterManagement}>Cluster Management</a>
              <a class="staff-button" onClick={handleButtonClickLogout}>Logout</a>
            </div>
            <div class="staff-button-column-two">
              <a class="staff-button" onClick={handleButtonClickStaff}>Admin Landing Page</a>
              <a class="staff-button" onClick={ExcelGenerationQueue}>Export Data (.xlsx)</a>
            </div>
            <div class="staff-button-column-three">
              <a class="staff-button" onClick={handleSubclusterManagementClick}>SubCluster Management</a>
              <a class="staff-button">Pathways Management</a>
            </div>
          </div>
          <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <div id="content">
                <div id="row">
                    <div id="topLeft">
                        <h2 id="fName">{field.fieldName}</h2>
                        <h2 id="fDesc">{field.description} </h2>
                    </div>
                    <a id="view-button">View Job Postings</a>
                </div>
                <div id="bottomMiddle">
                    <div class="field-statistic">
                        <h2>Average Salary</h2>
                        <h1> ${field.avgSalary} </h1>
                    </div>
                    <div class="field-statistic">
                        <h2>Education Level</h2>
                        <h1>{field.educationLvl}</h1>
                    </div>
                    <div class="field-statistic">
                        <h2>Growth Rate</h2>
                        <h1>{field.growthRate}</h1>
                    </div>
                </div>
            </div>
            <br></br><br></br><br></br><br></br>
            <BottomRectangle/>
          </div>
    )
}


export default StaffSubFields;
