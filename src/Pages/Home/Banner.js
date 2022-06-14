import React from 'react';
import banner from '../../images/banner_car.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div>
            <div className=" ">
                <div className="banner-content flex justify-center items-center h-[70vh] ">
                    <div className=' text-center'>

                        <p >
                            <span className=" title-text text-3xl lg:text-6xl font-bold uppercase ">Welcome to Nissan Spare Parts!</span>
                            <br />


                        </p>
                        <Link to="/allProducts">
                            <div className="text-center">
                                <button className="btn bg-white  btn-xl text-xl text-black font-bold  border-0 shadow-lg hover:text-white hover:bg-black">Explore&nbsp; <FontAwesomeIcon icon={faArrowRight} /></button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Banner;