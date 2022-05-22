import React from 'react';
import { useNavigate } from 'react-router-dom';
import Purchase from '../Purchase';

const SingleTools = ({ product, refetch }) => {
    const navigate = useNavigate();
    const { _id, name, brand, category, img, description } = product;
    const handleNavigateToPurchase = (id) => {
        navigate(`/purchase/:${id}`);
    }
    return (
        <div>
            <div class="card card-compact w-96 bg-base-100 shadow-xl lg:min-h-[450px]">
                <figure><img src={img} alt={`An image of ${name}`} /></figure>
                <div class="card-body">
                    <h2 class="card-title text-2xl uppercase">{name}</h2>
                    <p className='text-lg'>{description}</p>
                    <div class="card-actions justify-center">
                        <button onClick={() => handleNavigateToPurchase(_id)} class="btn btn-primary uppercase text-white font-bold text-xl">Order Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleTools;