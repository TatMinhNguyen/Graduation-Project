import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, } from "react-router-dom";
import NavBar from '../../components/navbar/NavBar'
import GetAllPosts from '../../components/post/GetAllPosts';
import { getAllPosts } from '../../api/post/post';

const Home = () => {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const posts = useSelector((state) => state.post.posts)
    // console.log(user)
    // console.log(posts)

    // eslint-disable-next-line
    const [params, setParams] = useState({
      page: 1,
      limit: 20,
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGetListPosts = async() => {
      try {
        await getAllPosts(user?.token, dispatch, params)
      } catch (error) {
        console.error('Errors:', error);
      }
    }

    /* eslint-disable */
    useEffect(() => {
      if (!user) {
        navigate("/login");
      }
      if(user?.token) {
        handleGetListPosts();
      }
    }, [params, dispatch]);
  return (
    <div className='bg-gray-100'>
      <div className='fixed top-0 w-full z-50'>
        <NavBar 
          user={user}
        />
      </div>
      <div className='flex h-full pt-16'>
        <div className='' style={{ flex: '30%' }}>

        </div>
        <div className='' style={{ flex: '40%' }}>
          <div className='h-12 bg-white border border-white shadow rounded-md flex-1 flex items-center'>
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
          <div className='h-16 bg-white mt-2 border border-white shadow rounded-md flex-1 flex items-center'>
            <Link className='ml-4 h-12 w-12'>
              <img className='h-full w-full object-cover rounded-full border-2 border-blue-400'
                src={user?.avatar || 'https://ik.imagekit.io/minhnt204587/Avatar/icons8-user-94.png'}
                alt="User Avatar" 
              />              
            </Link>
            <div className='flex-1 flex items-center ml-2 mr-4 cursor-pointer'>
              <input
                placeholder='What is happening ?'
                className='w-full px-4 py-2 rounded-3xl mt-0 bg-gray-100 cursor-pointer
                          focus:outline-none focus:border-gray-100 focus:ring-1 focus:ring-gray-100'
              />
              <img className='h-12 w-12 ml-2'
                src={require("../../assets/icons/photo.png")}
                alt=''
              />
            </div>
          </div>
          <div className='mt-2'>
            <GetAllPosts
              posts = {posts}
              user = {user}
            />
          </div>
        </div>
        <div className='' style={{ flex: '30%' }}>

        </div>
      </div>
    </div>
  )
}

export default Home