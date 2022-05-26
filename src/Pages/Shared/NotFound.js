import React from 'react';
import NotFoundImg from '../../images/404.jpg'
const NotFound = () => {
    return (
        <div className='flex flex-col justify-center items-center mt-20'>
            <h1 className='text-5xl font-bold '>{`404! NOT FOUND :(`}</h1>
            <img width={"50%"} className="rounded-xl" src={NotFoundImg} alt="" />
        </div>
    );
};

export default NotFound;