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
        navigate(`/purchase/${id}`);
    }
    return (
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl min-h-[800px] bg-secondary">
                <figure><img src={img} alt={`An image of ${name}`} /></figure>
                <div className='text-center'>
                    <h2 className=" text-2xl my-10 font-semibold uppercase">{name}</h2>
                </div>
                <div className="card-body text-left">
                    <p className=" text-2xl  ">Unit Price:$ {price}</p>
                    <p className=" text-lg ">Minimum Order:{minOrder} pcs</p>
                    <p className=" text-lg ">Sold:{itemSold} pcs</p>
                    <p className=" text-lg ">Available:{availableQty} pcs</p >
                    <p className=" text-lg ">Category: <span className='uppercase'>{category}</span> </p>
                    <p className=" text-lg ">Brand: <span className='uppercase'>{brand}</span> </p>
                    <p><span className='text-lg '>Rating: </span>
                        <FontAwesomeIcon className='text-orange-500 text-xl' icon={faStar} />
                        <FontAwesomeIcon className='text-orange-500 text-xl' icon={faStar} />
                        <FontAwesomeIcon className='text-orange-500 text-xl' icon={faStar} />
                        <FontAwesomeIcon className='text-orange-500 text-xl' icon={faStar} />
                        <FontAwesomeIcon className='text-orange-500 text-xl' icon={faStar} />
                    </p>
                    <p className='text-lg '>{description}</p>
                    <div className="card-actions justify-center">
                        <button onClick={() => handleNavigateToPurchase(_id)} className="btn btn-primary uppercase text-white font-bold text-xl">Order Now</button>
                    </div>
                </div >
            </div >
        </div >
    );
};

export default SingleTools;