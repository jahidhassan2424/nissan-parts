import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../firebase.init';
import avater from '../../images/avater.png';

const MyProfile = () => {
    const [user] = useAuthState(auth);

    return (
        <div>
            <div class="avatar mt-5 flex justify-center">
                <div class="w-1/12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={user?.photoURL || avater} />
                </div>
            </div>
        </div>
    );
};

export default MyProfile;