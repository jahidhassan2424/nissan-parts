import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const CustomerDetailsModal = ({ setCustomerDetailModal, product }) => {
    const [user] = useAuthState(auth);
    return (
        <div>
            <input type="checkbox" id="customerDetailsOnPurchase" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle ">

                <div class="modal-box relative">
                    <div class="modal-action  ">
                        <div className='absolute top-2 right-2 '>
                            <label for="customerDetailsOnPurchase " onClick={() => setCustomerDetailModal(false)} class="btn btn-primary font-bold rounded-full text-2xl">X</label>
                        </div>
                    </div>
                    <h3 class="font-bold text-4xl  text-center">{product.name}</h3> {/* product Name */}
                    {/* Customer Information */}
                    <div className="flex flex-col w-full mt-2 ">
                        <div className="divider text-xl">Customer Information</div>
                    </div>
                    <div className='w-full'>
                        <div class="form-control w-full max-w-full">
                            <label class="label">
                                <span class="label-text text-lg">What Name</span>
                            </label>
                            <input type="text" value={user.displayName} disabled placeholder="Your name" class="input input-bordered border-black text-xl w-full max-w-full" />

                            <label class="label">
                                <span class="label-text text-lg mt-2">Your Email</span>
                            </label>
                            <input type="text" value={user.email} disabled placeholder="Your name" class="input input-bordered border-black text-xl w-full max-w-full" />

                            <label class="label">
                                <span class="label-text text-lg mt-2">Shipping Address</span>
                            </label>
                            <input type="text" placeholder="Shipping Address" class="input  border-black text-xl w-full max-w-full" required />

                            <label class="label">
                                <span class="label-text text-lg mt-2">Phone No.</span>
                            </label>
                            <input type="number" placeholder="Mobile" class="input  border-black text-xl w-full max-w-full" required />

                            <button className='btn btn-accent text-white mt-10 font-bold text-2xl '>CHECKOUT</button>

                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default CustomerDetailsModal;