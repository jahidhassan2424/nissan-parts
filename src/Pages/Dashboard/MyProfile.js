import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../firebase.init';
import avater from '../../images/avater.png';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import './MyProfile.css'
import { useQuery } from 'react-query';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const [editForm, setEditForm] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const { refetch, isLoading } = useQuery('userInfo', () => fetch(`http://localhost:5000/users/${user.email}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    })
        .then(res => res.json())
        .then(data => {
            setUserInfo(data);
            refetch();
            setEditForm(false);

        })
    )


    //Submit edited data to database
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onEditedProfileDataSubmit = data => {
        fetch(`http://localhost:5000/updateUser/${user.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify({ data })
        })
            .then(res => res.json())
            .then(profileUpdateData => console.log(profileUpdateData))


    };
    return (
        <div>

            <div class="avatar mt-5 flex justify-center flex-col items-center gap-10">
                <div class="w-1/12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={user?.photoURL || avater} />
                </div>
                <h2 className='text-5xl'>{user.displayName}</h2>
            </div>
            <div class="overflow-x-auto">

                <div className='flex justify-around items-center justify-items-center'>
                    <div class="form-control">
                        <label class="cursor-pointer label">
                            <span class="label-text text-xl">Edit Form</span>
                            <input onChange={() => setEditForm(!editForm)} type="checkbox" checked={editForm} class="checkbox checkbox-accent" />
                        </label>
                    </div>
                </div>

                {/* Edit Form Deactivated */}
                {
                    !editForm && <div className='flex justify-center mt-10'>
                        <table className='child:text-2xl w-1/3  '>
                            <tr className='tr'>
                                <td className='pr-2'>Name</td>
                                <td>
                                    <input disabled value={userInfo.displayName || "Not set yet"} type="text" placeholder="Name" class="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" />
                                </td>
                            </tr>

                            {/* Email */}
                            <tr>
                                <td>Email</td>
                                <td>
                                    <input disabled value={userInfo.email || "Not set yet"} type="text" placeholder="Email" class="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" />
                                </td>
                            </tr>

                            {/* Address  */}
                            <tr>
                                <td>Address</td>
                                <td>
                                    <input disabled value={userInfo.address || "Not set yet"} type="text" placeholder="Email" class="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" />
                                </td>
                            </tr>
                            {/* Phone  */}
                            <tr>
                                <td>Phone</td>
                                <td>
                                    <input disabled value={userInfo.phone || "Not set yet"} type="text" placeholder="Email" class="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" />
                                </td>
                            </tr>

                            {/* Education Institution  */}
                            <tr>
                                <td>Education Institute</td>
                                <td>
                                    <input disabled value={userInfo.institute || "Not set yet"} type="text" placeholder="Email" class="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" />
                                </td>
                            </tr>

                            {/* LinkedIn Profile  */}
                            <tr>
                                <td>LinkedIn Profile</td>
                                <td>
                                    <input disabled value={userInfo.linkedIn || "Not set yet"} type="text" placeholder="Email" class="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" />
                                </td>
                            </tr>

                            {/* Facebook  */}
                            <tr>
                                <td>Facebook</td>
                                <td>
                                    <input disabled value={userInfo.facebook || "Not set yet"} type="text" placeholder="Email" class="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" />
                                </td>
                            </tr>

                        </table>
                    </div>
                }

                {/* edit form activated */}
                {
                    editForm && <form className='flex justify-center mt-10' onSubmit={handleSubmit(onEditedProfileDataSubmit)}>
                        <table className='child:text-2xl w-1/3  '>
                            <tr className='tr'>
                                <td className='pr-2'>Name</td>
                                <td>
                                    <input disabled={!editForm} type="text" placeholder="Name" class="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" {...register("displayName")} />
                                </td>
                            </tr>


                            {/* Address  */}
                            <tr>
                                <td>Address</td>
                                <td>
                                    <input type="text" placeholder="Your Address" class="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" {...register("address")} />
                                </td>
                            </tr>
                            {/* Phone  */}
                            <tr>
                                <td>Phone</td>
                                <td>
                                    <input type="number" placeholder="Phone number" class="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" {...register("phone")} />
                                </td>
                            </tr>

                            {/* Education Institution  */}
                            <tr>
                                <td>Education Institute</td>
                                <td>
                                    <input type="text" placeholder="Educational Institution" class="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" {...register("institute")} />
                                </td>
                            </tr>

                            {/* LinkedIn Profile  */}
                            <tr>
                                <td>LinkedIn Profile</td>
                                <td>
                                    <input type="text" placeholder="LinkedIn Profile Link" class="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" {...register("linkedIn")} />
                                </td>
                            </tr>

                            {/* Facebook  */}
                            <tr>
                                <td>Facebook</td>
                                <td>
                                    <input type="text" placeholder="Facebook Profile Link" class="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" {...register("facebook")} />
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