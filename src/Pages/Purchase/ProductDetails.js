import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './ProductDetails.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
import SendEmail from './../Shared/SendEmail';
import { Link, useNavigate } from 'react-router-dom';
import Checkouot from '../CheckOut/CheckOut';
import CheckOut from '../CheckOut/CheckOut';
import { format } from 'date-fns';
const ProductDetails = ({ product }) => {
    const { _id, name, brand, category, description, minOrder, price, itemSold, availableQty } = product;
    const [totalPrice, setTotalPrice] = useState(minOrder * 10);
    const [qtyError, setQtyError] = useState('');
    const [user] = useAuthState(auth);
    const [payNow, setPayNow] = useState(false);
    const navigate = useNavigate();
    const date = new Date();
    const formatedDate = format(date, 'PP')

    const handleQty = (e) => {
        e.preventDefault();

        const quantity = parseInt(e.target.qty.value);
        if ((quantity < minOrder) || (quantity > availableQty)) {
            setQtyError(`Quantity Must be between ${minOrder} and ${availableQty}`)
        }
        else {
            setQtyError(null);
            const placeOrderInfo = {
                customerName: user.displayName,
                productName: name,
                productId: _id,
                productBrand: brand,
                email: user.email,
                address: e.target.address.value,
                phone: e.target.phone.value,
                orderQuantity: e.target.qty.value,
                amount: totalPrice,
                orderPlacementDate: formatedDate,
                isPaid: false,
            }


            // Sending Data to database
            const url = `http://localhost:5000/orders`;
            fetch(url, {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'content-type': 'application/json'
                },

                body: JSON.stringify(placeOrderInfo)
            })
                .then(res => {
                    return res.json();

                })
                .then(data => {
                    const insertedId = data.insertedId;
                    if (payNow) {
                        navigate(`/checkout/${insertedId}`)
                    }
                    toast.success('Order placed successfully', {
                        autoClose: 2000
                    });
                    if (!(data.acknowledged)) {
                        // Send order Success Email
                        const emailBody = {
                            toEmail: user.email,
                            subject: "About order",
                            text: `
                            Product Info 
                            Name: ${placeOrderInfo.name}
                            Email: ${placeOrderInfo.email},
                            Address: ${placeOrderInfo.address},
                            Phone: ${placeOrderInfo.phone},
                            Quantity: ${placeOrderInfo.orderQuantity},
                            Total Price: ${totalPrice},
                            Payment Status: ${payNow ? "Paid" : "Not Paid"},
                            `,
                        }

                        fetch(`http://localhost:5000/email`, {
                            method: 'POST',
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                                'content-type': 'application/json'
                            },

                            body: JSON.stringify(emailBody)
                        })
                            .then(res => res.json())
                            .then(data => console.log(data))

                        toast.success('Order Placed Successfully', {
                            autoClose: 1500
                        });
                        setPayNow(false);


                    }
                })
        }
    }

    return (
        <div>
            <div className='grid grid-cols-3 gap-20 items-center'>
                {/* Element  1*/}
                <div className='shadow-xl rounded-xl '>
                    <img src={product.img} className="max-w-cover rounded-lg " />
                </div>
                {/* Element  2*/}
                <div className='productDetails-body  p-5 rounded-xl'>
                    <h2 className="card-title text-2xl uppercase">{name}</h2>
                    <p className=" text-2xl font-semibold ">Unit Price: <b>$ {price}</b></p>
                    <p className=" text-lg font-semibold">Minimum Order: <b>{minOrder}</b> pcs</p>
                    <p className=" text-lg font-semibold">Sold: <b>{itemSold}</b> pcs</p>
                    <p className=" text-lg font-semibold">Available: <b>{availableQty}</b> pcs</p>
                    <p className=" text-lg font-semibold">Category: <b className='uppercase'>{category}</b> </p>
                    <p className=" text-lg font-semibold">Brand: <b className='uppercase'>{brand}</b> </p>
                    <p><span className='text-lg font-semibold'>Rating: </span>
                        <FontAwesomeIcon className='text-accent text-xl' icon={faStar} />
                        <FontAwesomeIcon className='text-accent text-xl' icon={faStar} />
                        <FontAwesomeIcon className='text-accent text-xl' icon={faStar} />
                        <FontAwesomeIcon className='text-accent text-xl' icon={faStar} />
                        <FontAwesomeIcon className='text-accent text-xl' icon={faStar} />
                    </p>
                    <p className='text-lg '>{description}</p>
                </div>
                {/* Element  3*/}
                <div className='flex flex-cols justify-center ' >
                    <div className=' w-full shadow-xl p-10 rounded-xl '>
                        <div className=" ">
                            <form onSubmit={handleQty} >
                                <h2 className='text-4xl  mb-5 text-center font-bold'>Customer Details</h2>
                                {/* Name  */}
                                <label className="label">
                                    <span className="label-text text-xl">Your Name</span>
                                </label>
                                <input type="text" value={user.displayName} disabled placeholder="Type here" className=" text-xl border-black input w-full max-w-full" />
                                {/* Email */}
                                <label className="label">
                                    <span className="label-text text-xl">Your Email</span>
                                </label>
                                <input type="text" value={user.email} disabled placeholder="Type here" className=" text-xl border-black input w-full max-w-full" />
                                {/* Address */}
                                <label className="label">
                                    <span className="label-text text-xl">Shipping Address</span>
                                </label>
                                <input type="text" placeholder="Type Your Address" className=" text-xl border-black input w-full max-w-full" name='address' />
                                {/* Phone number */}
                                <label className="label">
                                    <span className="label-text text-xl">Phone Number</span>
                                </label>
                                <input type="number" placeholder="You Mobile no." className=" text-xl border-black input w-full max-w-full" name="phone" />
                                <label className="label">
                                    <span className="label-text text-xl">Enter Quantity</span>
                                </label>
                                <input type="number" onChange={(e) => setTotalPrice((e.target.value) * price)} placeholder={`Min qty ${minOrder}`} name='qty' className=" input w-full border px-5 border-black text-lg" required />
                                {
                                    qtyError && <p className='text-xl mt-2 text-red-500'>{qtyError}</p>
                                }

                                <div className=" mt-3 w-full">
                                    <button onClick={() => setPayNow(true)} type='submit' className=" mb-5 w-full  btn btn-primary uppercase text-white font-bold text-xl">Proceed To Checkout</button>

                                    <button type="submit" className="w-full  btn btn-neutral uppercase text-white font-bold text-xl">Pay later</button>
                                </div>
                            </form>
                            <div className='my-5'>
                                <p className='text-2xl text-center'>Total Price: ${totalPrice}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
export default ProductDetails;