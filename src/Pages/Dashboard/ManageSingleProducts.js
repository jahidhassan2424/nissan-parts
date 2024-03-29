import React from 'react';
import { toast } from 'react-toastify';
import { SERVER_URL } from '../Shared/variables';

const ManageSingleProducts = ({ p, index, refetch }) => {
    const { name, price, availableQty, _id } = p;
    const handleDelete = id => {
        const confirmation = window.confirm('Are you sure?');
        if (confirmation) {
            fetch(`${SERVER_URL}/product/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        toast.success('Data Deleted Successfully');
                        refetch();
                    }
                })
        }

    }
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{name}</td>
            <td>{price}</td>
            <td>{availableQty}</td>
            <td><button onClick={() => handleDelete(_id)} className='btn text-white border-0 bg-red-500'>Delete</button></td>
        </tr>
    );
};

export default ManageSingleProducts;