import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Navbar from '../Shared/Navbar/Navbar';
import { SERVER_URL } from '../Shared/variables';
const ContactUs = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
       
        try {
            const response = await axios.post(`${SERVER_URL}`, data)
            if (response.data.insertedId) {
                toast.success('Email Sent Successfully!!')
            }

        } catch (error) {
            if (error.message === 'Request failed with status code 429') {
                toast.error(error.response.data.errorMessage)
                console.log(error.response.data);
            }
            console.log(error);
            console.log(error?.response?.data?.errorMessage);
        }

    };
    return (
        <div>
            <Navbar />
            <h1 className='text-5xl my-20 font-bold text-center'>Contact Us</h1>
            <div className="w-full md:w-96 md:max-w-full mx-auto">
                <div className="p-6 border border-gray-300 sm:rounded-md">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="block mb-6">
                            <span className="text-gray-700">Your name</span>

                            <input
                                type="text"
                                name="name"
                                className="
                                    block
                                    w-full
                                    mt-1
                                    border-2
                                    p-2
                                    border-gray-400
                                    rounded-md
                                    shadow-sm
                                    focus:border-indigo-300
                                    focus:ring
                                    focus:ring-indigo-200
                                    focus:ring-opacity-50
                                "
                                placeholder="Joe Bloggs"
                                required
                                {...register('name', { required: true })}
                            />
                        </label>
                        <label className="block mb-6">
                            <span className="text-gray-700">Email address</span>
                            <input
                                name="email"
                                type="email"
                                className="
                                    block
                                    w-full
                                    mt-1
                                    border-2
                                    p-2
                                    border-gray-400
                                    rounded-md
                                    shadow-sm
                                    focus:border-indigo-300
                                    focus:ring
                                    focus:ring-indigo-200
                                    focus:ring-opacity-50
                                "
                                placeholder="joe.bloggs@example.com"
                                required
                                {...register('email', { required: true })}
                            />
                        </label>
                        <label className="block mb-6">
                            <span className="text-gray-700">Message</span>
                            <textarea
                                name="message"
                                className="
                                    block
                                    w-full
                                    mt-1
                                    border-2
                                    p-2
                                    border-gray-400
                                    rounded-md
                                    shadow-sm
                                    focus:border-indigo-300
                                    focus:ring
                                    focus:ring-indigo-200
                                    focus:ring-opacity-50
                                "
                                rows="3"
                                placeholder="Tell us what you're thinking about..."
                                required
                                {...register('message', { required: true })}
                            ></textarea>
                        </label>
                        <div className="mb-6">
                            <button
                                type="submit"
                                className="
                                    h-10
                                    px-5
                                    text-white
                                    font-bold
                                    bg-primary
                                    rounded-lg
                                    transition-colors
                                    duration-150
                                    focus:shadow-outline
                                    hover:bg-orange-500
                                "
                            >
                                Contact Us
                            </button>
                        </div>
                        <div>

                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default ContactUs;