import React from 'react'
import NavBar from '../../components/navbar/NavBar'
import { useSelector } from 'react-redux'

const Messenger = () => {
    const user = useSelector((state) => state.auth.login?.currentUser)
    // const profile = useSelector((state) => state?.auth?.profile)
  return (
    <div>
        <div className='fixed top-0 w-full z-50'>
            <NavBar 
                user={user}
            />
        </div>
    </div>
  )
}

export default Messenger