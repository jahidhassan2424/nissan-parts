import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ProductDetails from './ProductDetails';

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

    return (
        <div className='container'>
            <div className="hero mt-20">
                <div className="flex flex-col lg:flex-row gap-10">
                    <img src={product.img} className="max-w-xl rounded-lg shadow-2xl" />
                    <div>
                        <ProductDetails
                            key={product._id}
                            product={product}
                        ></ProductDetails>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Purchase;