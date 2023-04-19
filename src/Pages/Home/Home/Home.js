import React, { createContext, useState } from 'react';
import Banner from '../Banner';
import Category from '../Category/Category';
import ToolPart from '../Tools/ToolPart';
import ReviewsSection from './ReviewsSection';
import BusinessSummary from './BusinessSummary';
import Navbar from '../../Shared/Navbar/Navbar';


const Home = () => {
    return (
        <div className='h-fit '>
            <div className='home-hero'>
                <div className='hero-child '>
                    <Navbar />
                    <Banner />
                </div>
                <div className='md:mx-[15%] h-fit  ' >
                    {/* <div className='col-1'><Category /></div> */}
                    <ToolPart></ToolPart>
                    {/* <ReviewsSection></ReviewsSection> */}
                    <BusinessSummary></BusinessSummary>
                </div>
            </div>
        </div>
    );
};
export default Home;