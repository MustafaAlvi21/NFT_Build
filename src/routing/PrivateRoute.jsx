import React, { useEffect, useState } from 'react'
import { isValidObject } from '../utils/isValidObject'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../ContextAPI/Components/auth';
import { Triangle } from 'react-loader-spinner';
import TriangleLoader from '../components/TriangleLoader';
import { MLMDomains, adminDomains } from '../config';
// import { useLoading } from '../ContextAPI/Components/loading';



const PrivateRoute = ({ role }) => {
    const location = useLocation();
    const { user, setuser, getLoginUser } = useAuth();
    // const { isLoading, setisLoading } = useLoading();
    const [isLoading, setisLoading] = useState(true);


    const getUser = async () => {
        const res = await getLoginUser();
        setisLoading(false)
    }


    useEffect(() => {
        if (user === null || (Object.values(user)).length == 0 && sessionStorage.getItem('pk2') != null || typeof sessionStorage.getItem('pk2') == "undefined") {
            getUser()
        } else {
            setisLoading(false)
        }
    }, [location.pathname])


    if (isLoading) {
        return <TriangleLoader />

    }

    if (!isLoading && !isValidObject(user)) {
        if (MLMDomains.includes(window.location.origin)) {
            return <Navigate to="/" />
        } else if (adminDomains.includes(window.location.origin)) {
            return <Navigate to="/" />
        } else {
            return <Navigate to="/buy" />
        }
    }
    else if (!isLoading && isValidObject(user) && user.role == role) {
        return <Outlet />;

    } else {
console.log(user, role);
        if (MLMDomains.includes(window.location.origin)) {
            console.log("9999999999999999999999999999");
            return <Navigate to="/" />
        } else if (adminDomains.includes(window.location.origin)) {
            return <Navigate to="/" />
        } else {
            return <Navigate to="/buy" />
        }
    }

}


export default PrivateRoute
