import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../Shared/ConfirmationModal';
import Loading from '../Shared/Loading';

const SingleOrder = ({ details, index, isLoading, setClickedOrderId, setConfirmModal }) => {
    const navigate = useNavigate();
    const { _id, productName, productBrand, email, address, orderQuantity, amount, isPaid } = details;


    if (isLoading) {
        return <Loading></Loading>
    }
    const handleNavigate = (id) => {
        navigate(`/checkOut/${id}`)
    }
    const handleDeleteOrder = (id) => {
        setConfirmModal(id);


    }


    return (

        <tr >
            <th>{index + 1}</th>
            <td>{productName} </td>
            <td>{address}</td>
            <td>{orderQuantity}</td>
            <td className='text-center'>$ {amount}</td>
            <td className='text-center'>{isPaid ? <button disabled className='btn btn-primary font-bold text-white'>PAID </button> : <button onClick={() => handleNavigate(_id)} className='btn btn-primary font-bold text-white'>PAY </button>}</td>

            <td>{isPaid ? <button disabled className='btn btn-error font-bold text-white'>CANCEL </button> : <label for="confirmationModal" onClick={() => handleDeleteOrder(_id)} to="/" className='btn bg-red-500 border-0 hover:bg-red-700 font-bold text-white'>CANCEL </label>}</td>

        </tr>

    );
};

export default SingleOrder;