import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Purchase = () => {
    const { id } = useParams();
    const [product, setProducts] = useState([]);
    const { isLoading, refetch } = useQuery('singleProduct', () => fetch(`http://localhost:5000/product/${id}`)
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            console.log(data);

        })
    )
    if (isLoading) {
        return <Loading></Loading>
    }
    const { _id, name, brand, category, img, description, minOrder, price, itemSold, availableQty } = product;
    return (
        <div className='container'>
            <div class="hero mt-10">
                <div class="flex flex-col lg:flex-row gap-10">
                    <img src={img} class="max-w-xl rounded-lg shadow-2xl" />
                    <div>
                        <h2 className="card-title text-2xl uppercase">{name}</h2>
                        <p className=" text-2xl font-semibold ">Unit Price: <b>$ {price}</b></p>
                        <p className=" text-lg font-semibold">Minimum Order: <b>{minOrder}</b> pcs</p>
                        <p className=" text-lg font-semibold">Sold: <b>{itemSold}</b> pcs</p>
                        <p className=" text-lg font-semibold">Available: <b>{availableQty}</b> pcs</p>
                        <p className=" text-lg font-semibold">Category: <b className='uppercase'>{category}</b> </p>
                        <p className=" text-lg font-semibold">Brand: <b className='uppercase'>{brand}</b> </p>
                        <p><span className='text-lg font-semibold'>Rating: </span>
                            <FontAwesomeIcon className='text-primary text-xl' icon={faStar} />
                            <FontAwesomeIcon className='text-primary text-xl' icon={faStar} />
                            <FontAwesomeIcon className='text-primary text-xl' icon={faStar} />
                            <FontAwesomeIcon className='text-primary text-xl' icon={faStar} />
                            <FontAwesomeIcon className='text-primary text-xl' icon={faStar} />
                        </p>
                        <p className='text-lg '>{description}</p>
                        <div className="card-actions justify-center">
                            <button className="btn btn-primary uppercase text-white font-bold text-xl">Order Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Purchase;