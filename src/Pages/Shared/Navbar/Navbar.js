import { isAdmin } from '@firebase/util';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, NavLink } from 'react-router-dom';
import auth from '../../../firebase.init';
import avater from '../../../images/avater.png';
import useAdmin from './../../hooks/useAdmin';



const Navbar = () => {
    const [navBg, setNavBg] = useState("");
    const [navText, setNavText] = useState("");
    const [loginText, setLoginText] = useState("");
    const [loginBg, setLoginBg] = useState("");
    const [navMargin, setNavMargin] = useState("");
    const url = window.location.href;
    const [user, isLoading] = useAuthState(auth);
    const [admin] = useAdmin(user);

    //Test comment
    useEffect(() => {
        if ((url !== "https://nissan-parts.web.app/") && (url !== "https://nissan-parts.web.app/home")) {
            setNavBg("bg-black");
            setNavText("text-white");
            console.log("Matched");
            setLoginBg('bg-white');
            setLoginText("text-black")
            setNavMargin("px-[15%] ")
            console.log(navBg);
        }
        else {
            setNavBg("");
            setNavText("text-white");
            setLoginBg('bg-white');
            setLoginText("text-black")
        }
    }, [url])



    const [userInfo, setUserInfo] = useState([]);
    const handleSIgnOut = () => {
        localStorage.removeItem(`accessToken`);
        signOut(auth);
    }
    const navItems = <>
        <li ><NavLink to="/home" className={`${navText} text-md mx-2 hover:bg-primary`}>Home</NavLink></li>
        <li ><NavLink to="/allProducts" className={`${navText}  text-md mx-1 hover:bg-primary`}>Products</NavLink></li>
        <li className=' '><NavLink to="/contact" className={`${navText}  text-md mx-1 hover:bg-primary`}>Contact Us</NavLink></li>
        {
            user
                ?
                <div className='flex flex-row items-center gap-5'>
                    <div className='flex flex-row'>
                        <li className=''>
                            <NavLink to="/dashboard" className={`${navText} hover:bg-primary mx-2`}>Dashboard</NavLink>
                        </li>
                        <li onClick={handleSIgnOut} className='hover:bg-primary  rounded-lg mx-2'><NavLink to="/login" className={` ${loginBg} ${loginText}`}>Sign Out</NavLink></li>
                    </div>
                    <div class="dropdown dropdown-end">
                        <label tabindex="0">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-zinc-700 ring-offset-2">
                                {
                                    userInfo.photoURL
                                        ?
                                        <img src={userInfo.photoURL} />
                                        :
                                        <img src={avater} />
                                }
                            </div>
                        </label>
                        <ul tabindex="0" class="  dropdown-content menu p-2 shadow bg-white rounded-box w-60 mt-3">
                            <li>
                                <Link to="/dashboard " className='text-black w-full hover:bg-zinc-400'>My Profile</Link>
                            </li>
                            {
                                !admin &&
                                <li>
                                    <Link to="/dashboard/my-review " className='text-black w-full hover:bg-zinc-400'>My Review</Link>
                                </li>
                            }

                            {/* Only for users  */}
                            {
                                admin && <>
                                    <li>
                                        <Link to="/dashboard/manage-orders " className='text-black w-full hover:bg-zinc-400'>Manage Orders</Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/manage-users " className='text-black w-full hover:bg-zinc-400'>Manage Users</Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/add-product " className='text-black w-full hover:bg-zinc-400'>Add Products</Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/manage-products " className='text-black w-full hover:bg-zinc-400'>Manage Products</Link>
                                    </li>

                                </>
                            }
                            <li>
                                <button onClick={() => signOut(auth)} className='text-black w-full hover:bg-zinc-400'>Log Out</button>
                            </li>
                        </ul>
                    </div>
                </div>
                :
                <div className='flex items-center gap-5'>
                    <div>
                        <li className='hover:bg-primary  rounded-lg '><NavLink to="/login" className={` ${loginBg} ${loginText}`}>Login</NavLink></li>
                    </div>

                </div>
        }
    </>

    return (
        <div className={`navbar ${navMargin}  ${navBg} flex justify-between `}>
            <div className=" ">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className={`menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box child:text-lg  child:text-black`}>
                        {navItems}

                    </ul>
                </div>
                <Link to="/" className={` normal-case text-2xl lg:text-4xl ${navText} `}>NISSAN PARTS</Link>
            </div>
            <div className=" hidden lg:flex">
                <ul className="menu menu-horizontal p-0 text-xl">
                    {navItems}

                </ul>
            </div>

        </div>
    );
};

export default Navbar;