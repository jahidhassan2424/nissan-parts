import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../firebase.init';
import { Navigate, useNavigate } from 'react-router-dom';
import Loading from './Loading';

const RequireAdmin = ({ Children }) => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {

    }, [])
    if (loading) {
        return <Loading></Loading>
    }

};

export default RequireAdmin;