import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';
const stripePromise = loadStripe('pk_test_51L1ZciEei3cvnsgH18KkXBrVikFBmpmiYfUBWq3HLfMeZf3q4G5h5v7uMFAftFPRu9S0nTcFK2LGlUksioo8y5xj00S78MY6rA');

const CheckOut = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState([]);

    // Order Data
    const { isLoading, refetch } = useQuery('singleOrder', () => fetch(`http://localhost:5000/singleOrder/${orderId}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json())
        .then(data => setOrderDetails(data))
    )
    const { productName, orderQuantity, amount, isPaid, _id } = orderDetails;

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='containerManual mt-20'>
            <h1 className='text-5xl font-bold text-center mb-20'>Checkout</h1>
            {/* <div className='grid lg:grid-col-2 grid-col-1 gap-10 grid-flow-row'> */}
            <div className='flex flex-col  lg:gap-10 lg:flex-row justify-center'>
                <div className="card w-1/3 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className=" text-3xl font-bold text-center lg:mb-5">Your Order Details {isPaid && <span className="badge badge-primary text-white">Paid</span>}</h2>
                        <div className="overflow-x-auto">
                            <div className="flex flex-col w-full border-opacity-50">
                                <div className="divider text-xl"></div>
                            </div>
                            <table className="table w-full">
                                <tbody className='child:text-xl text-center'>
                                    <tr >
                                        <th>Product</th>
                                        <td>{productName}</td>
                                    </tr>
                                    <tr >
                                        <th>Quantity</th>
                                        <td>{orderQuantity}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>${amount}</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="card w-1/3 bg-base-100 shadow-xl  ">
                    <h1 className='text-3xl font-bold text-center mt-8'>Payment</h1>
                    <div className="card-body ">
                        <Elements stripe={stripePromise}>
                            <CheckOutForm refetch={refetch} isLoading={isLoading} orderDetails={orderDetails} />
                        </Elements>


                    </div>
                </div>
            </div>

        </div>
    );
};

export default CheckOut;