import React from 'react'

import { Link, } from "react-router-dom";

const Register = () => {
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
                            Create a new account
                        </h1>
                    </div>
                    <form className="p-4 px-[14vh]">
                        <div className="mb-5 mt-[2vh]">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your username" 
                                // value={name}
                                // onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-300"
                            />
                        </div>
                        <div className="mb-5 mt-[2vh]">
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Enter your email" 
                                // value={name}
                                // onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-300"
                            />
                        </div>
                        <div className="mb-[5vh]">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                // value={email}
                                // onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-300"
                            />
                        </div>
                        <div className='flex-1 flex items-center justify-center mb-6'>
                            <p className='text-center text-gray-500 text-sm'>
                                By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. 
                                You may receive notifications from us and can join out at any time.
                            </p>
                        </div>
                        <div className='flex-1 flex items-center justify-center'>
                            <button type="submit" 
                                className="w-[40vh] bg-green-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-green-700"
                            >
                                Sign Up
                            </button>                                
                        </div>
                    </form>
                    <div className='flex-1 flex items-center justify-center'>
                        <Link className='text-center text-blue-500 font-medium hover:text-blue-700'
                                to =  "/login"
                        >
                            Already have an account?
                        </Link>
                    </div>
                </div>
            </div>  
        </div>
    </div>
  )
}

export default Register