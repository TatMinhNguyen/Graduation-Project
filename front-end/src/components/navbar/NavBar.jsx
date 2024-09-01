import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyProfile } from '../../api/profile/profile';
import { useDispatch, useSelector } from 'react-redux';

const NavBar = ({user}) => {
    const profile = useSelector((state) => state?.auth?.profile)
    const navigation = useNavigate();
    const dispatch = useDispatch();

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
                <div onClick={() => navigation(`/get-profile/${user?.userId}`) }
                        className='flex items-center justify-center cursor-pointer ml-3 h-10 w-10'>
                    <img className='h-full w-full object-cover rounded-full hover:opacity-90'
                        src={profile?.profilePicture || 'https://ik.imagekit.io/minhnt204587/Avatar/icons8-user-94.png'}
                        alt="User Avatar" 
                    />
                </div>
          </div>

        </div>

    </div>
  )
}

export default NavBar