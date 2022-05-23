import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import PasswordStrengthBar from 'react-password-strength-bar';
import makeId from './SuggestPass';

const Register = () => {
    const navigate = useNavigate();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [passwordBar, setPasswordBar] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    console.log(passwordBar);

    // const handleSuggestPass = () => {

    // }
    const onSubmit = data => {
        console.log(data)
        const name = data.name;
        const email = data.email;
        const password = data.password;
        createUserWithEmailAndPassword(email, password)
    };
    if (user) {
        navigate('/')
    }

    return (
        <div>
            Input<input onChange={(e) => setPasswordBar(e.target.value)} type="text" />
            <div className=" flex justify-center items-center mt-20">
                <div className=" w-1/4 flex-col lg:flex-row-reverse">
                    <div className="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card-body">
                                <h1 className='text-5xl font-bold text-center mb-10'>Register</h1>
                                <div className="form-control mb-2">
                                    <label className="label">
                                        <span className="label-text text-xl">Name</span>
                                    </label>
                                    <input type="text" placeholder="Your Name" className="input input-bordered text-xl" {...register("name",
                                        { required: true })} />
                                </div>
                                <div className="form-control mb-2">
                                    <label className="label">
                                        <span className="label-text text-xl">Email</span>
                                    </label>
                                    <input type="text" placeholder="Email" className="input input-bordered text-xl"
                                        {...register("email",
                                            { required: true })} />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl">Password</span>
                                    </label>
                                    <input type="text" placeholder="Email" className="hidden input input-bordered text-xl"
                                    />
                                    <input value={passwordBar} type={showPassword ? "text" : "password"} placeholder="Input Password" name='password' className="  input input-bordered text-xl" {...register("password",
                                        {
                                            required: true,
                                            // pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                                        })}
                                        onChange={(e) => setPasswordBar(e.target.value)}
                                    />

                                    <div className='text-md flex  justify-between my-2'>
                                        <div >
                                            <button className='border border-zinc-400 px-2 py-1 hover:bg-primary  rounded-lg text-black font-bold' onClick={() => setPasswordBar(makeId(10))}>Suggest a Strong Password</button>
                                        </div>
                                        <div className='text-xl'>
                                            <input onChange={() => setShowPassword(!showPassword)} type="checkbox" value="" />
                                            <span> Show password</span>
                                        </div>
                                    </div>

                                    <PasswordStrengthBar password={passwordBar} />

                                    <label className="label">
                                        {errors.password?.type == "pattern" && <span className="label-text-alt text-red-500 text-lg">Password must be atleast 6 characters containing both capital and small letter, a Number, 1 special character</span>}
                                        {errors?.password?.type === 'required' && <span className="label-text-alt text-red-500 text-lg">Password is Required</span>}
                                    </label>

                                    <label>
                                        <Link to="/login" className=" pointer hover:text-accent font-semibold text-xl">Already have an account? Login
                                        </Link>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary font-bold text-lg text-white uppercase">Register</button>
                                </div>
                                <div className="flex flex-col w-full border-opacity-50">
                                    <div className="divider">OR</div>
                                </div>
                                <div className="form-control ">
                                    <button className="btn bg-white text-black hover:text-white  font-bold text-lg ">Continue With Google</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Register;