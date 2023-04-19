import React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { SERVER_URL } from '../Shared/variables';

const ManageOrdersSingle = ({ order, index, setConfirmModal, refetch }) => {
    const { customerName, productName, email, amount, orderPlacementDate, isPaid, _id, isShipped } = order;

    //Change Shipment status
    const handleShip = (_id) => {
        fetch(`${SERVER_URL}/order/${_id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    refetch();
                    toast.success('Status Updated successfully', {
                        autoClose: 1500
                    });
                }
            })
    }

    return (
        <tr>
            <th className={`text-sm`}>{index + 1}</th>
            <td className={`text-sm`}>{customerName}</td>
            <td className={`text-sm`}>{email}</td>
            <td className={`text-sm`}>{productName}</td>
            <td className={`text-sm`}>{orderPlacementDate}</td>
            <td className={`text-sm`}>{amount}</td>
            <td className={`text-sm`}>{isPaid
                ?
                <div className="tooltip tooltip-neutral " data-tip={isShipped ? "Order Shipped" : "Payment is completed for this order"}>
                    <button className="btn btn-primary text-white">{isShipped ? "Shipped" : "Pending"}</button>
                </div>
                :
                <div className="tooltip tooltip-neutral" data-tip="Not Paid yet">
                    <button className="btn btn-primary text-white">Not Paid</button>
                </div>
            }</td>

            <td>{isPaid
                ?
                <div className="tooltip tooltip-neutral" data-tip={isShipped ? "Order Shipped" : "Click to ship"}>
                    <button disabled={isShipped} onClick={() => handleShip(_id)} className="btn btn-primary text-white">{isShipped ? "Shipped" : "Ship Now"}</button>
                </div>
                :
                <div className="tooltip tooltip-neutral" data-tip="Cancel Order">
                    <label for="confirmationModal" onClick={() => setConfirmModal(_id)} className="btn bg-red-500 border-0 hover:bg-red-700 text-white">Cancel</label>
                </div>
            }</td>
        </tr >
    );
};

export default ManageOrdersSingle;