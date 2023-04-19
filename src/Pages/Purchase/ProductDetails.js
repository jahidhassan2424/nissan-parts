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
import { SERVER_URL } from '../Shared/variables';
import Navbar from '../Shared/Navbar/Navbar';
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
                isShiped: false,
            }


            // Sending Data to database
            const url = `${SERVER_URL}/orders`;
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
                    else {
                        toast.success('Order placed successfully', {
                            autoClose: 2000
                        });
                    }
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

                        fetch(`${SERVER_URL}/email`, {
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
            <div className='grid grid-cols-1 mt lg:grid-cols-3 gap-20 items-center'>
                {/* Element  1*/}
                <div className='shadow-xl rounded-xl '>
                    <img src={product.img} className="max-w-cover rounded-lg " />
                </div>
                {/* Element  2*/}
                <div className='productDetails-body  p-5 rounded-xl'>
                    <h2 className="card-title text-xl uppercase">{name}</h2>
                    <p className=" text-sm  ">Unit Price: $ {price}</p>
                    <p className=" text-sm ">Minimum Order: {minOrder} pcs</p>
                    <p className=" text-sm ">Sold: {itemSold} pcs</p>
                    <p className=" text-sm ">Available: {availableQty} pcs</p>
                    <p className=" text-sm ">Category: {category} </p>
                    <p className=" text-sm ">Brand: {brand} </p>
                    <p><span className='text-sm '>Rating: </span>
                        <FontAwesomeIcon className='text-accent text-xl' icon={faStar} />
                        <FontAwesomeIcon className='text-accent text-xl' icon={faStar} />
                        <FontAwesomeIcon className='text-accent text-xl' icon={faStar} />
                        <FontAwesomeIcon className='text-accent text-xl' icon={faStar} />
                        <FontAwesomeIcon className='text-accent text-xl' icon={faStar} />
                    </p>
                    <p className='text-sm '>{description}</p>
                </div>
                {/* Element  3*/}
                <div className='flex flex-cols justify-center ' >
                    <div className=' w-full shadow-xl sm:p-10 p-5 rounded-xl '>
                        <div className=" ">
                            <form onSubmit={handleQty} >
                                <h2 className='text-4xl  mb-5 text-center font-bold'>Customer Details</h2>
                                {/* Name  */}
                                <label className="label">
                                    <span className=" label-text text-sm">Your Name</span>
                                </label>
                                <input type="text" value={user.displayName} disabled placeholder="Type here" className=" text-sm border-black input w-full max-w-full" />
                                {/* Email */}
                                <label className="label">
                                    <span className=" label-text text-sm">Your Email</span>
                                </label>
                                <input type="text" value={user.email} disabled placeholder="Type here" className=" text-sm border-black input w-full max-w-full" />
                                {/* Address */}
                                <label className="label">
                                    <span className=" label-text text-sm">Shipping Address</span>
                                </label>
                                <input type="text" placeholder="Type Your Address" className=" text-sm border-black input w-full max-w-full" name='address' />
                                {/* Phone number */}
                                <label className="label">
                                    <span className=" label-text text-sm">Phone Number</span>
                                </label>
                                <input type="number" placeholder="You Mobile no." className=" text-sm border-black input w-full max-w-full" name="phone" />
                                <label className="label">
                                    <span className=" label-text text-sm">Enter Quantity</span>
                                </label>
                                <input type="number" onChange={(e) => setTotalPrice((e.target.value) * price)} placeholder={`Min qty ${minOrder}`} name='qty' className=" input w-full border px-5 border-black text-sm" required />
                                {
                                    qtyError && <p className='text-sm mt-2 text-red-500'>{qtyError}</p>
                                }

                                <div className=" mt-3 w-full">
                                    <button onClick={() => setPayNow(true)} type='submit' className=" mb-5 w-full  btn btn-primary uppercase text-white font-bold text-sm">Proceed To Checkout</button>

                                    <button type="submit" className="w-full  btn btn-neutral uppercase text-white font-bold text-sm">Pay later</button>
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