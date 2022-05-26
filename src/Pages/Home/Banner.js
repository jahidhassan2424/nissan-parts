import React from 'react';
import banner from '../../images/banner_car.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div>
            <div className="hero ">
                <div className="hero-content flex-col lg:flex-row gap-10">
                    <img src={banner} className="max-w-2xl rounded-xl shadow-2xl w-full lg:w-full " />
                    <div>
                        <h1 className="text-3xl lg:text-6xl font-bold uppercase">Nissan Spare Parts!</h1>
                        <p className="py-6">We make best quality spare parts and supply them globally. Find your needs from our vast collection</p>
                        <Link to="/allProducts">
                            <button className="btn btn-primary btn-xl text-xl text-white font-bold  border-0 shadow-lg">ORDER NOW &nbsp; <FontAwesomeIcon icon={faArrowRight} /></button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;