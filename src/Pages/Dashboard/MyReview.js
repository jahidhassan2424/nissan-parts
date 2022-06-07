import React from 'react';
import { useForm } from "react-hook-form";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../firebase.init';
import { format } from 'date-fns';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const MyReview = () => {
    const date = new Date();
    const formatedDate = format(date, 'PP')

    const [user] = useAuthState(auth);
    console.log('global user', user);
    const [error, setError] = useState('');
    //User info to show the updated name of user
    const [userInfo, setUserInfo] = useState([]);

    const { refetch, isLoading } = useQuery('userInfo', () => fetch(`http://localhost:3001/users/${user.email}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    })
        .then(res => res.json())
        .then(data => {
            setUserInfo(data);
        })
    )
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = data => {
        const reviewDetails = {
            userName: userInfo.displayName,
            userPhotoUrl: user.photoURL,
            rating: data.rating,
            description: data.description,
            date: formatedDate,
        }
        fetch(`http://localhost:3001/reviews/${user.email}`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify({ reviewDetails })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.message) {
                    toast.error(`Cannot add same review twice. Change the description and try again`);
                }
                else {
                    setError('');
                    toast.success('Thanks for your review', {
                        autoClose: 1500
                    })
                }
            })
    };
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='flex justify-center flex-col items-center w-full '>
            <h2 className='text-5xl font-bold mt-20'>Add a Review</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="text-xl">Rating </span>
                    </label>
                    <select className="select w-full  border-2 border-zinc-300 child:text-xl text-xl"
                        {...register("rating", { required: true })}>
                        <option disabled selected>Select One</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <label className="label">
                        <span className="text-xl">Message </span>
                    </label>
                    <textarea className='border-2 w-full  text-xl border-zinc-300 p-3 shadow-xl rounded-xl' name="description" id="" cols="70" rows="10"
                        {...register("description", { required: true })} ></textarea>
                </div>

                <div className='w-full mt-10 '>
                    {
                        error &&
                        <p className='text-red-500 font-bold text-lg mb-2 text-center'>{error}</p>
                    }
                    <button className='btn btn-primary w-full shadow-lg font-bold text-2xl text-white'>SUBMIT</button>
                </div>
            </form>
        </div>
    );
};

export default MyReview;