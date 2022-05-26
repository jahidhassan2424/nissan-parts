import React from 'react';
import avatar from '../../../images/avater.png';

const SingleReview = ({ review, index }) => {
    const { reviewerName, reviewerEmail, userPhotoUrl, rating, description } = review;
    return (
        <tr className='  border-b-2'>
            <td>{index + 1}</td>
            <td>
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                            <img src={userPhotoUrl || avatar} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div class="font-bold">{reviewerName}</div>
                        <div class="text-[20px] opacity-80 ">Rating: {rating}/5</div>
                    </div>
                </div>
            </td>
            <td className='text-[20px]'>
                {description}
            </td>
        </tr>
    );
};

export default SingleReview;