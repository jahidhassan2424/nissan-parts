import React from 'react';
import { toast } from 'react-toastify';
import useAdmin from './../hooks/useAdmin';
import { SERVER_URL } from '../Shared/variables';

const SingleUser = ({ user, index, refetch }) => {
    const [admin] = useAdmin(user);
    const { email, role } = user;


    // fetch(`${SERVER_URL}/users`, {
    //     method: 'delete'
    // })
    //     .then(res => res.json())
    // .then(data => console.log(data))

    //Make an admin
    const handleMakeAdmin = (email) => {
        fetch(`${SERVER_URL}/makeAdmin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('User Role Updated successfully', {
                        autoClose: 1500,

                    })
                    refetch();
                }
            })
    }
    //Remove an admin
    const handleRemoveAdmin = (email) => {
        fetch(`${SERVER_URL}/removeAdmin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('User Role Updated successfully', {
                        autoClose: 1500
                    })
                    refetch();
                }
            })
    }
    return (
        <tr className='child:text-lg'>
            <th>{index + 1}</th>
            <td>{email}&nbsp;{admin && <span className="badge badge-primary text-white font-bold">Admin</span>}</td>
            <td>
                {(role !== 'admin')
                    ?
                    <button onClick={() => handleMakeAdmin(email)} className='btn btn-primary  text-white text-bold text-lg'>Make Admin</button>
                    :
                    <button onClick={() => handleRemoveAdmin(email)} className='btn btn-primary text-white  text-bold text-lg'>Remove Admin</button>}
            </td>
        </tr>
    );
};

export default SingleUser;