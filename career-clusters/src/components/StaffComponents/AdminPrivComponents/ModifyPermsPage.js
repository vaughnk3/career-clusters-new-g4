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
              const response = await fetch('http://localhost:3001/login/adminpage/modifyperms/list-users');
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
      
      //Determine whether to add or remove & endpoint
      let endpoint = '';
      if(action === 'add') {
        endpoint = 'http://localhost:3001/login/adminpage/modifyperms/add-user-permission';
        console.log("Add endpoint accessed")
      } else if(action === 'remove') {
        endpoint = 'http://localhost:3001/login/adminpage/modifyperms/remove-user-permission';
        console.log("Remove endpoint accessed")
      }

      //Might be where current error is, payload coming through as null
      let payload = {};

      //Iffy logic, not sure if list of all claims are being sent back 
      if(action === 'add') {
        payload = {
          uid: selectedUser,
          claims: {
            [selectedPermission]: true,
          },
        }
      } else if (action === 'remove') {
        payload = {
          uid: selectedUser,
          claimsToRemove: [selectedPermission],
        }
      }

      //Finally communicate w backend to update user info
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify(payload),
        })

        if(response.ok) {
          console.log("Permissions updated successfully");
        } else {
          throw new Error("Failed to update permission")
        }
      } catch (error) {
        console.error("Error updating permissions: ", error);
      }
      console.log(payload.claims);
    }

    // This is how i manually set all perms, just switch out the UID and edit true false
    /*
    // ######## DO NOT DELETE THIS ############ //
    // Test to manually add some perms - Ross 
    const uid = 'dJgypuZ4kkf00RUEmGfXzThJChy1';
    const claims = {
        "uid": "dJgypuZ4kkf00RUEmGfXzThJChy1",
        "claims": {
          "admin": false,
          "clusterManagement": true,
          "subclusterManagement": true,
          "exportExcel": true,
          "createStaff": false,
          "modifyPerms": false,
          "schoolManagement":true,
          "clearClicks":false,
          "accessLevel": 1
        }
      }
      
    const attemptPermsSet = async () => {
        const response = await(fetch('http://localhost:3001/login/adminpage/modifyperms/add-user-permission', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ uid, claims })
                }));
    } 
    attemptPermsSet();
    */

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