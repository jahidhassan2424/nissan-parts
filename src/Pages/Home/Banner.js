import React from 'react';
import banner from '../../images/banner_car.jpg';

const Banner = () => {
    return (
        <div>
            <div class="hero  ">
                <div class="hero-content flex-col lg:flex-row gap-10">
                    <img src={banner} class="max-w-2xl rounded-xl shadow-2xl" />
                    <div>
                        <h1 class="text-6xl font-bold">Nissan Spare Parts!</h1>
                        <p class="py-6">We make best quality spare parts and supply them globally. Find your needs from our vast collection</p>
                        <button class="btn btn-primary btn-xl text-xl text-white font-bold bg-gradient-to-r from-primary to-secondary">ORDER NOW</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;