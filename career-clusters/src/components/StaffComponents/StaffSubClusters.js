import SubClusterPage from "../subCluster_Components/SubClusterPage";
import OverlayRectangle from "./OverlayRectangle";


const StaffSubClusters = () => {


    return (
        <div>
            <SubClusterPage/>
            <div className="overlay">
            <div class="staff-button-column">
              <a class="staff-button" >Sub-Cluster Management</a>
              <a class="staff-button" >Logout</a>
            </div>
            <div class="staff-button-column">
              <a class="staff-button">Staff Management</a>
              <a class="staff-button">Export Data (.xlsx)</a>
            </div>
          </div>
        </div>
    )


}


export default StaffSubClusters;