import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';4
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if(user) {
                console.log('User is logged in')
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
    }, []);


    if(loading) {
        return <h1>Loading!!! I guess</h1>
    }

    if(!user){
        console.log("user not logged in")
        sleep(2000);
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

export default ProtectedRoute;