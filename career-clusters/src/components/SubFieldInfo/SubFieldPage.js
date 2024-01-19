import BottomRectangle from "../page_Components/BottomRectangle.js";
import UserIcon from "../page_Components/UserIcon.js";
import TopRectangle from "../page_Components/TopRectangle.js";
import './SubFieldPage.css'

const SubFieldsPage = () => {

    
    return (
        <div id="page">
            <TopRectangle/>
            <UserIcon/>
            <div id="content">
                <div id="row">
                    <div id="topLeft">
                        <h2 id="fName"> Field Name </h2>
                        <h2 id="fDesc"> Field Description </h2>
                    </div>
                    <a id="view-button">View Job Postings</a>
                </div>
                <div id="bottomMiddle">
                    <div class="field-statistic">
                        <h2>Average Salary</h2>
                        <h1> $98,000 </h1>
                    </div>
                    <div class="field-statistic">
                        <h2>Education Level</h2>
                        <h1> Bachelors Degree</h1>
                    </div>
                    <div class="field-statistic">
                        <h2>Growth Rate</h2>
                        <h1> Low </h1>
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