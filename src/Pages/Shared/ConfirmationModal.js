import React from 'react';

const ConfirmationModal = ({ clickedItem }) => {
    console.log('From orderConfirm Modal', clickedItem);

    return (
        <div>
            {/* <!-- The button to open modal --> */}
            {/* <label class="btn modal-button">open modal</label> */}

            {/* <!-- Put this part before </body> tag-- > */}
            <input type="checkbox" id="confirmationModal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">You are about to delete <b>{clickedItem.productName} </b>. Placed On
                        .Are you sure?</h3>

                    <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                    <div class="modal-action">
                        <label for="confirmationModal" class="btn">Yay!</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ConfirmationModal;