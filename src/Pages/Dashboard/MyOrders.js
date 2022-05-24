import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../firebase.init';
import SingleOrder from './SingleOrder';
import Loading from '../Shared/Loading';

const MyOrders = () => {
    const [user] = useAuthState(auth);
    const [myOrders, setMyOrders] = useState([]);
    const { isLoading, error } = useQuery('myOrders', () => {
        fetch(`http://localhost:5000/myOrders?email=${user.email}`, {
        })
            .then(res => res.json())
            .then(data => setMyOrders(data))

    })
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <div class="overflow-x-auto">
                <table class="table w-full text-xl">
                    <thead >
                        <tr className='child:text-lg'>
                            <th>No.</th>
                            <th>Product Name</th>
                            <th>Address</th>
                            <th>Qty</th>
                            <th className='text-center'>Total</th>
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
                            ></SingleOrder>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyOrders;