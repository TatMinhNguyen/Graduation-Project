import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const CreateGroup = ({isClose}) => {
    const user = useSelector((state) => state.auth.login?.currentUser)

    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [username, setUsername] = useState('');
    const [groupType, setGroupType] = useState(true);

    const isUsernameValid = (username) => {
        return username.length >=5 && username.length <= 50;
    }
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className='bg-white rounded-lg shadow-lg w-1/2 h-[80vh]'>
            <div className="flex justify-between items-center border-b border-gray-200 p-4 py-3">
                <h3 className="text-[18px] font-bold flex-1 flex items-center justify-center">Create Group</h3>
                <button onClick={() => isClose()} 
                    className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 flex items-center justify-center"
                >
                    <img  
                        src={require('../../assets/icons/close.png')}
                        alt='Earth'
                        className='w-4 h-4 '
                    />
                </button>
            </div>
            <div className='flex h-[63vh] border-b border-zinc-200'>
                <div className='w-3/5 px-4'>
                    <div className="flex items-center mt-4">
                        <div className='w-9 h-9'>
                            <img 
                                src={user?.avatar} 
                                alt="Profile" 
                                className="h-full w-full object-cover rounded-full" />
                        </div>
                        <div className="ml-2">
                            <h4 className="font-semibold text-md">
                                {user?.username}
                            </h4>
                            <div className="text-sm text-gray-700">
                                Admin
                            </div>
                        </div>
                    </div>
                    {/* <div className='flex ml-1 my-4'>
                        <h3 className='text-[17px] font-medium mb-0'>
                            Privacy
                        </h3>
                        <div className='flex-1 flex items-center justify-center relative mt-[3px]'>   
                            <label className='mr-6'>
                                <input
                                    type="radio"
                                    name="privacy"
                                    value="public"
                                    checked={groupType === true}
                                    onChange={(e) => setGroupType(true)}
                                    className="mr-2"
                                />
                                Public
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="privacy"
                                    value="private"
                                    checked={groupType === false}
                                    onChange={(e) => setGroupType(false)}
                                    className="mr-2"
                                />
                                Private
                            </label>             
                        </div>
                    </div> */}
                    {isUsernameValid(username) === true || username === '' ? (
                        <div className="relative my-6">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onFocus={() => setIsUsernameFocused(true)}
                                onBlur={() => setIsUsernameFocused(username !== "")}
                                className="w-full px-3 pt-3.5 pb-1 border border-gray-200 rounded-md focus:outline-none focus:border-blue-50 focus:ring-1 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="username"
                                className={`absolute left-3 transition-all ${
                                isUsernameFocused || username !== "" ? "-top-0.5 text-xs  text-blue-500" : "top-2 text-base text-gray-400"
                                } `}
                            >
                                Group name
                            </label>                            
                        </div>                            
                    ) : (
                        <div className="relative mb-5 mt-[2vh]">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onFocus={() => setIsUsernameFocused(true)}
                                onBlur={() => setIsUsernameFocused(username !== "")}
                                className="w-full px-3 pt-3.5 pb-1 border border-red-500 rounded-md focus:outline-none focus:border-red-50 focus:ring-1 focus:ring-red-500"
                            />
                            <label
                                htmlFor="username"
                                className={`absolute left-3 transition-all ${
                                isUsernameFocused || username !== "" ? "-top-0.5 text-xs" : "top-2 text-base"
                                } text-red-500`}
                            >
                                Group name 
                            </label> 
                            <div className='mt-2 flex'>
                                <img
                                    src={require("../../assets/icons/warning.png")}
                                    alt=''
                                    className='w-4 h-4 mt-[0px] mr-1'
                                />
                                <p className='text-xs text-red-500'>
                                    Name must be at least 5 characters and no more than 50 characters.
                                </p>
                            </div>                           
                        </div>
                    )}
                </div>
                <div className='w-2/5 bg-slate-100'>
                    d
                </div>
            </div>
            <div className='flex-1 flex items-center justify-center h-[9.5vh]'>
                <div className='flex-1'></div>
                <button className='text-blue-600 font-medium rounded-md hover:bg-gray-200 py-1.5 pb-[7px] px-3'>
                    Cancel
                </button>
                <button className='py-1.5 pb-[7px] px-5 rounded-md bg-customBlue hover:bg-blue-600 text-white font-medium my-[9px] mx-4'>
                    Create
                </button>
            </div>
        </div>
    </div>
  )
}

export default CreateGroup