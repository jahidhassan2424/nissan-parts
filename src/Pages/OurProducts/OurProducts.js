import React, { useState } from 'react';
import { useQuery } from 'react-query';
import SingleTools from '../Home/Tools/SingleTools';
import Loading from '../Shared/Loading';

const OurProducts = () => {
    const [products, setProducts] = useState([]);
    const { isLoading, refetch } = useQuery('products', () => fetch(`https://evening-woodland-82887.herokuapp.com/products`)
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
            <h1 className='text-4xl font-bold text-center my-20'>All Products We Make</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-y-20 justify-items-center for-testing items-center'>
                {
                    products.map(product => <SingleTools
                        key={product._id}
                        product={product}
                        refetch={refetch}
                        isLoading={isLoading}
                    ></SingleTools>)
                }
            </div>
        </div>
    );
};

export default OurProducts;