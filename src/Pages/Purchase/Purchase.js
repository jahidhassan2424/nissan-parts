import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ProductDetails from './ProductDetails';
import { SERVER_URL } from '../Shared/variables';

const Purchase = () => {
    const { id } = useParams();
    const [product, setProducts] = useState([]);
    const { isLoading, refetch } = useQuery('singleProduct', () => fetch(`${SERVER_URL}/product/${id}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json())
        .then(data => {
            setProducts(data);

        })
    )
    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='containerManual'>
            <h1 className='text-5xl font-bold text-center mt-20'>Order Details</h1>
            <div className="hero ">
                <div>
                    <ProductDetails
                        key={product._id}
                        product={product}
                    ></ProductDetails>
                </div>

            </div >
        </div>
    );
};

export default Purchase;