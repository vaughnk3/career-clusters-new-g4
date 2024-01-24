import BottomRectangle from "../page_Components/BottomRectangle.js";
import UserIcon from "../page_Components/UserIcon.js";
import TopRectangle from "../page_Components/TopRectangle.js";
import './SubFieldPage.css'
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const SubFieldsPage = () => {
    const { subclusterId } = useParams();
    const [ subFields, setSubFields] = useState([]);

    useEffect(() => {
        const fetchSubFields = async () => {
            try {
                const response = await fetch(`http://localhost:3001/cluster/subcluster/subclusterinfo/${subclusterId}`);
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
            <TopRectangle/>
            <UserIcon/>
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
                    {/* <ul class="inline"> 
                        <li class="fInlineTitle">Average Salary</li>
                        <li class="fInlineTitle">Education Level</li>
                        <li class="fInlineTitle">Growth Rate</li>
                    </ul><br></br>
                    <ul class="inline">
                        <li class="fInline">{ GetFieldSalaryByIDS (CareerClusterMap, ClusterID, SubID) }</li>
                        <li class="fInline">{ GetFieldEdLevelByIDS (CareerClusterMap, ClusterID, SubID) }</li>
                        <li class="fInline">{ GetFieldGrowthRateByIDS (CareerClusterMap, ClusterID, SubID) }</li><br></br>
                    </ul> */}
                </div>
            </div>
            
            <BottomRectangle/>
        </div>
    )
}



export default SubFieldsPage;