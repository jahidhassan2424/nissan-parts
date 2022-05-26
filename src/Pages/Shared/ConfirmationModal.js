import React from 'react';
import { toast } from 'react-toastify';

const ConfirmationModal = ({ clickedItem, setConfirmModal, refetch }) => {
    const handleDeleteOrder = () => {
        fetch(`http://localhost:5000/order/${clickedItem._id}`, {
            method: 'delete',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Order deleted Successfully');
                refetch();
                setConfirmModal(false);
            })

    }
    return (
        <div>
            {/* <!-- The button to open modal --> */}
            {/* <label for="confirmationModal" class="btn modal-button">open modal</label> */}

            {/* <!-- Put this part before </body> tag-- > */}
            <input type="checkbox" id="confirmationModal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box ">
                    <h3 class="font-bold text-lg text-red-500">You are about to delete <b>{clickedItem.productName} </b>. Placed On <b>{clickedItem.orderPlacementDate}.</b><br />
                        Are you sure?</h3>
                    <br />
                    <p><b>Note: This action can't be undone!</b></p>
                    <div class="modal-action w-full ">
                        <label for="confirmationModal " onClick={() => setConfirmModal(false)} class="btn text-white w-1/4">NO</label>
                        <label onClick={handleDeleteOrder} class="w-1/4 btn text-white hover:bg-red-800 bg-red-500 border-0 w-1/3">YES</label>

                    </div>
                </div>
            </div >
        </div>
    );
};

export default ConfirmationModal;