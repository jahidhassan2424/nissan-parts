import React from 'react';
import banner from '../../images/banner_car.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Banner = () => {
    return (
        <div>
            <div class="hero  ">
                <div class="hero-content flex-col lg:flex-row gap-10">
                    <img src={banner} class="max-w-2xl rounded-xl shadow-2xl" />
                    <div>
                        <h1 class="text-6xl font-bold uppercase">Nissan Spare Parts!</h1>
                        <p class="py-6">We make best quality spare parts and supply them globally. Find your needs from our vast collection</p>
                        <button class="btn btn-primary btn-xl text-xl text-white font-bold bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-l border-0 shadow-lg">ORDER NOW &nbsp; <FontAwesomeIcon icon={faArrowRight} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;