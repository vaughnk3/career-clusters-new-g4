import './App.css';
//import { Link, useNavigate } from 'react-router-dom';
import Cluster from './components/cluster_Components/Cluster.js'
import DemographicInfo from './components/homePage/DemographicInfo';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/login_components/LoginPage.js';
import ClusterPage from './components/cluster_Components/ClusterPage';
import SubFieldsPage from './components/SubFieldInfo/SubFieldPage';
import SubClusterPage from './components/subCluster_Components/SubClusterPage.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DemographicInfo />} />
        <Route path="/cluster" element={<ClusterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cluster/subcluster" element={<SubClusterPage/>} />
        <Route path="/cluster/subcluster/subclusterinfo" element={<SubFieldsPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
//<Route path="/cluster/subcluster" element={<SubClusterPage/>} />//