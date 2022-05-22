import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

const Purchase = () => {
    const { id } = useParams();
    const { data } = useQuery('singleProduct')
    return (
        <div>
            <h2 className='text-2xl'>id: {id}</h2>
        </div>
    );
};

export default Purchase;