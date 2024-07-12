import React from 'react'

import { Link, } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className='bg-gray-100 h-screen'>
        <div className='flex h-full'>
            <div className="flex-1 flex items-center justify-center" style={{ flex: '45%' }}>
                <img className='h-screen object-fill'
                    src={require('../../../assets/images/Frame1.png')} 
                    alt="Ảnh của tôi" 
                />                
            </div>
            <div className="flex-1  flex items-center" style={{ flex: '55%' }}>
                <div className='w-5/6 h-[86vh] min-h-96 bg-white border border-white rounded-2xl shadow-xl p-4 mb-[3vh]'>
                    <div className='flex-1 flex items-center justify-center pt-[5vh] mb-8'>
                        <h1 className='text-center text-3xl font-medium'>
                            Forgotten password
                        </h1>
                    </div>
                    <div className='flex-1 flex items-center mb-0 px-[14vh]'>
                        <p className=' text-gray-500 text-sm'>
                            Please enter your email address to reset your account password.
                        </p>
                    </div>                    
                    <form className="p-4 px-[14vh]">
                        <div className="mb-5 mt-[0vh]">
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Enter your email account" 
                                // value={name}
                                // onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-300"
                            />
                        </div>
                   
                        <div className='flex justify-end mt-[40vh]'>
                            <div className='flex space-x-4'>
                                <Link className='w-[10vh] bg-gray-400 text-white px-4 py-2 rounded-xl font-medium hover:bg-gray-600'
                                        to = "/login"
                                >
                                    Cancel
                                </Link>
                                <button type="submit" 
                                    className="w-[10vh] bg-green-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-green-700">
                                    Next
                                </button>                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>  
        </div>
    </div>
  )
}

export default ForgotPassword