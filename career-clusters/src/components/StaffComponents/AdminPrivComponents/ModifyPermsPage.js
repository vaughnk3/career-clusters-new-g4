import TopRectangle from "../../page_Components/TopRectangle";
import BottomRectangle from "../../page_Components/BottomRectangle";
import React, { useState, useEffect } from 'react';

const ModifyPermsPage = () => {

    const [users, setUsers] = useState([]);
    const UsersPermissionsList = () => {
        
      
        useEffect(() => {
          const fetchUsersAndPermissions = async () => {
            try {
              const response = await fetch('http://localhost:3001/login/adminpage/modifyperms/list-users');
              const data = await response.json();
              setUsers(data);
            } catch (error) {
              console.error('Failed to fetch users and permissions:', error);
            }
          };
      
          fetchUsersAndPermissions();
        }, []);
    }

    UsersPermissionsList();
    

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

            <BottomRectangle/>
        </div>
    )
}


export default ModifyPermsPage;