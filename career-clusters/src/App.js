import './App.css';
//import { Link, useNavigate } from 'react-router-dom';
import Cluster from './components/cluster_Components/Cluster.js'
import DemographicInfo from './components/homePage/DemographicInfo';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/login_components/LoginPage.js';
import ClusterPage from './components/cluster_Components/ClusterPage';
import SubFieldsPage from './components/SubFieldInfo/SubFieldPage';
import SubClusterPage from './components/subCluster_Components/SubClusterPage.js';
import StaffClusters from './components/StaffComponents/StaffClusters';
import StaffSubClusters from './components/StaffComponents/StaffSubClusters';
import StaffSubFields from './components/StaffComponents/StaffSubFields';
import JobListingPage from './components/JobListingComponents/JobListingPage';
import StaffJobListingPage from './components/StaffComponents/StaffJobListingPage';
import AdminLandingPage from './components/StaffComponents/AdminLandingPage';
import ModifyPermsPage from './components/StaffComponents/AdminPrivComponents/ModifyPermsPage';
import CreateStaffAccount from './components/StaffComponents/AdminPrivComponents/CreateStaffAccount';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DemographicInfo />} />
        <Route path="/cluster" element={<ClusterPage />} />
        <Route path="/cluster/subcluster" element={<SubClusterPage/>} />
        <Route path="/cluster/subcluster/subclusterinfo" element={<SubFieldsPage/>} />
        <Route path="/cluster/subcluster/subclusterinfo/joblistings" element={<JobListingPage/>} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/login/staffclusters" element={<StaffClusters/>} />
        <Route path="/login/staffclusters/staffsubclusters" element={<StaffSubClusters/>} />
        <Route path="/login/staffclusters/staffsubclusters/staffsubclusterinfo" element={<StaffSubFields/>} />
        <Route path="/login/staffclusters/staffsubclusters/staffsubclusterinfo/staffjoblistings" element={<StaffJobListingPage/>} />

        <Route path="/login/adminpage" element={<AdminLandingPage/>} />
        <Route path="/login/adminpage/modifyperms" element={<ModifyPermsPage/>} />
        <Route path="/login/adminpage/createstaffpage" element={<CreateStaffAccount/>} />
      </Routes>
    </Router>
  );
}

export default App;
//<Route path="/cluster/subcluster" element={<SubClusterPage/>} />//