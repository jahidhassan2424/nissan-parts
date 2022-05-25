import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, NavLink } from 'react-router-dom';
import auth from '../../firebase.init';


const Navbar = () => {
    const [user] = useAuthState(auth);
    const handleSIgnOut = () => {
        localStorage.removeItem(`accessToken`);
        signOut(auth);
    }
    const navItems = <>
        <li className='hover:bg-primary  hover:rounded-lg '><NavLink to="/home">Home</NavLink></li>
        <li className='hover:bg-primary  hover:rounded-lg '><NavLink to="/reviews">Reviews</NavLink></li>
        <li className='hover:bg-primary  hover:rounded-lg '><NavLink to="/blogs">Blogs</NavLink> </li>
        <li className='hover:bg-primary  hover:rounded-lg '><NavLink to="/ContactUs">Contact Us</NavLink></li>
        <li className='hover:bg-primary  hover:rounded-lg '><NavLink to="/allProducts">Products</NavLink></li>
        {
            user
                ?
                <>
                    <li className='hover:bg-primary  hover:rounded-lg '><NavLink to="/dashboard">Dashboard</NavLink></li>
                    <li onClick={handleSIgnOut} className='hover:bg-primary  hover:rounded-lg '><NavLink to="/login">SignOut</NavLink></li>
                </>
                :
                <li className='hover:bg-primary  hover:rounded-lg '><NavLink to="/login">Login</NavLink></li>
        }
    </>

    return (
        <div className="navbar containerManual ">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box ">
                        {navItems}
                    </ul>
                </div>
                <Link to="/" className="font-bold normal-case text-4xl">NISSAN PARTS</Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal p-0 text-xl">
                    {navItems}
                </ul>
            </div>

        </div>
    );
};

export default Navbar;