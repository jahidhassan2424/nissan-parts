import React, { useEffect, useState } from 'react';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import Loading from '../Shared/Loading';

const CheckOutForm = ({ orderDetails, isLoading }) => {
    const stripe = useStripe();
    const elements = useElements()
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    if (isLoading) {
        return <Loading></Loading>
    }

    const { amount } = orderDetails;
    console.log(amount);
    const price = amount;

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
            }
        })




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
        if (error) {
            setCardError(error.message);
        }
        else {
            setCardError('');
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
                <button className='btn btn-primary font-semibold text-xl w-full' type="submit" disabled={!stripe || !clientSecret}>
                    Pay Now
                </button>
            </div>
        </form>
    )
}

export default CheckOutForm;