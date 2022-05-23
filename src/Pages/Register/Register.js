import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import PasswordStrengthBar from 'react-password-strength-bar';

const Register = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [passwordBar, setPasswordBar] = useState('');
    console.log(passwordBar);

    const onSubmit = data => {
        console.log(data)
        const name = data.name;
        const email = data.email;
        const password = data.password;
        // createUserWithEmailAndPassword(email, password)
        //     .then(res => console.log(res))
    };
    console.log(passwordBar);


    return (
        <div>
            Input<input onChange={(e) => setPasswordBar(e.target.value)} type="text" />
            <div class=" flex justify-center items-center mt-20">
                <div class=" w-1/4 flex-col lg:flex-row-reverse">
                    <div class="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="card-body">
                                <h1 className='text-5xl font-bold text-center mb-10'>Register</h1>
                                <div class="form-control mb-2">
                                    <label class="label">
                                        <span class="label-text text-xl">Name</span>
                                    </label>
                                    <input type="text" placeholder="Your Name" class="input input-bordered text-xl" {...register("name",
                                        { required: true })} />
                                </div>
                                <div class="form-control mb-2">
                                    <label class="label">
                                        <span class="label-text text-xl">Email</span>
                                    </label>
                                    <input type="text" placeholder="Email" class="input input-bordered text-xl"
                                        {...register("email",
                                            { required: true })} />
                                </div>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text text-xl">Password</span>
                                    </label>
                                    <input type="text" placeholder="Email" class="hidden input input-bordered text-xl"
                                    />
                                    <input type="text" placeholder="text" name='password' class="  input input-bordered text-xl" {...register("password",
                                        {
                                            required: true,
                                            pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                                        })}
                                        onChange={(e) => setPasswordBar(e.target.value)}
                                    />
                                    <PasswordStrengthBar password={passwordBar} />

                                    <label class="label">
                                        {errors.password?.type == "pattern" && <span class="label-text-alt text-red-500 text-lg">Password must be atleast 6 characters containing both capital and small letter, a Number, 1 special character</span>}
                                        {errors?.password?.type === 'required' && <span class="label-text-alt text-red-500 text-lg">Password is Required</span>}
                                    </label>

                                    <label class="mt-5">
                                        <Link to="/login" class=" pointer hover:text-primary text-xl">Already have an account? Login
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
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;