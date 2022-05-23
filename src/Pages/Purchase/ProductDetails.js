import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './ProductDetails.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
const ProductDetails = ({ product }) => {
    const { name, brand, category, description, minOrder, price, itemSold, availableQty } = product;
    const [totalPrice, setTotalPrice] = useState(minOrder * 10);
    const [Qty, setQty] = useState(minOrder);
    const [qtyError, setQtyError] = useState('');
    const [customerDetailModal, setCustomerDetailModal] = useState(false);
    const [user] = useAuthState(auth);

    const handleQty = (e) => {
        e.preventDefault();
        const quantity = parseInt(e.target.qty.value);
        if ((quantity < minOrder) || (quantity > availableQty)) {
            setQtyError(`Quantity Must be between ${minOrder} and ${availableQty}`)
        }
        else {
            setQtyError(null);
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
                    <div className=' w-fit shadow-xl p-10 rounded-xl '>
                        <div className=" ">
                            <form onSubmit={handleQty} >
                                <h2 className='text-4xl  mb-5 text-center font-bold'>Customer Details</h2>
                                <label className="label">
                                    <span className="label-text text-xl">Your Name</span>
                                </label>
                                <input type="text" value={user.displayName} disabled placeholder="Type here" class=" text-xl border-black input w-full max-w-full" />

                                <label className="label">
                                    <span className="label-text text-xl">Your Email</span>
                                </label>
                                <input type="text" value={user.email} disabled placeholder="Type here" class=" text-xl border-black input w-full max-w-full" />

                                <label className="label">
                                    <span className="label-text text-xl">Shipping Address</span>
                                </label>
                                <input type="text" placeholder="Type Your Address" class=" text-xl border-black input w-full max-w-full" />

                                <label className="label">
                                    <span className="label-text text-xl">Phone Number</span>
                                </label>
                                <input type="number" placeholder="You Mobile no." class=" text-xl border-black input w-full max-w-full" />


                                <label className="label">
                                    <span className="label-text text-xl">Enter Quantity</span>
                                </label>
                                <label className="input-group">
                                    <input type="number" onChange={(e) => setTotalPrice((e.target.value) * price)} placeholder={`Min qty ${minOrder}`} name='qty' className=" border px-5 border-black text-lg" required />
                                    <button type="submit" for="customerDetailsOnPurchase" className="modal-button btn btn-primary uppercase text-white font-bold text-xl">Order Now</button>
                                </label>
                                <div className="">
                                </div>
                            </form>
                            {
                                qtyError && <p className='text-xl mt-2 text-red-500'>{qtyError}</p>
                            }
                            <div className='my-5'>
                                <p className='text-2xl text-center'>Total Price: {totalPrice}</p>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>

    );
};
export default ProductDetails;