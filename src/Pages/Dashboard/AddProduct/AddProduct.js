import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import './AddProduct.css'
import { SERVER_URL } from '../../Shared/variables';

const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = orderInfo => {
        console.log(orderInfo)
        //Uploading Image to imageBB
        const response = axios.post('')


        fetch(`${SERVER_URL}/products`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(orderInfo)
        })
            .then(res => res.json())
            .then(data => console.log(data))

    }

    return (
        <div className='min-h-[200vh]'>

            <h1 className='text-4xl text-center font-bold mt-20 mb-5 '>Add a New Product</h1>
            <div className='w-fit mx-auto flex justify-center items-center justify-items-center rounded-xl shadow-xl'>

                <form className='flex  mt-10 p-5 ' onSubmit={handleSubmit(onSubmit)}>
                    <table className='child:text-lg  myProfileTable '>

                        <tr className='tr m'>
                            <td className='pr-2'>Product Name</td>
                            <td className='pr-10'>
                                <input type="text" placeholder="Product Name" className="border border-black p-2 rounded-xl input-bordered w-full max-w-xl " {...register("name")} />
                            </td>
                            {/* Address  */}
                            <td>Brand</td>
                            <td>
                                <input type="text" disabled value={'nissan'} placeholder="Brand" className="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" {...register("brand")} />
                            </td>
                        </tr>

                        {/* Phone  */}
                        <tr>
                            <td>Category</td>
                            <td className='pr-10'>
                                <select className="select border border-black w-full max-w-xs"{...register("category")} >
                                    <option selected>Steering Wheel</option>
                                    <option>Wheels</option>
                                    <option>Bumper</option>
                                    <option>Cowl screen</option>
                                    <option>Decklid</option>
                                    <option>Bonnet</option>
                                </select>

                            </td>
                            {/* Price  */}
                            <td>Price</td>
                            <td>
                                <input type="number" placeholder="Price" className="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" {...register("price")} />
                            </td>
                        </tr>

                        {/* Description  */}
                        <tr >
                            <td>Description</td>
                            <td className='pr-10'>
                                <textarea type="text" placeholder="Description Link" className="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" {...register("description")} />
                            </td>
                            {/* image  */}
                            <td>Image &nbsp;</td>
                            <td>
                                <input type="file" placeholder="Facebook Profile Link" className="" {...register("img")} />
                            </td>
                        </tr>
                        {/* available Quantity  */}
                        <tr>
                            <td>Available Qty</td>

                            <td className='pr-10'>
                                <input type="number" placeholder="Available quantity" className="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" {...register("availableQty")} />
                            </td>

                            {/* Minimum order  */}
                            <td>
                                <div className='flex flex-col  items-center '>
                                    <div>Min</div>
                                    <div>Order</div>
                                </div>
                            </td>

                            <td>
                                <input type="number" placeholder="Minimum order quantity" className="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" {...register("minOrder")} />
                            </td>
                        </tr>


                        {/* item sold  */}
                        <tr>
                            <td>Item Sold</td>

                            <td className='pr-10'>
                                <input type="number" placeholder="Input how many items are sold" className="border border-black p-2 rounded-xl input-bordered w-full max-w-xl" {...register("itemSold")} />
                            </td>
                        </tr>
                        <tr className='text-center '>
                            <td colSpan={4}>
                                <button type="submit" className='w-full mt-5 btn btn-primary text-white font-bold add-product-btn text-zinc-800 text-xl'>ADD PRODUCT</button>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>

        </div>
    );
};

export default AddProduct;