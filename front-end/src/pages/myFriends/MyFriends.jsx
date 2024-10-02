import React from 'react'
import NavBar from '../../components/navbar/NavBar'
import { useSelector } from 'react-redux'

const MyFriends = () => {
    const user = useSelector((state) => state.auth.login?.currentUser)

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='fixed top-0 w-full z-50'>
                <NavBar
                    user={user}
                />
            </div> 
            <div className='flex h-full pt-16'>
                <div className='w-1/4 bg-white fixed h-full -mt-3 shadow-2xl px-4 py-4'>

                </div>
                <div className='flex-1'></div>
                <div className='w-3/4'>
                    
                </div>
            </div>       
        </div>
    )
}

export default MyFriends