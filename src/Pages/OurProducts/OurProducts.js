import React, { useState } from 'react';
import { useQuery } from 'react-query';
import SingleTools from '../Home/Tools/SingleTools';
import Loading from '../Shared/Loading';
import Navbar from './../Shared/Navbar/Navbar';
import { SERVER_URL } from '../Shared/variables';

const OurProducts = () => {
    const [products, setProducts] = useState([]);
    const { isLoading, refetch } = useQuery('products', () => fetch(`${SERVER_URL}/products`)
        .then(res => res.json())
        .then(data => {
            setProducts(data);
        })
    )
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div >
            <Navbar />

            <div className='md:mx-[15%] '>
                <h1 className='text-3xl font-bold text-center my-20'>All Products We Make</h1>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-32 gap-y-20 justify-items-center for-testing items-center'>
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
        </div>
    );
};

export default OurProducts;