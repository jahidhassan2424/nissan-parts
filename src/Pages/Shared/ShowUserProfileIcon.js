import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../firebase.init';
import avater from '../../images/avater.png';
import Loading from './Loading';
import { Link } from 'react-router-dom';

const ShowUserProfileIcon = () => {
    const [user, isLoading] = useAuthState(auth);
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            {
                user && <div className='flex flex-row gap-3 py-3 bg-zinc-700 items-center justify-end px-5'>
                    <Link to="/dashboard"><p className='text-xl text-white'>Howdy, {user.displayName}</p></Link>
                    <div className="avatar">
                        <Link to="/dashboard">
                            <div className="w-8 rounded-full ring ring-primary ring-offset-zinc-700 ring-offset-2">
                                {
                                    user.photoURL
                                        ?
                                        <img src={user.photoURL} />
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