import React, { useState } from 'react';
import { UserCircle } from 'react-hero-icon/solid';
import { useQuery } from 'react-query';
import Loading from './../Shared/Loading';
import SingleUser from './SingleUser';
import useAdmin from './../hooks/useAdmin';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../firebase.init';
import NotFound from '../Shared/NotFound';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    const { isLoading, refetch } = useQuery('users', () => fetch(`http://localhost:5000/users`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    })
        .then(res => res.json())
        .then(data => setUsers(data))
    )
    if (isLoading) {
        return <Loading />
    }
    return (
        <div className='mt-20'>
            {
                admin
                    ?
                    <div>
                        <h1 className='text-3xl mb-5 font-bold'>All Users Listed Below</h1>
                        <div class="overflow-x-auto">
                            <table class="table w-full">
                                <thead>
                                    <tr className='child:text-lg'>
                                        <th>No.</th>
                                        <th>Email</th>
                                        <th>Manage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((user, index) => <SingleUser
                                            key={user._id}
                                            user={user}
                                            index={index}
                                            refetch={refetch}
                                        ></SingleUser>)
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                    :
                    <div>
                        <NotFound></NotFound>
                    </div>
            }
        </div>
    );
};

export default ManageUsers;