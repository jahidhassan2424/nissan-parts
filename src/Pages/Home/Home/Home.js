import React from 'react';
import Banner from '../Banner';
import Category from '../Category/Category';

const Home = () => {
    return (
        <div className='container pt-20'>
            <div className='grid  grid-cols-[1fr,5fr] ' >
                <div className='col-1'><Category /></div>
                <div style={{}}><Banner /></div>
            </div>
        </div>
    );
};

export default Home;