import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import ManageSingleProducts from './ManageSingleProducts';
import { SERVER_URL } from '../Shared/variables';

const ManageProducts = () => {
    // Order Data
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
        <div className='mx-[10%] mt-20 '>
            <h1 className='text-4xl text-center font-bold mb-5'>Manage all Products</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((p, index) => <ManageSingleProducts
                                key={p._id}
                                p={p}
                                refetch={refetch}
                                index={index}
                            ></ManageSingleProducts>)
                        }

                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default ManageProducts;