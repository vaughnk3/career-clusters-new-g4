import './ClusterManagementPage.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import BottomRectangle from '../../page_Components/BottomRectangle';
import ManagementSubCluster from './ManagementSubCluster';


const SubClusterManagementPage = () => {
    /********************************************* */
    //FETCH SUBCLUSTERS CODE
    const navigate = useNavigate();
    const[subClusters, setSubClusters] = useState([]);

    const handleBackButton = () => {
        navigate('/login/staffclusters/staffsubclusters')
    }

    // Once the post request occurs, refresh the page so we can see the changes. 
    const refreshPage = () => {
        window.location.reload();
    }


    useEffect(() => {
        const fetchSubClusters = async () => {
            try {
                const response = await (fetch('http://localhost:3001/login/staffclusters/staffsubclusters/subclustermanagementpage'));
                if (!response.ok) {
                    throw new Error('Error fetching subclusters');
                }
                const data = await response.json();
                setSubClusters(data);
            } catch (error) {
                console.error('Error: ', error);
            }
        }
        fetchSubClusters();
    }, []);
    /********************************************* */

    /********************************************* */
    //FETCH CLUSTERS
    const [clusters, setClusters] = useState([]);

    useEffect(() => {
        const fetchClusters = async () => {
            try { 
                const response = await (fetch('http://localhost:3001/login/staffclusters/staffsubclusters/subclustermanagementpage/fetch-clusters'));
                if(!response.ok) {
                    throw new Error('Error fetching clusters');
                }
                const data = await response.json();
                console.log(data)

                setClusters(data);
                
            } catch (error) {
                console.error('Error: ', error);
            }
        }
        fetchClusters();
    }, []);
    /********************************************* */


    /********************************************* */
    //Add new subcluster code
    const [isOpen, setIsOpen] = useState(false);
    const openPopup = () => { setIsOpen(true); }
    const closePopup = () => { setIsOpen(false); }
    const [newSCDescrip, setNewDescrip] = useState('');
    const [newSCName, setNewName] = useState('');
    const [newSCSalary, setNewSalary] = useState('');
    const [newSCEdLevel, setNewEdLevel] = useState('');
    const [newSCGrowtRate, setNewGrowthRate] = useState('');
    const [clusterID, setClusterID] = useState('');

    const addSubCluster = async () => {
        try {

            const response = await(fetch('http://localhost:3001/login/staffclusters/staffsubclusters/subclustermanagementpage/add-subcluster', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newSCName, newSCDescrip, newSCSalary, newSCEdLevel, newSCGrowtRate, clusterID })
            }));
            if (response.ok) {
                console.log('SubCluster added successfully');
            } else {
                console.error('Failed to add subcluster');
            } 
        }   catch (error) {
            console.error('Error adding subcluster: ', error);
        }
        console.log('POST request sent from add subcluster button')
        setIsOpen(false);
        refreshPage();
    }
    

    console.log("TEST SELECTED CLUSTER ID:  ", clusterID)
    /********************************************* */


    return (
        <div id="page">
            <div id="_topRectangle">
                <button id="back_button" onClick={handleBackButton}>Back</button>
                <button id="add_cluster" onClick={openPopup}>Add SubCluster</button>
                {isOpen && (
                    <div className="popup">
                        <div className="popup-content">  
                            <h2>Test Add SubCluster</h2>
                            <input type="text" id='subclusterName' name="subclusterName" placeholder='Enter new Name'  value={newSCName} onChange={(e) => setNewName(e.target.value)}></input>

                            <input type="text" id="subclusterDescrip" name="subclusterDescrip" placeholder="Enter new description." value={newSCDescrip} onChange={(e) => setNewDescrip(e.target.value)}></input>

                            <input type="text" id="subclusterSalary" name="subclusterSalary" placeholder="Enter new Salary" value={newSCSalary} onChange={(e) => setNewSalary(e.target.value)}></input>

                            <input type="text" id="subclusterEducation" name="subclusterEducation" placeholder="Enter new ed level" value={newSCEdLevel} onChange={(e) => setNewEdLevel(e.target.value)}></input>

                            <select id="growth-rate" name="rate" value={newSCGrowtRate} onChange={(e) => setNewGrowthRate(e.target.value)} >
                                <option>Select Growth Rate</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>

                            <input type="file" id="img" name="img" accept="image/*"></input>

                            <button id="submitName" onClick={addSubCluster}>Submit</button>
                            <button onClick={closePopup} className="cancelButton">Cancel</button>

                            <select id="select-cluster" value={clusterID} onChange={(e) => setClusterID(e.target.value)} >
                                <option value="" disabled selected hidden className="hidden">Select one</option>
                                {clusters.map((cluster) => (
                                    <option key={cluster.id} value={cluster.id} >
                                        {cluster.clusterName}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </div>
                 )}  


                <h1>SubCluster Managment Page</h1>
            </div>
            <br></br><br></br><br></br><br></br><br></br><br></br>


            <ul>
                {subClusters.map((subcluster) => (
                    <li>
                        <ManagementSubCluster key={subcluster.id} ID={subcluster.id} subclusterName={subcluster.subclusterName} onClick=""/>
                    </li>
                ))}
            </ul>


            <BottomRectangle/>
        </div>
    )
}



export default SubClusterManagementPage;