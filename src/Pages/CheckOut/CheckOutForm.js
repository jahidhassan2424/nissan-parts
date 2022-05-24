import React, { useEffect, useState } from 'react';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import Loading from '../Shared/Loading';
import userEvent from '@testing-library/user-event';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

const CheckOutForm = ({ id }) => {
    console.log(id);

    const stripe = useStripe();
    const elements = useElements()
    const [cardError, setCardError] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [orderDetails, setOrderDetails] = useState([]);
    const [fetchDone, setFetchDone] = useState(true);
    const { isLoading, refetch } = useQuery('orderDetails', () => fetch(`http://localhost:5000/singleOrder/${id}`)
        .then(res => res.json())
        .then(data => {
            setOrderDetails(data)
        })
    )


    const { amount, customerName, email, _id, isPaid } = orderDetails;
    console.log('Amount frm chkt Form', amount);
    if (isLoading) {
        return <Loading></Loading>
    }
    else if (!amount) {
        refetch();
    }
    else if (fetchDone) {
        // useEffect(() => {
        const url = `http://localhost:5000/create-payment-intent`
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ amount })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                    setFetchDone(false)
                }
            })
        // }, [amount])
    }







    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }


        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        setCardError(error?.message || '');


        // COnfirm Payment 
        const { paymentIntent, error: confirmPaymentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: customerName,
                        email: email,
                    },
                },
            },
        );
        if (confirmPaymentError) {
            setCardError(confirmPaymentError.message);
        }
        else {
            setCardError('');
            setPaymentSuccess('Congratulations! You have completed your payment successfully');
            fetch(`http://localhost:5000/peymentStatus/${_id}`, {
                method: 'PUT',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    toast.success('Payment Successfull');
                })
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '18px',
                            color: '#000000',
                            '::placeholder': {
                                color: '#000000',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className='text-center mt-10 w-full'>
                {
                    cardError && <p className='text-red-500 text-lg mb-2 font-bold'>{cardError}</p>
                }
                {

                    paymentSuccess && <p className='text-red-500 text-lg mb-2 font-bold'>{paymentSuccess}</p>
                }
                <button className='btn btn-primary font-semibold text-white text-xl w-full' type="submit" disabled={!stripe || !clientSecret || isPaid}>
                    Pay Now
                </button>
                <Link to="/dashboard/my-orders" className='btn mt-5 btn-neutral font-semibold text-white text-xl w-full' >
                    Cancel Payment
                </Link >
            </div>
        </form>
    )
}

export default CheckOutForm;