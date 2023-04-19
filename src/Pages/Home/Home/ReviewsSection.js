import React from 'react';
import { useQuery } from 'react-query';
import { useState } from 'react';
import Loading from '../../Shared/Loading';
import SingleReview from './SingleReview';

const ReviewsSection = () => {
    const [reviews, setReviews] = useState([]);
    const { isLoading, refetch } = useQuery('reviews', () => fetch(`${SERVER_URL}/reviews`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    })
        .then(res => res.json())
        .then(data => setReviews(data))
    )
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='mt-20 max-h-[1000px] overflow-auto'>
            <h1 className='text-4xl font-bold text-center mb-5'>Our Reviews</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr className='child:text-lg'>
                            <th>No.</th>
                            <th>Details</th>
                            <th className='text-center'>Review Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reviews.map((review, index) => <SingleReview
                                key={review._id}
                                review={review}
                                index={index}
                            ></SingleReview>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReviewsSection;