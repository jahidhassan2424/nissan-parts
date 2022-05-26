import React, { createContext, useState } from 'react';
import Banner from '../Banner';
import Category from '../Category/Category';
import ToolPart from '../Tools/ToolPart';
import ReviewsSection from './ReviewsSection';
import BusinessSummary from './BusinessSummary';

const Home = () => {

    return (

        <div className='containerManual mt-16'>
            <div className='grid  grid-cols-[1fr,5fr] ' >
                <div className='col-1'><Category /></div>
                <div style={{}}><Banner /></div>
            </div>
            <ToolPart></ToolPart>
            <ReviewsSection></ReviewsSection>
            <BusinessSummary></BusinessSummary>
        </div>
    );
};

export default Home;