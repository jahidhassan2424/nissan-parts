import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import Category from './../Category/Category';
import SingleTools from './SingleTools';
import { SERVER_URL } from '../../Shared/variables';

const ToolPart = () => {
    const [products, setProducts] = useState([]);
    const { isLoading, refetch } = useQuery('products', () => fetch(`${SERVER_URL}/products`)
        .then(res => res.json())
        .then(data => {
            setProducts(data);
        })
    );

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='mb-52'>
            <h1 className='text-5xl font-bold text-center mb-32'>Parts Made by Us</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-y-20 gap-x-32 justify-items-center for-testing items-center'>
                {
                    products.slice(0, 6).map(product => <SingleTools
                        key={product._id}
                        product={product}
                        refetch={refetch}
                    ></SingleTools>)
                }
            </div>
        </div>
    );
}
export default ToolPart;