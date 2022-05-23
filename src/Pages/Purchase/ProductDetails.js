import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './ProductDetails.css'
const ProductDetails = ({ product }) => {
    const { name, brand, category, description, minOrder, price, itemSold, availableQty } = product;
    const [totalPrice, setTotalPrice] = useState(minOrder * 10);
    const [Qty, setQty] = useState(minOrder);
    const [qtyError, setQtyError] = useState('');
    const handleQty = (e) => {
        e.preventDefault();
        setQtyError('');
        const value = (e.target.qty.value);
        setTotalPrice(value * price)
        setQty(parseInt(value));
    }
    console.log('Less Qty: ', Qty);
    console.log('availableQty: ', availableQty);
    if ((Qty < minOrder) || (Qty > availableQty)) {
        setQtyError(`You can order between ${minOrder} to ${availableQty}`);
        setQty(availableQty);
    }
    return (
        <div className='grid grid-cols-2 '>
            <div className='productDetails-body'>
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
            <div className='flex flex-col justify-center items-center'>
                <div className='flex flex-cols gap-200'>
                    <div className=" ">
                        <form onSubmit={handleQty} >
                            <label className="label">
                                <span className="label-text text-xl">Enter Quantity</span>
                            </label>
                            <label className="input-group">
                                <input type="number" onChange={(e) => setTotalPrice((e.target.value) * price)} placeholder={`Min qty ${minOrder}`} name='qty' className=" border px-5 border-black text-lg" />
                                <button className='btn text-lg' type="submit">Enter</button>
                            </label>
                        </form>
                        {
                            qtyError && <p className='text-xl mt-2 text-red-500'>{qtyError}</p>
                        }
                        <div className='my-5'>
                            <p className='text-2xl text-center'>Total Price: {totalPrice}</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <button className="btn btn-primary uppercase text-white font-bold text-xl">Order Now</button>
                </div>
            </div>
        </div >
    );
};
export default ProductDetails;