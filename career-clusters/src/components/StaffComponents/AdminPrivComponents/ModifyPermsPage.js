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
    const permissionNames = Object.keys(claimsList.claims)
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
        } else {
          throw new Error("Failed to update permission")
        }
      } catch (error) {
        console.error("Error updating permissions: ", error);
      }
      //console.log(payload.claims);
    }

    

    return (
        <div>
            <TopRectangle/>
            <h1>Modify Perms Page , routed from admin </h1>
            <ul>
                {users.map(user => (
                    <li key={user.uid}>
                        {user.email}: Permissions - {JSON.stringify(user.permissions.claims)}
                    </li>
                ))}
            </ul>


          <form id="userUpdate" onSubmit={handleSubmit}>
            <div id="userSelect">
              <label for="user">User:</label>
                  <select name="user" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                    {users.map(user => (
                      <option key={user.uid} value={user.uid}>{user.email}</option>
                    ))}
                  </select>
            </div>

            <div id="actionSelect">
              <label for="action">Action:</label>
              <select name="action" value={action} onChange={(e) => setAction(e.target.value)}>
                <option value="add">Add</option>
                <option value="remove">Remove</option>
              </select>
            </div>

            <div id="permissionSelect">
              <label for="permission">Permission:</label>
              <select name="permission" value={selectedPermission} onChange={(e) => setSelectedPermission(e.target.value)}>
                  {permissionNames.map(permission => (
                    <option key={permission} value={permission}>{permission}</option>
                  ))}
              </select>
            </div>

            <button type="submit">Update Permissions</button>
          </form>
            <BottomRectangle/>
        </div>
    )
}


export default ModifyPermsPage;