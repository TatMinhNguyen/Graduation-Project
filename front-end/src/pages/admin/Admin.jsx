import React from 'react'
import NavBar from '../../components/navbar/NavBar'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  const user = useSelector((state) => state.auth.login?.currentUser)

  return (
    <div className='bg-gray-100 min-h-screen'>
        <div className='fixed top-0 w-full z-20'>
            <NavBar
            user={user}
            />
        </div>  
        <div className='h-full pt-16 flex'>
            <div className='w-1/4 bg-white fixed h-full -mt-3 shadow-2xl px-2 py-4'>
                <div>
                    <h1 className='font-bold text-2xl ml-1 pb-3'>
                        Admin
                    </h1>
                </div>
            </div>
            <div className='flex-1'></div>
            <div className='w-3/4 -mt-2'>
                <Outlet/>
            </div>
        </div>      
    </div>
  )
}

export default Admin