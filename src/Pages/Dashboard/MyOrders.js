import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../firebase.init';
import SingleOrder from './SingleOrder';
import Loading from '../Shared/Loading';
import ConfirmationModal from '../Shared/ConfirmationModal';
const MyOrders = () => {
    const [user] = useAuthState(auth);
    const [myOrders, setMyOrders] = useState([]);
    const [confirmModal, setConfirmModal] = useState(''); //Default value is string
    const [clickedItem, setClickedItem] = useState([]);
    const { isLoading, error, refetch } = useQuery('myOrders', () => {
        fetch(`https://evening-woodland-82887.herokuapp.com/myOrders?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setMyOrders(data))
    })
    useEffect(() => {
        {
            confirmModal && fetch(`https://evening-woodland-82887.herokuapp.com/singleOrder/${confirmModal}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => setClickedItem(data))
        }
    }, [confirmModal])

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h1 className='text-5xl my-5 font-bold mt-20 text-center'>Your Orders</h1>
            <div className="overflow-x-auto">
                <table className="table w-full text-lg">
                    <thead >
                        <tr className='child:text-md'>
                            <th>No.</th>
                            <th>Product Name</th>
                            <th>Address</th>
                            <th>Qty</th>
                            <th className='text-center'>Total</th>
                            <th className='text-center'>Date</th>
                            <th className='text-center'>Payment Status</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrders.map((myOrder, index) => <SingleOrder
                                key={myOrder._id}
                                details={myOrder}
                                index={index}
                                isLoading={isLoading}
                                id={myOrder._id}
                                refetch={refetch}
                                setConfirmModal={setConfirmModal}
                            ></SingleOrder>)
                        }
                    </tbody>
                </table>
            </div>
            {
                confirmModal && <ConfirmationModal refetch={refetch} setConfirmModal={setConfirmModal} clickedItem={clickedItem}></ConfirmationModal>
            }
        </div>
    );
};

export default MyOrders;