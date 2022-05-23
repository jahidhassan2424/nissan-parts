import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div>
            <div class=" flex justify-center items-center mt-20">
                <div class=" w-1/4 flex-col lg:flex-row-reverse">
                    <div class="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
                        <div class="card-body">
                            <h1 className='text-5xl font-bold text-center mb-10'>Register</h1>
                            <div class="form-control mb-2">
                                <label class="label">
                                    <span class="label-text text-xl">Name</span>
                                </label>
                                <input type="text" placeholder="Your Name" class="input input-bordered text-xl" />
                            </div>
                            <div class="form-control mb-2">
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

                                <label class="mt-5">
                                    <Link to="/login" class=" pointer hover:text-primary  text-xl">Already have an account? Login
                                    </Link>
                                </label>
                            </div>
                            <div class="form-control mt-6">
                                <button class="btn btn-accent font-bold text-lg text-white uppercase">Register</button>
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
        </div>
    );
};

export default Register;