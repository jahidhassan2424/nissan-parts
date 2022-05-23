import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [forgetPass, setForgetPass] = useState(false);
    const [forgetPassText, setForgetPassText] = useState("");
    return (
        <div>
            <div class=" flex justify-center items-center mt-20">
                <div class=" w-1/4 flex-col lg:flex-row-reverse">
                    <div class="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
                        <div class="card-body">
                            <h1 className='text-5xl font-bold text-center mb-10'>Login</h1>
                            <div class="form-control mb-5">
                                <label class="label">
                                    <span class="label-text text-xl">Email</span>
                                </label>
                                <input type="text" placeholder="Email" class="input input-bordered text-xl" />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text text-xl">Password</span>
                                </label>
                                <input type="text" placeholder="Password" class="input input-bordered text-xl" />

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
                            <div class="form-control mt-6">
                                <button class="btn btn-accent font-bold text-lg text-white">Login</button>
                            </div>
                            <div class="flex flex-col w-full border-opacity-50">
                                <div class="divider">OR</div>
                            </div>
                            <div class="form-control ">
                                <button class="btn bg-white text-black hover:text-white  font-bold text-lg ">Continue With Google</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )

};

export default Login;