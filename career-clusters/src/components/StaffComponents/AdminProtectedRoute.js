import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './AdminProtectedRoute.css'

const AdminProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const adminUID = 'NW0QYGlDcaRCgEk8T8r9n3MgvP22';

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (currentUser) => {
            if(currentUser && currentUser.uid === adminUID) {
                console.log('Admin user is logged in: ', currentUser)
                setUser(currentUser);
            } else {
                console.log('Failed admin authentication. Redirecting.')
                setUser(null);
            }
            setLoading(false);
        });
    }, []);

    //Loading animation
    if(loading) {
        return <div id="loading-animation"></div>
    }

    if(!user){
        console.log("user not logged in. byeeee nerd back to the lobby")
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

export default AdminProtectedRoute;