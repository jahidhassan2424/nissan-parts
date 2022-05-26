import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faBoxOpen, faPenNib, faUser, faUsersGear, faCubesStacked, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import useAdmin from './../hooks/useAdmin';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../firebase.init';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);

    return (
        <div >

            {/* <h1 className='text-5xl my-10  font-bold text-center'>This is your Dashboard</h1> */}
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    {/* <!-- Page content here --> */}
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button absolute top-0 left-0 lg:hidden">Open drawer</label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80  text-base-content child:mb-3">
                        {/* <!-- Sidebar content here --> */}

                        {/* My Profile  */}
                        <li><Link to="/dashboard" className='text-xl'><FontAwesomeIcon icon={faUser} />My Profile</Link></li>
                        {/* My Orders  */}
                        {
                            !admin && <div>
                                <li><Link to="/dashboard/my-orders" className='text-xl'><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>My Orders</Link></li>

                                {/* Add Review  */}
                                <li><Link to="/dashboard/my-review" className='text-xl'>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                    Add a Review</Link></li>
                            </div>
                        }
                        {/* Admin Routes  */}
                        {/* Manage  */}
                        {
                            admin && <div>
                                <li><Link to="/dashboard/manage-orders" className='text-xl'>
                                    <FontAwesomeIcon icon={faBagShopping} /> Manage Orders</Link></li>

                                {/* Manage Users  */}
                                <li><Link to="/dashboard/manage-users" className='text-xl'>
                                    <FontAwesomeIcon icon={faUsersGear} />Manage Users</Link>
                                </li>

                                {/* Add Products   */}
                                <li><Link to="/dashboard/add-product" className='text-xl'>
                                    <FontAwesomeIcon icon={faPlusCircle} />Add Product</Link>
                                </li>

                                {/* Manage Products  */}
                                <li><Link to="/dashboard/manage-products" className='text-xl'>
                                    <FontAwesomeIcon icon={faCubesStacked} />Manage Products</Link>
                                </li>
                            </div>
                        }

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;