import React from 'react';

const SingleOrder = ({ details, index }) => {
    const { productName, productBrand, email, address, orderQuantity, amount } = details;
    return (
        <div>
            <tr>
                <th>{index}</th>
                <td>{productName} </td>
                <td>{address}</td>
                <td>{orderQuantity}</td>
                <td>{amount}</td>
            </tr>
        </div>
    );
};

export default SingleOrder;