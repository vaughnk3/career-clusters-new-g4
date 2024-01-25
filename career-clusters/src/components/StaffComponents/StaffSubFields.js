import SubFieldsPage from "../SubFieldInfo/SubFieldPage";
import BottomRectangle from "../page_Components/BottomRectangle";
import OverlayRectangle from "./OverlayRectangle";
import './StaffSubFields.css'
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';



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
  
  const field = subFields.length > 0 ? subFields[0] : {};

    return (
        <div id="page">
          <div className="overlay">
            <div class="staff-button-column">
              <a class="staff-button">Field Management</a>
              <a class="staff-button">Logout</a>
            </div>
            <div class="staff-button-column">
              <a class="staff-button">Staff Management</a>
              <a class="staff-button">Export Data (.xlsx)</a>
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
