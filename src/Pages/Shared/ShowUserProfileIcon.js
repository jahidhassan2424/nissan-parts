import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../firebase.init';
import avater from '../../images/avater.png';
import Loading from './Loading';

const ShowUserProfileIcon = () => {
    const [user, isLoading] = useAuthState(auth);
    console.log(user);
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            {
                user && <div className='flex flex-row gap-3 items-center justify-end px-5'>
                    <p className='text-xl'>Howdy, {user.displayName}</p>
                    <div class="avatar">
                        <div class="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            {
                                user.photoURL
                                    ?
                                    <img src={user.photoURL} />
                                    :
                                    <img src={avater} />
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default ShowUserProfileIcon;