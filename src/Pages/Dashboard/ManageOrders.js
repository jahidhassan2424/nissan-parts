import React from 'react';
import NotFound from '../Shared/NotFound';
import useAdmin from './../hooks/useAdmin';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../firebase.init';

const ManageOrders = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);

    return (
        <div>
            {
                admin
                    ?
                    <div>
                        <button onClick={() => fetch(`http://localhost:5000/orders`, {
                            method: 'delete',
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('accessToken')}`
                            }
                        })} className='btn btn-primary '>DELETE ALL ORDERS</button>
                    </div>
                    :
                    <div>
                        <NotFound></NotFound>
                    </div>
            }
        </div>
    );
};

export default ManageOrders;