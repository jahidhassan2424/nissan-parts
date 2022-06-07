import React from 'react';
import { toast } from 'react-toastify';

const ConfirmationModal = ({ clickedItem, setConfirmModal, refetch }) => {
    const handleDeleteOrder = () => {
        fetch(`http://localhost:3001/order/${clickedItem._id}`, {
            method: 'delete',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Order deleted Successfully', {
                    autoClose: 1500
                });
                refetch();
                setConfirmModal('');
            })
    }
    return (
        <div>
            {/* <!-- The button to open modal --> */}
            {/* <label for="confirmationModal" className="btn modal-button">open modal</label> */}

            {/* <!-- Put this part before </body> tag-- > */}
            <input type="checkbox" id="confirmationModal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box ">
                    <h3 className="font-bold text-lg text-red-500">You are about to delete <b>{clickedItem.productName} </b>. Placed On <b>{clickedItem.orderPlacementDate}.</b><br />
                        Are you sure?</h3>
                    <br />
                    <p><b>Note: This action can't be undone!</b></p>
                    <div className="modal-action w-full ">
                        <label for="confirmationModal" onClick={() => setConfirmModal('')} className="btn text-white w-1/4">NO</label>
                        <label for="confirmationModal" onClick={handleDeleteOrder} className="w-1/4 btn text-white hover:bg-red-800 bg-red-500 border-0 w-1/3">YES</label>

                    </div>
                </div>
            </div >
        </div>
    );
};

export default ConfirmationModal;