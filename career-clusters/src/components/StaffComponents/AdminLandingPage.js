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
        <div class="wrapper">
            <div id="_topRectangle">
                <h1>Administrator Landing Page</h1>
            </div>
            <br></br><br></br><br></br><br></br><br></br>
            <div class="content admin-content">
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
                <a  onClick={ExcelGenerationQueue}>Export Data (.xlsx)</a>
                <a onClick={handleButtonClickLogout}>Logout</a>
            </div>
            <BottomRectangle/>
        </div>
    )

}


export default AdminLandingPage;