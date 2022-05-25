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
    console.log(confirmModal);

    const { isLoading, error, refetch } = useQuery('myOrders', () => {
        fetch(`http://localhost:5000/myOrders?email=${user.email}`, {
        })
            .then(res => res.json())
            .then(data => setMyOrders(data))
    })

    useEffect(() => {
        {
            confirmModal && fetch(`http://localhost:5000/singleOrder/${confirmModal}`)
                .then(res => res.json())
                .then(data => setClickedItem(data))

        }

    }, [confirmModal])

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full text-xl">
                    <thead >
                        <tr className='child:text-lg'>
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
                confirmModal && <ConfirmationModal setConfirmModal={setConfirmModal} clickedItem={clickedItem}></ConfirmationModal>
            }
        </div>
    );
};

export default MyOrders;