import React, { useState } from 'react'

import { Link, useNavigate, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../../api/auth/auth';

function Login() {
    const currentEmail = useSelector((state) => state.auth.user.email)
    const currentPassword = useSelector((state) => state.auth.user.password)

    const [email, setEmail] = useState(currentEmail);
    const [password, setPassword] = useState(currentPassword);

    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const newUser = {
                email : email,
                password : password
            }
            await loginUser(newUser, dispatch, navigate)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='bg-gray-100 h-screen'>
            <div className='flex h-full'>
                <div className="flex-1 flex items-center justify-center" style={{ flex: '45%' }}>
                    <img className='h-screen object-fill'
                        src={require('../../assets/images/Frame1.png')} 
                        alt="Ảnh của tôi" 
                    />
                </div>
                <div className="flex-1  flex items-center" style={{ flex: '55%' }}>
                    <div className='w-5/6 h-[86vh] min-h-96 bg-white border border-white rounded-2xl shadow-xl p-4 mb-[3vh]'>
                        <div className='flex-1 flex items-center justify-center pt-[5vh]'>
                            <h1 className='text-center text-3xl font-medium'>
                                See more on Lionelsocial
                            </h1>
                        </div>
                        <form className="p-4 px-[14vh]" on onSubmit={handleLogin}>
                            <div className="relative mb-4 mt-[2vh]">
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder=" "
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setIsEmailFocused(true)}
                                    onBlur={() => setIsEmailFocused(email !== "")}
                                    className="w-full px-3 pt-3.5 pb-1 border border-gray-200 rounded-md focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-300"
                                />
                                <label
                                    htmlFor="email"
                                    className={`absolute left-3 transition-all ${
                                    isEmailFocused || email !== "" ? "-top-0.5 text-xs" : "top-2 text-base"
                                    } text-gray-500`}
                                >
                                    Enter your email
                                </label>
                            </div>
                            <div className="relative mb-[5vh]">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder=""
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setIsPasswordFocused(true)}
                                    onBlur={() => setIsPasswordFocused(password !== "")}
                                    className="w-full px-3 pt-3.5 pb-1 border border-gray-200 rounded-md focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-300"
                                />
                                <label
                                    htmlFor="password"
                                    className={`absolute left-3 transition-all ${
                                    isPasswordFocused || password !== "" ? "-top-0.5 text-xs" : "top-2 text-base"
                                    } text-gray-500`}
                                >
                                    Enter your password
                                </label>
                            </div>
                            <div className='flex-1 flex items-center justify-center'>
                                <button type="submit" 
                                    className="w-[40vh] bg-blue-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-600"
                                >
                                    Log In
                                </button>                                
                            </div>
                        </form>
                        <div className='flex-1 flex flex-col items-center justify-center mt-0'>
                            <div className='text-blue-600 font-medium p-2 hover:text-blue-800'>
                                <Link to = "/reset-password">
                                    Forgotten password ?
                                </Link>                                
                            </div>
                            <div>
                                <Link className='text-gray-500 font-medium p-2 text-sm hover:text-gray-700'
                                        to = "/get-verify-code"
                                >
                                    Forgot verification code ?
                                </Link>                                
                            </div>
                        </div>
                        <div className='flex-1 flex items-center justify-center mt-[3vh]'>
                            <div className='text-gray-400'>
                                __________________________
                            </div>
                            <div className='mx-[5vh] mt-2 text-gray-500 font-medium text-base'>
                                Or
                            </div>
                            <div className='text-gray-400'>
                                __________________________
                            </div>
                        </div>
                        <div className='flex-1 flex flex-col items-center justify-center mt-[4vh]'>
                            <div>
                                Don't have an account yet?
                            </div>
                            <div className='flex-1 flex items-center justify-center mt-4'>
                                <Link className='bg-green-600 text-white px-[6vh] py-2 rounded-xl font-medium hover:bg-green-700'
                                    to="/register"
                                >
                                    Create a new account
                                </Link>                                
                            </div>                           
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    );     
}

export default Login