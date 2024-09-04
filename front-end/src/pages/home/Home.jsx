import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, } from "react-router-dom";
import NavBar from '../../components/navbar/NavBar'
import GetAllPosts from '../../components/post/GetAllPosts';
import { getAllPosts } from '../../api/post/post';
import { getMyProfile } from '../../api/profile/profile';
import CreatePost from '../../components/post/CreatePost';

const Home = () => {
  const user = useSelector((state) => state.auth.login?.currentUser)
  const posts = useSelector((state) => state.post.posts)
  const profile = useSelector((state) => state?.auth?.profile)

  const [showModal, setShowModal] = useState(false)

  // eslint-disable-next-line
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
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

  const handleGetProfile = async () => {
    try {
      await getMyProfile(user?.token,dispatch)
    } catch (error) {
      console.error('Errors:', error);
    }
  }
  

  const loadMoreRef = useRef(null);

  const handleScroll = (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setParams((prevParams) => ({
        ...prevParams,
        limit: prevParams.limit + 20, // Tăng số lượng bài viết mỗi khi cuộn tới cuối trang
      }));
    }
  };
  
  useEffect(() => {
    if (!loadMoreRef.current) return;
  
    const observer = new IntersectionObserver((entries) => {
      handleScroll(entries); // Truyền entries vào handleScroll
    });
  
    observer.observe(loadMoreRef.current);
  
    return () => observer.disconnect(); // Ngắt kết nối observer khi component bị unmount
  }, []); // Không cần phụ thuộc vào `posts`  
  

  /* eslint-disable */
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if(user?.token) {
      handleGetListPosts();
      handleGetProfile();
    }
  }, [params, dispatch]);

  // Khi modal được mở hoặc đóng, thay đổi class của body để ngăn việc cuộn
  useEffect(() => {
      if (showModal) {
          document.body.classList.add('overflow-hidden');
      } else {
          document.body.classList.remove('overflow-hidden');
      }

      // Cleanup khi component bị unmount
      return () => {
          document.body.classList.remove('overflow-hidden');
      };
  }, [showModal]);
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
                Friends's
              </p>
            </div>
          </div>
          <div className='h-16 bg-white mt-2 border border-white shadow rounded-md flex-1 flex items-center'>
            <Link className='ml-4 h-11 w-11' to={`/get-profile/${user?.userId}`}>
              <img className='h-full w-full object-cover rounded-full hover:opacity-90'
                src={profile?.profilePicture}
                alt="User Avatar" 
              />              
            </Link>
            <div className='flex-1 flex items-center ml-2 mr-4 cursor-pointer'
                  onClick={() => setShowModal(true)}
            >
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
          {showModal && (
            <CreatePost
              params = {params}
              user = {user}
              profile = {profile}
              isCloseModal = {() => setShowModal(false)}
            />
          )}
          <div className='mt-2'>
            <GetAllPosts
              posts = {posts}
              user = {user}
              params = {params}
              profile = {profile}
            />
          </div>
          <div ref={loadMoreRef} style={{ height: '20px' }} />
        </div>
        <div className='' style={{ flex: '30%' }}>

        </div>
      </div>
    </div>
  )
}

export default Home