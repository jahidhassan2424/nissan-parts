import React, { createContext, useState } from 'react';
import Banner from '../Banner';
import Category from '../Category/Category';
import ToolPart from '../Tools/ToolPart';
import Loading from './../../Shared/Loading';
import { useQuery } from 'react-query';

const Home = () => {

    return (

        <div className='containerManual mt-16'>
            <div className='grid  grid-cols-[1fr,5fr] ' >
                <div className='col-1'><Category /></div>
                <div style={{}}><Banner /></div>
            </div>
            <ToolPart

            ></ToolPart>
        </div>
    );
};

export default Home;