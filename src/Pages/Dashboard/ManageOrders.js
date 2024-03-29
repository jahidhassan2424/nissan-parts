import React from 'react';
import NotFound from '../Shared/NotFound';
import useAdmin from './../hooks/useAdmin';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../firebase.init';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useState } from 'react';
import ManageOrdersSingle from './ManageOrdersSingle';
import ConfirmationModal from '../Shared/ConfirmationModal';
import Loading from '../Shared/Loading';
import { SERVER_URL } from '../Shared/variables';

const ManageOrders = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    const [orders, setOrders] = useState([]);
    const [confirmModal, setConfirmModal] = useState('');
    const [clickedItem, setClickedItem] = useState([]);

    const { isLoading, refetch } = useQuery('allOrders', () => fetch(`${SERVER_URL}/orders`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    })
        .then(res => res.json())
        .then(data => {
            setOrders(data);
        })
    )
    useEffect(() => {
        fetch(`${SERVER_URL}/singleOrder/${confirmModal}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setClickedItem(data)
            })

    }, [confirmModal])

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='mx-[8%] mt-20'>
            {
                admin
                    ?
                    <div>
                        <h1 className='text-3xl font-bold text-center mb-5'>Manage all Orders</h1>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Product Name</th>
                                        <th className='text-center'>Date</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Manage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.map((order, index) => <ManageOrdersSingle
                                            key={order._id}
                                            order={order}
                                            index={index}
                                            setConfirmModal={setConfirmModal}
                                            confirmModal={confirmModal}
                                            refetch={refetch}
                                        ></ManageOrdersSingle>)
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
            {
                //confirmModal contains the clicked items ID
                confirmModal && <ConfirmationModal refetch={refetch} clickedItem={clickedItem} ></ConfirmationModal>
            }

        </div>
    );
};

export default ManageOrders;