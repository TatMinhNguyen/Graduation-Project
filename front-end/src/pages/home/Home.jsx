import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, } from "react-router-dom";
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
        <div className='' style={{ flex: '30%' }}>

        </div>
        <div className='' style={{ flex: '40%' }}>
          <div className='h-12 bg-white border border-white shadow-md rounded-md flex-1 flex items-center'>
            <div className='w-1/2 flex-1 flex items-center justify-center cursor-pointer'>
              <p className='text-lg font-bold py-2 border-b-4 border-b-blue-500'>
                For you
              </p>
            </div>
            <div className='w-1/2 flex-1 flex items-center justify-center cursor-pointer'>
              <p className='text-lg font-bold py-2'>
                Friends
              </p>
            </div>
          </div>
          <div className='h-16 bg-white mt-2 border border-white shadow-md rounded-md flex-1 flex items-center'>
            <Link className='ml-4'>
              <img className='h-12 w-12 rounded-3xl'
                src={user.avatar || 'https://ik.imagekit.io/minhnt204587/Avatar/icons8-user-94.png'}
                alt="User Avatar" 
              />              
            </Link>
            <div className='flex-1 flex items-center ml-2 mr-4 cursor-pointer'>
              <input
                placeholder='What is happening ?'
                className='w-full px-4 py-2 rounded-3xl mt-0 bg-gray-100 cursor-pointer
                          focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-300'
              />
              <img className='h-12 w-12 ml-2'
                src={require("../../assets/icons/photo.png")}
                alt=''
              />
            </div>
          </div>
        </div>
        <div className='' style={{ flex: '30%' }}>

        </div>
      </div>
    </div>
  )
}

export default Home