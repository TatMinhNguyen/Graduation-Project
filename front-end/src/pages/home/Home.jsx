import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import NavBar from '../../components/navbar/NavBar'

const Home = () => {
    const user = useSelector((state) => state.auth.login?.currentUser)
    // console.log(user)

    const navigate = useNavigate();

    /* eslint-disable */
    useEffect(() => {
        if (!user) {
        navigate("/login");
        }
        if (user?.accessToken) {
        // getAllPosts(user?.accessToken, dispatch , axiosJWT);
        // getAllUsers(user?.accessToken, dispatch, axiosJWT);
        }
    }, []);
  return (
    <div className='bg-gray-100 h-screen'>
      <NavBar 
        user = {user}
      />
      <div className='flex h-full mt-2'>
        <div className=' bg-red-100 ' style={{ flex: '30%' }}>

        </div>
        <div className='' style={{ flex: '40%' }}>
          <div className='h-12 bg-white border border-white shadow-md rounded-md flex-1 flex items-center'>
            <div className='w-1/2 flex-1 flex items-center justify-center cursor-pointer'>
              <p className='text-base font-bold py-2 border-b-4 border-b-black'>
                For you
              </p>
            </div>
            <div className='w-1/2 flex-1 flex items-center justify-center cursor-pointer'>
              <p className='text-base font-bold py-2 border-b-4 border-b-black'>
                Friends
              </p>
            </div>
          </div>
        </div>
        <div className='bg-green-100' style={{ flex: '30%' }}>

        </div>
      </div>
    </div>
  )
}

export default Home