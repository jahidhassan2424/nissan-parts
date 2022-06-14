import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../firebase.init';
import avater from '../../images/avater.png';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import './MyProfileOnly.css'
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from './../Shared/Loading';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const [editForm, setEditForm] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const [processing, setProcessing] = useState(false);
    const { refetch, isLoading } = useQuery('userInfo', () => fetch(`https://agile-oasis-28074.herokuapp.com/users/${user.email}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    })
        .then(res => res.json())
        .then(data => {
            setUserInfo(data);
        })
    )


    //Submit edited data to database
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onEditedProfileDataSubmit = data => {
        setProcessing(true);
        fetch(`https://agile-oasis-28074.herokuapp.com/updateUser/${user.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify({ data })
        })
            .then(res => res.json())
            .then(profileUpdateData => {
                if (profileUpdateData.acknowledged) {
                    refetch();
                    setEditForm(false);
                    toast.success("Profile updated successfully", {
                        autoClose: 1500
                    });
                }
            })
        setProcessing(false);

    };
    if (processing || isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            {/* <h2 className='text-5xl font-bold mt-20 text-center'>Your Profile</h2> */}
            <div className="avatar mt-20 flex justify-center flex-col items-center gap-10">
                <div className="w-1/2 lg:w-1/12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={user?.photoURL || avater} />
                </div>
                <h2 className='text-5xl'>{userInfo.displayName || user.displayName}</h2>
            </div>
            <div className="overflow-x-auto">

                <div className='flex justify-around items-center justify-items-center'>
                    <div className="form-control">
                        <label className="cursor-pointer label">
                            <span className="label-text text-xl">Edit Form</span>
                            <input onChange={() => setEditForm(!editForm)} type="checkbox" checked={editForm} className="checkbox checkbox-accent" />
                        </label>
                    </div>
                </div>

                {/* Edit Form Deactivated */}
                {
                    !editForm &&
                    <div className='flex justify-center mt-10'>
                        <table className='child:text-xl w-full lg:w-1/3 mx-3 lg:mx-0 myProfileTable '>
                            <tr className=''>
                                <td className='pr-2'>Name :</td>
                                <td>
                                    <input disabled value={userInfo.displayName || "Not set yet"} type="text" placeholder="Name" className=" p-2 rounded-xl  w-full " />
                                </td>
                            </tr>

                            {/* Email */}
                            <tr>
                                <td>Email :</td>
                                <td>
                                    <input disabled value={userInfo.email || "Not set yet"} type="text" placeholder="Email" className=" p-2 rounded-xl  w-full " />
                                </td>
                            </tr>

                            {/* Address  */}
                            <tr>
                                <td>Address :</td>
                                <td>
                                    <input disabled value={userInfo.address || "Not set yet"} type="text" placeholder="Email" className=" p-2 rounded-xl  w-full " />
                                </td>                            </tr>
                            {/* Phone  */}
                            <tr>
                                <td>Phone :</td>
                                <td>
                                    <input disabled value={userInfo.phone || "Not set yet"} type="text" placeholder="Email" className=" p-2 rounded-xl  w-full " />
                                </td>
                            </tr>

                            {/* Education Institution  */}
                            <tr>
                                <td>Education Institute :</td>
                                <td>
                                    <input disabled value={userInfo.institute || "Not set yet"} type="text" placeholder="Email" className=" p-2 rounded-xl  w-full " />
                                </td>
                            </tr>

                            {/* LinkedIn Profile  */}
                            <tr>
                                <td>LinkedIn Profile :</td>
                                <td>
                                    <input disabled value={userInfo.linkedIn || "Not set yet"} type="text" placeholder="Email" className=" p-2 rounded-xl  w-full " />
                                </td>
                            </tr>

                            {/* Facebook  */}
                            <tr>
                                <td>Facebook :</td>
                                <td>
                                    <input disabled value={userInfo.facebook || "Not set yet"} type="text" placeholder="Email" className=" p-2 rounded-xl  w-full " />
                                </td>
                            </tr>

                        </table>
                    </div>
                }

                {/* edit form activated */}
                {
                    editForm &&
                    <h1 className='text-xl my-5 text-primary text-center'>Note: Changing name may take some time to appear.</h1>
                }
                {
                    editForm && <form className='flex justify-center mt-10' onSubmit={handleSubmit(onEditedProfileDataSubmit)}>
                        <table className='child:text-xl lg:w-1/3 mx-3 lg:mx-0 myProfileTable '>
                            <tr className='tr'>
                                <td className='pr-2'>Name</td>
                                <td>
                                    <input type="text" placeholder="Name" className="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" {...register("displayName")} />
                                </td>
                            </tr>


                            {/* Address  */}
                            <tr>
                                <td>Address</td>
                                <td>
                                    <input type="text" placeholder="Your Address" className="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" {...register("address")} />
                                </td>
                            </tr>
                            {/* Phone  */}
                            <tr>
                                <td>Phone</td>
                                <td>
                                    <input type="number" placeholder="Phone number" className="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" {...register("phone")} />
                                </td>
                            </tr>

                            {/* Education Institution  */}
                            <tr>
                                <td>Education Institute</td>
                                <td>
                                    <input type="text" placeholder="Educational Institution" className="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" {...register("institute")} />
                                </td>
                            </tr>

                            {/* LinkedIn Profile  */}
                            <tr>
                                <td>LinkedIn Profile</td>
                                <td>
                                    <input type="text" placeholder="LinkedIn Profile Link" className="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" {...register("linkedIn")} />
                                </td>
                            </tr>

                            {/* Facebook  */}
                            <tr>
                                <td>Facebook</td>
                                <td>
                                    <input type="text" placeholder="Facebook Profile Link" className="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" {...register("facebook")} />
                                </td>
                            </tr>
                            <tr className='text-center  '>
                                <td colSpan={2}>
                                    <button type="submit" className='w-full mt-5 btn btn-primary text-white font-bold'>SUBMIT</button>
                                </td>
                            </tr>
                        </table>
                    </form>
                }
            </div>
        </div>
    );
};

export default MyProfile;