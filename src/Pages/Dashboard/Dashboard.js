import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faPenNib } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    return (
        <div>
            <div class="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col items-center justify-center">
                    {/* <!-- Page content here --> */}

                    <Outlet />
                    <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div class="drawer-side">
                    <label for="my-drawer-2" class="drawer-overlay"></label>
                    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li><Link to="/" className='text-xl'><FontAwesomeIcon icon={faBoxOpen} />My Order</Link></li>
                        <li><Link to="/" className='text-xl'><FontAwesomeIcon icon={faPenNib} />Add a Review</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;