import React from 'react';

const Loading = () => {
    return (
        <div className='mt-10'>
            <div className=" flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900">
                    <p className='font-bolder text-5xl'>o</p>
                </div>
            </div>
        </div>
    );
};

export default Loading;