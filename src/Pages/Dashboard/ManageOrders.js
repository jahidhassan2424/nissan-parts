import React from 'react';

const ManageOrders = () => {


    return (
        <div>
            <button onClick={() => fetch(`http://localhost:5000/orders`, {
                method: 'delete',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })} className='btn btn-primary '>DELETE ALL ORDERS</button>
        </div>
    );
};

export default ManageOrders;