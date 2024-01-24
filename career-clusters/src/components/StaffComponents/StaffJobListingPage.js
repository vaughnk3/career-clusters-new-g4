import JobListingPage from "../JobListingComponents/JobListingPage";
import OverlayRectangle from "./OverlayRectangle";

const StaffJobListingPage = () => {


    return (
        <div>
            <JobListingPage/>
            <div className="overlay">
            <div class="staff-button-column">

              <a class="staff-button">Logout</a>
            </div>
            <div class="staff-button-column">
              <a class="staff-button">Staff Management</a>
              <a class="staff-button">Export Data (.xlsx)</a>
            </div>
          </div>
        </div>
    )
}

export default StaffJobListingPage;