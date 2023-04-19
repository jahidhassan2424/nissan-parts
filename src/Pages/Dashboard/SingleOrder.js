import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Shared/Loading';

const SingleOrder = ({ details, index, isLoading, setClickedOrderId, setConfirmModal }) => {
    const navigate = useNavigate();
    const { _id, productName, productBrand, email, address, orderQuantity, amount, isPaid, orderPlacementDate, transactionID } = details;


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
            <td className='text-center'>{orderPlacementDate}</td>
            <td className='text-center'>{isPaid
                ?
                <div>
                    <button disabled className='btn btn-primary font-bold text-white'>PAID </button><br />
                    <div className="tooltip tooltip-primary text-sm tooltip-right" data-tip="Transaction ID">
                        <button className='text-green-500   font-bold'>
                            {transactionID || 'Not Found'}</button>
                    </div>

                </div>
                :
                <button onClick={() => handleNavigate(_id)} className='btn btn-primary font-bold text-white'>PAY </button>}</td>

            <td>{isPaid
                ?
                <div className="tooltip tooltip-primary tooltip-left" data-tip="Paid Orders Cannot be canceled">
                    <button disabled className='btn btn-error font-bold text-white'>CANCEL </button>
                </div>
                :
                <label for="confirmationModal" onClick={() => handleDeleteOrder(_id)} className='btn bg-red-500 border-0 hover:bg-red-700 font-bold text-white'>CANCEL </label>}</td>

        </tr>

    );
};

export default SingleOrder;