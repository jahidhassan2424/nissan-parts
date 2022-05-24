import React from 'react';

const SingleOrder = ({ details, index }) => {
    const { productName, productBrand, email, address, orderQuantity, amount, isPaid } = details;
    return (

        <tr >
            <th>{index + 1}</th>
            <td>{productName} </td>
            <td>{address}</td>
            <td>{orderQuantity}</td>
            <td className='text-center'>$ {amount}</td>
            <td className='text-center'>{isPaid ? <button disabled className='btn btn-primary font-bold text-white'>PAID </button> : <button className='btn btn-primary font-bold text-white'>PAY </button>}</td>

            <td>{isPaid ? <button disabled className='btn btn-error font-bold text-white'>CANCEL </button> : <button className='btn bg-red-500 border-0 hover:bg-red-700 font-bold text-white'>CANCEL </button>}</td>
        </tr>

    );
};

export default SingleOrder;