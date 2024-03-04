import BottomRectangle from "../page_Components/BottomRectangle";
import "./AdminLandingPage.css";
import { ExcelGenerationQueue } from "./ExcelGeneration";
import { getAuth, signOut } from "firebase/auth";
import {useNavigate} from 'react-router-dom';



const AdminLandingPage = () => {
    const navigate = useNavigate();


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
    
    return (
        <div id="page">
            <div id="_topRectangle">
                <h1>Administrator Landing Page</h1>
            </div>
            <div class="content content-margin admin-landing-content">
                <div id="admin-landing-buttons">
                <div class="admin-landing-column">
                    <a href="/login/adminpage/createstaffpage">Create Staff Account</a>
                    <a href="/login/staffclusters">Staff Cluster View</a>
                    <a href="">Cluster Fields Management</a>
                </div>
                <div class="admin-landing-column">
                    <a href="/login/adminpage/modifyperms">Modify User Permissions</a>
                    <a href="/login/staffclusters/clustermanagementpage">Cluster Management</a> 
                    <a href="">Manage Job Postings</a>
                </div>
                <div class="admin-landing-column">
                <a  onClick={ExcelGenerationQueue}>Export Data (.xlsx)</a>
                <a onClick={handleButtonClickLogout}>Logout</a>
                </div>

                </div>
            </div>
            <BottomRectangle/>
        </div>
    )

}


export default AdminLandingPage;