import React from 'react';
import loader from '../../images/loader.gif';

const Loading = ({ imgWidth }) => {
    return (
        <div className='mt-10'>
            <div className=" flex justify-center items-center">
                {/* <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900">
                </div> */}
                <img width={imgWidth} src={loader} alt="" />
            </div>
        </div>
    );
};

export default Loading;