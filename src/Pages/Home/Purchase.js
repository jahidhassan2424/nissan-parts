import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsContext } from './Home/Home';

const Purchase = () => {
    const id = useParams().id;
    return (
        <div>
            <h2 className='text-2xl'>id: {id}</h2>
        </div>
    );
};

export default Purchase;