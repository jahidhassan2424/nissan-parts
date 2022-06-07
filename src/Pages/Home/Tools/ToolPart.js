import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import Category from './../Category/Category';
import SingleTools from './SingleTools';

const ToolPart = () => {
    const [products, setProducts] = useState([]);
    const { isLoading, refetch } = useQuery('products', () => fetch(`http://localhost:3001/products`)
        .then(res => res.json())
        .then(data => {
            setProducts(data);
        })
    );

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='mt-16'>
            <h1 className='text-5xl font-bold text-center mb-16'>Parts Made by Us</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-y-20 justify-items-center for-testing items-center'>
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