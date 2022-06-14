import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../firebase.init';
import avater from '../../images/avater.png';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Navbar from './Navbar/Navbar';

const ShowUserProfileIcon = () => {
    const [user, isLoading] = useAuthState(auth);
    const [userInfo, setUserInfo] = useState([]);
    if (isLoading) {
        return <Loading imgWidth={"3%"}></Loading >
    }
    return (
        <div>
            <Navbar />
            <div className='relative'>
                {
                    user &&
                    <div className='flex flex-row gap-3 py-3 bg-zinc-700 items-center justify-end px-5'>
                        <Link to="/dashboard"><p className='text-xl text-white'>Howdy, </p></Link>
                        <div className="avatar">

                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default ShowUserProfileIcon;