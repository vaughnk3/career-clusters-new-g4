import SubFieldsPage from "../SubFieldInfo/SubFieldPage";
import OverlayRectangle from "./OverlayRectangle";


const StaffSubFields = () => {


    return (
        <div>
            <SubFieldsPage/>
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
        </div>
    )
}


export default StaffSubFields;