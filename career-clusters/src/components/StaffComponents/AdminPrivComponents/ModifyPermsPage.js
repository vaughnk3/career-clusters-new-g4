import TopRectangle from "../../page_Components/TopRectangle";
import BottomRectangle from "../../page_Components/BottomRectangle";
import React, { useState, useEffect } from 'react';
import { claimsList } from "./permissionsList";
import './ModifyPermsPage.css'

const ModifyPermsPage = () => {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [action, setAction] = useState('add');
    const [selectedPermission, setSelectedPermission] = useState('');
    const [statusPopup, setStatusPopup] = useState(false);
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const permissionNames = Object.keys(claimsList.claims)

    const closeStatus = () => {
      setStatusPopup(false);
      window.location.reload();
    }


    const UsersPermissionsList = () => {
        useEffect(() => {
          const fetchUsersAndPermissions = async () => {
            try {
              const response = await fetch('http://localhost:3001/login/adminpage/modifyperms/list-users', 
              );
              const data = await response.json();
              setUsers(data);
              if(data.length > 0) {
                setSelectedUser(data[0].uid);
              }
            } catch (error) {
              console.error('Failed to fetch users and permissions:', error);
            }
          };
      
          fetchUsersAndPermissions();
        }, []);
    }

    UsersPermissionsList();
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      
     
      console.log("LENGTH", users.length)
      console.log(users)
      console.log("single: ", users[0].permissions);
      console.log("UID", users[0].uid)


      // Initialize new claims list 
      let newClaimsList = {}

      // Find the claims list for the selected user
      for (let i = 0; i < users.length; i++)
      {
        if (selectedUser === users[i].uid) {
          newClaimsList = users[i].permissions;
        }
      }
     
      console.log("NEW CLAIMS:", newClaimsList)
      console.log("SPECIFIC: ", newClaimsList.claims[selectedPermission])
      //Iffy logic, not sure if list of all claims are being sent back 
      if(action === 'add') 
      {
        newClaimsList.claims[selectedPermission] = true;
      
      } else if (action === 'remove') 
      {
        newClaimsList.claims[selectedPermission] = false;
      }

      //Finally communicate w backend to update user info
      try {
        const response = await fetch('http://localhost:3001/login/adminpage/modifyperms/add-user-permission', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({uid: selectedUser, claims: newClaimsList}),
        })

        if(response.ok) {
          console.log("Permissions updated successfully");
          setMessage('Successfully updated user permission.')
          setStatusPopup(true);
        } else {
          setMessage('Failed to update user permission.')
          setStatusPopup(true);
          throw new Error("Failed to update permission")
        }
      } catch (error) {
        setMessage('Failed to update user permission.')
        setStatusPopup(true);
        console.error("Error updating permissions: ", error);
      }
      //console.log(payload.claims);
    }
   
    const modifyPermissions = () => {
      setShowForm(!showForm);
    }
    
    return (
        <div>
            <TopRectangle/>
            <h1>Modify Perms Page , routed from admin </h1>
            <table>
              <tr>
                <th></th>
                <th>Administrator</th>
                <th>Cluster Management</th>
                <th>SubCluster Management</th>
                <th>Export Excel</th>
                <th>Create Staff</th>
                <th>Modify Perms</th>
                <th>School Management</th>
                <th>Clear Click Counts</th>
              </tr>
              {users.map(user => (
                <tr>
                  <td>{user.email}</td>
                  <td>
                    {user.permissions.claims["Administrator"] ? 'Yes' : 'No'}
                  </td>
                  <td>
                    {user.permissions.claims["Cluster Management"] ? 'Yes' : 'No'}
                  </td> 
                  <td>
                    {user.permissions.claims["SubCluster Management"] ? 'Yes' : 'No'}
                  </td> 
                  <td>
                    {user.permissions.claims["Export Excel"] ? 'Yes' : 'No'}
                  </td> 
                  <td>
                    {user.permissions.claims["Create Staff"] ? 'Yes' : 'No'}
                  </td> 
                  <td>
                    {user.permissions.claims["Modify Perms"] ? 'Yes' : 'No'}
                  </td> 
                  <td>
                    {user.permissions.claims["School Management"] ? 'Yes' : 'No'}
                  </td> 
                  <td>
                    {user.permissions.claims["Clear Click Counts"] ? 'Yes' : 'No'}
                  </td>                 
                </tr>
              ))}
            </table>
<button onClick={modifyPermissions}>Modify Permissions</button>

{showForm && (
    <form id="userUpdate" onSubmit={handleSubmit}>
        <div id="userSelect">
            <label htmlFor="user">User:</label>
            <select name="user" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                {users.map(user => (
                    <option key={user.uid} value={user.uid}>{user.email}</option>
                ))}
            </select>
        </div>
        <div id="actionSelect">
            <label htmlFor="action">Action:</label>
            <select name="action" value={action} onChange={(e) => setAction(e.target.value)}>
                <option value="add">Add</option>
                <option value="remove">Remove</option>
            </select>
        </div>
        <div id="permissionSelect">
            <label htmlFor="permission">Permission:</label>
            <select name="permission" value={selectedPermission} onChange={(e) => setSelectedPermission(e.target.value)}>
                {permissionNames.map(permission => (
                    <option key={permission} value={permission}>{permission}</option>
                ))}
            </select>
        </div>
        <button type="submit">Update Permissions</button>
    </form>
)}

          { statusPopup && (
            <div className="popup">
              <div className="popup-content">
                <h1>{message}</h1>
                <button onClick={closeStatus}>Acknowledge & Close</button>
              </div>
            </div>
          )}
          

        
            <BottomRectangle/>
        </div>
    )
}


export default ModifyPermsPage;