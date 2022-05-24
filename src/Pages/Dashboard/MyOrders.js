import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../firebase.init';
import SingleOrder from './SingleOrder';

const MyOrders = () => {
    const [user] = useAuthState(auth);
    const [myOrders, setMyOrders] = useState([]);
    const { isLoading, error } = useQuery('myOrders', () => {
        fetch(`http://localhost:5000/myOrders?email=${user.email}`, {
        })
            .then(res => res.json())
            .then(data => setMyOrders(data))

    })
    return (
        <div>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Product Name</th>
                            <th>Address</th>
                            <th>Qty</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrders.map((myOrder, index) => <SingleOrder
                                key={myOrder._id}
                                details={myOrder}
                                index={index}
                            ></SingleOrder>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;