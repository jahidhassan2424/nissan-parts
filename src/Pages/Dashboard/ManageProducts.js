import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import ManageSingleProducts from './ManageSingleProducts';

const ManageProducts = () => {
    // Order Data
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
        <div>
            <div class="overflow-x-auto">
                <table class="table w-full">
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