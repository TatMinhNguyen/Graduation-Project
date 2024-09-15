import React from 'react'
import NavBar from '../../components/navbar/NavBar'
import { useSelector } from 'react-redux'

const Messenger = () => {
    const user = useSelector((state) => state.auth.login?.currentUser)
    // const profile = useSelector((state) => state?.auth?.profile)
  return (
    <div className='bg-gray-100 min-h-screen overflow-y-scroll '>
        <div className='w-full z-50 '>
            <NavBar 
                user={user}
            />
        </div>
        <div className='pt-16 overflow-hidden'>
                {/* Nội dung dài nhưng không thể cuộn */}
                <p>Message content here...</p>
                More content...
        </div>
    </div>
  )
}

export default Messenger