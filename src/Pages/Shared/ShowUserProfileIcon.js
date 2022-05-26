import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../firebase.init';
import avater from '../../images/avater.png';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

const ShowUserProfileIcon = () => {
    const [user, isLoading] = useAuthState(auth);
    const [userInfo, setUserInfo] = useState([]);

    // const { refetch, isLoading: userInfoLoading } = useQuery('userInfo', () => fetch(`http://localhost:5000/users/${user?.email || ''}`, {
    //     headers: {
    //         authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    //     },
    // })
    //     .then(res => res.json())
    //     .then(data => {
    //         setUserInfo(data);
    //     })
    // )

    if (isLoading) {
        return <Loading imgWidth={"3%"}></Loading >
    }
    return (
        <div className='relative'>
            {
                user && <div className='flex flex-row gap-3 py-3 bg-zinc-700 items-center justify-end px-5'>
                    <Link to="/dashboard"><p className='text-xl text-white'>Howdy, {userInfo.displayName || user.displayName}</p></Link>
                    <div className="avatar">
                        <Link to="/dashboard">
                            <div className="w-8 rounded-full ring ring-primary ring-offset-zinc-700 ring-offset-2">
                                {
                                    userInfo.photoURL
                                        ?
                                        <img src={userInfo.photoURL} />
                                        :
                                        <img src={avater} />
                                }
                            </div>
                        </Link>
                    </div>
                </div>
            }
        </div>
    );
};

export default ShowUserProfileIcon;