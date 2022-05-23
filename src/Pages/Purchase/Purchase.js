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
    const { isLoading, refetch } = useQuery('singleProduct', () => fetch(`https://evening-woodland-82887.herokuapp.com/product/${id}`)
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
        <div className='containerManual'>
            <div className="hero mt-20">
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