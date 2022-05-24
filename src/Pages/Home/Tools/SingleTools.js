import React from 'react';
import { useNavigate } from 'react-router-dom';
import Purchase from '../../Purchase/Purchase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../Shared/Loading';

const SingleTools = ({ isLoading, product, refetch }) => {
    const navigate = useNavigate();
    const { _id, name, brand, category, img, description, minOrder, price, itemSold, availableQty } = product;
    if (isLoading) {
        return <Loading></Loading>
    }

    const handleNavigateToPurchase = (id) => {
        console.log(id);
        navigate(`/purchase/${id}`);
    }
    return (
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl min-h-[800px]">
                <figure><img src={img} alt={`An image of ${name}`} /></figure>
                <div className="card-body text-center">
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
                    <div className="card-actions justify-center">
                        <button onClick={() => handleNavigateToPurchase(_id)} className="btn btn-primary uppercase text-white font-bold text-xl">Order Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleTools;