import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const CheckOut = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState([]);

    // Order Data
    const { isLoading, refetch } = useQuery('singleOrder', () => fetch(`http://localhost:5000/singleOrder/${orderId}`)
        .then(res => res.json())
        .then(data => setOrderDetails(data))
    )
    const { productName, orderQuantity, amount } = orderDetails;

    // if (isLoading) {
    //     return <Loading></Loading>
    // }
    return (
        <div className='containerManual mt-20'>
            <h1 className='text-5xl font-bold text-center mb-20'>Checkout</h1>
            {/* <div className='grid lg:grid-col-2 grid-col-1 gap-10 grid-flow-row'> */}
            <div className='flex flex-col gap-10 lg:flex-row justify-center'>
                <div class="card w-1/3 bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h2 class=" text-3xl font-bold text-center mb-5">Your Order Details</h2>
                        <div class="overflow-x-auto">
                            <div className="flex flex-col w-full border-opacity-50">
                                <div className="divider text-xl"></div>
                            </div>
                            <table class="table w-full">
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
                <div class="card w-1/3 bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title">Card title!</h2>

                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CheckOut;