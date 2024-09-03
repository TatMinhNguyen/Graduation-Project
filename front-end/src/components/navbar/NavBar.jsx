import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyProfile } from '../../api/profile/profile';
import { useDispatch, useSelector } from 'react-redux';

const NavBar = ({user}) => {
    const profile = useSelector((state) => state?.auth?.profile)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigation = useNavigate();
    const dispatch = useDispatch();

    const avatarRef = useRef(null);

    const handleGetProfile = async () => {
        try {
            await getMyProfile(user?.token, dispatch)
        } catch (error) {
          console.error('Errors:', error);
        }
    }

    /* eslint-disable */
    useEffect(() => {
        handleGetProfile()
    },[user, dispatch])

    const handleClickOutside = (event) => {
        if (avatarRef.current && !avatarRef.current.contains(event.target)) {
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [isModalOpen]);

  return (
    <div className='flex h-[7vh] min-h-14 bg-white border border-white shadow'>
        <div className='w-1/3 flex-1 flex items-center ml-[2vh]'>
            <img className='h-5/6'
                src= {require("../../assets/images/logo.png")}
                alt="Logo"
            />
            <h1 className='text-2xl font-medium ml-2 text-blue-600'>
                Lionelsocial
            </h1>
        </div>
        <div className='w-1/3'>
            <form className='flex-1 flex items-center p-0.5 pb-0 pl-2 mt-1.5 bg-gray-100 mx-auto rounded-3xl'>
                <button>
                    <img className='w-6 h-6'
                        src = {require('../../assets/icons/search.png')}
                        alt=''
                    />                    
                </button>
                <input
                    type='text'
                    id='search'
                    name='search'
                    placeholder='Search to Lionelsocial . . .'
                    // value={}
                    // onChange={}
                    className='flex-grow w-full pl-4 pr-1 py-2 rounded-3xl bg-gray-100 overflow-hidden
                                focus:outline-none focus:border-gray-100 focus:ring-1 focus:ring-gray-100 bg-gray-100'
                />
            </form>
        </div>
        <div className='w-1/3 flex items-center'>
            <div className='flex-1'></div>  {/* Đây là phần tử đệm để đẩy các phần tử khác sang phải */}
            <div className='mr-5 flex items-center'>
                <div className='h-10 w-10 bg-gray-200 hover:bg-gray-300 flex items-center justify-center rounded-3xl ml-3 cursor-pointer'
                        onClick={() => navigation('/')}
                >
                    <img className='h-6'
                        src={require("../../assets/icons/home-black.png")}
                        alt="" 
                    />
                </div>
                <div className='h-10 w-10 bg-gray-200 hover:bg-gray-300 flex items-center justify-center rounded-3xl ml-3 cursor-pointer'>
                    <img className='h-6'
                        src={require("../../assets/icons/messenger-black.png")}
                        alt="" 
                    />
                </div>
                <div className='h-10 w-10 bg-gray-200 hover:bg-gray-300 flex items-center justify-center rounded-3xl ml-3 cursor-pointer'>
                    <img className='h-6'
                        src={require("../../assets/icons/notification.png")}
                        alt="" 
                    />
                </div>
                <div className='flex items-center justify-center cursor-pointer ml-3 h-10 w-10'
                    // onClick={() => navigation(`/get-profile/${user?.userId}`)}
                    onClick={() => setIsModalOpen(true)}
                >
                    <img className='h-full w-full object-cover rounded-full hover:opacity-90'
                        src={profile?.profilePicture}
                        alt="User Avatar" 
                    />
                </div>
                {isModalOpen && (
                    <div ref={avatarRef} className='absolute w-1/5 top-full mt-1 right-2 bg-white border border-white rounded-md shadow-xl z-50 p-3'>
                        <div 
                            className="absolute top-[-8px] right-[25px] transform rotate-45 w-3 h-3 bg-white border-l border-t border-gray-200"
                        >
                        </div>
                        <div className='w-full bg-white shadow-md border border-gray-100 rounded-md mb-3'>
                            <div className='flex items-center border-b border-gray-200 p-3 cursor-pointer hover:bg-gray-100'
                                onClick={() => navigation(`/get-profile/${user?.userId}`)}
                            >
                                <div className='h-9 w-9'>
                                    <img className='h-full w-full object-cover rounded-full hover:opacity-90'
                                        src={profile?.profilePicture}
                                        alt="User Avatar" 
                                    />                                
                                </div>
                                <h3 className='font-medium text-base ml-3'>
                                    {profile?.username}
                                </h3>                                
                            </div>
                            <div className='my-2 flex-1 flex items-center justify-center'
                                onClick={() => navigation(`/get-profile/${user?.userId}`)}
                            >
                                <p className='text-customBlue hover:text-blue-700 cursor-pointer'>
                                    See profile
                                </p>
                            </div>
                        </div>
                        <button
                            className='flex w-full px-2 py-1.5 text-left text-black hover:bg-gray-100 flex-1 flex items-center rounded-md mb-1'
                            // onClick={() => navigate('/change-password')}
                        >
                            <div className='p-1.5 bg-gray-200 rounded-full mr-2'>
                                <img
                                    src={require('../../assets/icons/reset-password.png')}
                                    alt=''
                                    className='w-5 h-5 '
                                />                                
                            </div>
                            Change password
                        </button>
                        <button
                            className='flex w-full px-2 py-1.5 text-left text-black hover:bg-gray-100 flex-1 flex items-center rounded-md'
                            onClick={() => {
                                // Handle logout logic here
                                console.log("Logout");
                            }}>
                            <div className=' mr-2 p-2 bg-gray-200 rounded-full'>
                                <img
                                    src={require('../../assets/icons/logout.png')}
                                    alt=''
                                    className='w-4 h-4 '
                                />
                            </div>                      
                            Logout
                        </button>
                    </div>
                )}

          </div>

        </div>

    </div>
  )
}

export default NavBar