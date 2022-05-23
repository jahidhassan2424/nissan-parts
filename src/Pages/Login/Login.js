import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { useForm } from "react-hook-form";
const Login = () => {
    const [forgetPass, setForgetPass] = useState(false);
    const [forgetPassText, setForgetPassText] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // React hook forms element
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    if (loading) {
        return <Loading></Loading>
    }
    error && setPasswordError(error.message);
    const onSubmit = data => {
        console.log(data)
        const email = data.email;
        const password = data.password;
    };

    return (
        <div>
            <div class=" flex justify-center items-center mt-20">
                <div class=" w-1/4 flex-col lg:flex-row-reverse">
                    <div class="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="card-body">
                                <h1 className='text-5xl font-bold text-center mb-10'>Login</h1>
                                <div class="form-control ">
                                    <label class="label">
                                        <span class="label-text text-xl">Email</span>
                                    </label>

                                    <input type="email" placeholder="Email" name='email' class="input input-bordered text-xl" {...register("email",
                                        { required: true })} />
                                    <label class="label">
                                        {errors?.email?.type === 'required' && <span class="label-text-alt text-lg">{errors.email.message}</span>}
                                    </label>

                                </div>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text text-xl">Password</span>
                                    </label>

                                    <input type="text" placeholder="Password" name='password' class="input input-bordered text-xl" {...register("password",
                                        {
                                            required: true,
                                        })} />


                                    {/* Forget password area  */}
                                    <div className=''>

                                        {
                                            forgetPass && <input onBlur={() => setForgetPass(false)} value={forgetPassText} onChange={(e) => setForgetPassText(e.target.value)} type="text" placeholder="Enter your Email" class="mt-5 input input-bordered text-xl w-full" />
                                        }
                                        <br />
                                        <label class="my-2">
                                            <button onClick={() => setForgetPass(true)} class=" hover:text-primary text-xl"><span >Forgot password?</span></button>
                                        </label>
                                    </div>
                                    <label class="">
                                        <Link to="/register" class=" pointer hover:text-primary  text-xl">New here? Sign Up
                                        </Link>
                                    </label>
                                </div>

                                {/* Error Shows here */}
                                <div>
                                    {
                                        passwordError && <p className='text-red-500'>{passwordError}</p>
                                    }
                                </div>
                                <div class="form-control mt-6">
                                    <button type="submit" class="btn btn-accent font-bold text-lg text-white">Login</button>
                                </div>

                                <div class="flex flex-col w-full border-opacity-50">
                                    <div class="divider">OR</div>
                                </div>
                                <div class="form-control ">
                                    <button class="btn bg-white text-black hover:text-white  font-bold text-lg ">Continue With Google</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div >
    )

};

export default Login;