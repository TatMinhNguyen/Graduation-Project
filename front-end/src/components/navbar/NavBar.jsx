import React from 'react'

const NavBar = ({user}) => {
  return (
    <div className='flex h-14 min-h-14 bg-white border border-white shadow'>
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
            <form className='flex-1 flex items-center justify-center'>
                <input
                    type='text'
                    id='search'
                    name='search'
                    placeholder='Search to Lionelsocial . . .'
                    // value={}
                    // onChange={}
                    className='w-2/3 px-4 py-2 rounded-3xl mt-2 bg-gray-100
                            focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-300'
                />
            </form>
        </div>
        <div className='w-1/3 flex items-center'>
            <div className='flex-1'></div>  {/* Đây là phần tử đệm để đẩy các phần tử khác sang phải */}
            <div className='mr-5 flex items-center'>
                <div className='h-10 w-10 bg-gray-200 flex items-center justify-center rounded-3xl ml-3 cursor-pointer'>
                    <img className='h-6'
                        src={require("../../assets/icons/home-black.png")}
                        alt="" 
                    />
                </div>
                <div className='h-10 w-10 bg-gray-200 flex items-center justify-center rounded-3xl ml-3 cursor-pointer'>
                    <img className='h-6'
                        src={require("../../assets/icons/messenger-black.png")}
                        alt="" 
                    />
                </div>
                <div className='h-10 w-10 bg-gray-200 flex items-center justify-center rounded-3xl ml-3 cursor-pointer'>
                    <img className='h-6'
                        src={require("../../assets/icons/notification.png")}
                        alt="" 
                    />
                </div>
                <div className='flex items-center justify-center cursor-pointer ml-3'>
                    <img className='h-10 w-10 rounded-full'
                        src={user.avatar || 'https://ik.imagekit.io/minhnt204587/Avatar/icons8-user-94.png'}
                        alt="User Avatar" 
                    />
                </div>
            </div>

        </div>

    </div>
  )
}

export default NavBar