import './ManagementSubCluster.css'
import EditNameSubcluster from './EditNameSubcluster';
import EditDescriptionSubcluster from './EditDescriptionSubcluster';

const ManagementSubCluster = ({ID, subclusterName}) => {



    return (
        <div className="subcluster_m">
            <h2>{subclusterName}</h2>
            <EditNameSubcluster ID={ID} />
            <EditDescriptionSubcluster ID={ID} />
        </div>
    )
}



export default ManagementSubCluster;