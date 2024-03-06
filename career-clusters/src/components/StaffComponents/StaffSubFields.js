import BottomRectangle from "../page_Components/BottomRectangle";
import './StaffSubFields.css'
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { ExcelGenerationQueue } from './ExcelGeneration';
import { Link } from 'react-router-dom';
import './StaffSubClusters.js';
import app from '../login_components/FirebaseConfig';


const StaffSubFields = () => {
  const { subclusterId } = useParams();
  const [ subFields, setSubFields] = useState([]);
  const [claim, setClaim] = useState([])
  const [claimError, setClaimError] = useState(false);

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

  const closeClaimError = () => {
    setClaimError(false);
  }
  //Navigate hook for forceful navigation
  const navigate = useNavigate();
 

  const handleSubclusterManagementClick = () => {
    navigate('/subclustermanagementpage')
  }


 // Route to the cluster management page is button is clicked
    const handleButtonClickClusterManagement = () => {
      console.log(claim.claims.claims['clusterManagement'])
      if (claim.claims.claims['clusterManagement'] == true)
      {
        navigate('/login/staffclusters/clustermanagementpage');
      }
      else {
        console.log("In the else")
        setClaimError(true);
        //navigate('/login/staffclusters');
        
      }
      //navigate('/login/staffclusters/clustermanagementpage');

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

  const auth = getAuth(app);
  const user = auth.currentUser;
  console.log(user.uid)
  // Make post request here

  useEffect( () => {
    const fetchUserClaims = async () => {
      try {
        const response = await(fetch('http://localhost:3001/get-unique-claims', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({uid: user.uid}),
        }))

        if (response.ok) 
        {
          const claims = await response.json()
          setClaim(claims);
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchUserClaims();
  }, [])

  const handleButtonClickStaff = () => {
    //Need to check whether or not user has correct permissions. 
    navigate('/login/adminpage');
  };

  const handleSchoolManagementClick = () => {
    navigate('/school-management-page');
  }
  
  
  const field = subFields.length > 0 ? subFields[0] : {};

    return (
        <div id="page">
          {claimError && (
              <div className="popup"> 
                <div className="popup-content">
                  <h1>You do not have access to this feature.</h1>
                  <button onClick={closeClaimError}>Acknowledge</button>

                </div>
              </div>
            )

            }
          <div className="overlay">
            <Link to="/login/staffclusters"><img src={require('./HomeButton.png')} alt="Home Button" className="home-button"></img></Link>
            <div class="staff-button-column-one">
              <a class="staff-button" onClick={handleButtonClickClusterManagement}>Cluster Management</a>
              <a class="staff-button" onClick={handleButtonClickLogout}>Logout</a>
            </div>
            <div class="staff-button-column-two">
              <a class="staff-button" onClick={handleButtonClickStaff}>Admin Landing Page</a>
              <a class="staff-button" onClick={handleSchoolManagementClick}>School Management</a>
            </div>
            <div class="staff-button-column-three">
              <a class="staff-button" onClick={handleSubclusterManagementClick}>SubCluster Management</a>
              <a class="staff-button" onClick={ExcelGenerationQueue}>Export Data (.xlsx)</a>
            </div>
          </div>
            <div class="content content-margin">
            <div id="subfield-content">
                <div id="row">
                    <div id="topLeft">
                        <h2 id="fName">{field.fieldName}</h2>
                        <h2 id="fDesc">{field.description} </h2>
                    </div>
                    <a id="view-button" href="https://business.yorkcountychamber.com/jobs" >View Job Postings</a>
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
            </div>

            <BottomRectangle/>
          </div>
    )
}


export default StaffSubFields;
