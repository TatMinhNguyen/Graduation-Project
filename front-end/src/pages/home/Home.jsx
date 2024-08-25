import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, } from "react-router-dom";
import NavBar from '../../components/navbar/NavBar'
import GetAllPosts from '../../components/post/GetAllPosts';
import { createPost, getAllPosts } from '../../api/post/post';
import { getProfile } from '../../api/profile/profile';
import { SixPictures } from '../../components/CssPictures/SixPictures';
import { FivePictures } from '../../components/CssPictures/FivePictures';
import FourPictures from '../../components/CssPictures/FourPictures';
import ThreePictures from '../../components/CssPictures/ThreePictures';
import TwoPictures from '../../components/CssPictures/TwoPictures';
import { OnePicture } from '../../components/CssPictures/OnePicture';
import { VideoPlayer5 } from '../../components/CssPictures/VideoPlayer5';
import { VideoPlayer4 } from '../../components/CssPictures/VideoPlayer4';
import { VideoPlayer3 } from '../../components/CssPictures/VideoPlayer3';
import { VideoPlayer2 } from '../../components/CssPictures/VideoPlayer2';
import VideoPlayer from '../../components/CssPictures/VideoPlayer';

const Home = () => {
  const user = useSelector((state) => state.auth.login?.currentUser)
  const posts = useSelector((state) => state.post.posts)
  // console.log(user)
  // console.log(posts)

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const [showModal, setShowModal] = useState(false)
  const [profile, setProfile] = useState({})
  const [text, setText] = useState('');
  const [showFont, setShowFont] = useState(false)
  const [images, setImages] = useState([])
  const [video, setVideo] = useState(null)
  const [typeText, setTypeText] = useState(true)
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null)

  // console.log(videoPreview)
  // console.log(imagePreviews)

  // eslint-disable-next-line
  const [params, setParams] = useState({
    page: 1,
    limit: 30,
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const textareaRef = useRef(null);

  const handleCloseModal = () => {
    setShowModal(false)
    setText('');
    setImages([]);
    setVideo(null);
    setImagePreviews([])
    setVideoPreview(null)
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    URL.revokeObjectURL(videoPreview);
  };

  const handleInput = (e) => {
    setText(e.target.value);
    const textarea = textareaRef.current;
    textarea.style.height = 'auto'; // Reset the height to auto
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the scroll height
  };

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleVideoClick = () => {
    videoInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);

  // Tạo URL xem trước
  const imageUrls = selectedImages.map((image) => URL.createObjectURL(image));
  setImagePreviews(imageUrls);

  // Giải phóng các URL cũ
  imagePreviews.forEach((url) => URL.revokeObjectURL(url));
  };

  const handleVideoChange = (e) => {
    const selectedVideo = e.target.files[0];
    setVideo(selectedVideo);

    const videoUrl = URL.createObjectURL(selectedVideo);
    setVideoPreview(videoUrl);

    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
  };

  const handleDeletePreView = () => {
    setImages([]);
    setVideo(null);
    setImagePreviews([])
    setVideoPreview(null)
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    URL.revokeObjectURL(videoPreview);
  }

  const handleGetListPosts = async() => {
    try {
      await getAllPosts(user?.token, dispatch, params)
    } catch (error) {
      console.error('Errors:', error);
    }
  }

  const handleGetProfile = async () => {
    try {
      const result = await getProfile(user?.token, user?.userId)
      setProfile(result);
    } catch (error) {
      console.error('Errors:', error);
    }
  }

  const handleCreatePost = async(e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
  
      if (text) {
        formData.append('description', text);
      }
      if (images.length > 0) {
        images.forEach((image) => {
          formData.append(`images`, image);
        });
      }
      if (video) {
        formData.append('video', video);
      }
      formData.append('typeText', typeText); // Nếu typeText luôn có giá trị
  
      const result = await createPost(user?.token, formData);
      console.log(result);

      // Reset state after successful post
      setShowModal(false);
      setText('');
      setImages([]);
      setVideo(null);
      setImagePreviews([])
      setVideoPreview(null)
      
      // Refresh the post list
      handleGetListPosts();
    } catch (error) {
      console.error('Errors:', error);
    }finally {
      // Giải phóng các URL sau khi không cần sử dụng nữa
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      URL.revokeObjectURL(videoPreview);
    }
  }  

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
          profile = {profile}
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
            <Link className='ml-4 h-11 w-11' to={`/get-profile/${user?.userId}`}>
              <img className='h-full w-full object-cover rounded-full'
                src={profile?.profilePicture || 'https://ik.imagekit.io/minhnt204587/Avatar/icons8-user-94.png'}
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
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh]">
                <div className="flex justify-between items-center border-b p-4">
                  <h3 className="text-xl font-bold flex-1 flex items-center justify-center">Create post</h3>
                  <button onClick={handleCloseModal} className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 flex items-center justify-center">
                    <img  
                      src={require('../../assets/icons/close.png')}
                      alt='Earth'
                      className='w-5 h-5 '
                    />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <div className='w-10 h-10'>
                      <img 
                        src={profile?.profilePicture} 
                        alt="Profile" 
                        className="h-full w-full object-cover rounded-full" />
                    </div>
                    <div className="ml-2">
                      <h4 className="font-semibold text-base">
                        {profile?.username}
                      </h4>
                      <div className="text-sm text-gray-500">
                        <button className="flex items-center text-black font-medium">
                          <img
                            src={require('../../assets/icons/earth.png')}
                            alt='Earth'
                            className='w-3.5 h-3.5 mr-1 mt-px'
                          />
                          Public
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='relative max-h-[50vh] overflow-y-auto overflow-hidden'>
                    <div>
                      <textarea
                        id="text"
                        name="text"
                        value={text}
                        onChange={handleInput}
                        ref={textareaRef}
                        className="w-full border-none text-lg focus:outline-none"
                        rows="2"
                        placeholder="What's on your mind?"
                        style={{resize: 'none'}}
                      />
                    </div>
                    <div className='absolute z-20 w-full'>
                      {imagePreviews.length > 0 || videoPreview !== null ? (
                        <div className='flex'>
                          <div className='flex bg-white px-2 py-1.5 mx-5 my-2 rounded-md hover:bg-gray-200 cursor-pointer'>
                            <img
                              src={require('../../assets/icons/edit.png')}
                              alt=''
                              className='w-6 h-6'
                            />
                            <p className='font-medium ml-1 mr-1'>
                              Edit 
                            </p>
                          </div> 
                          <div className='flex-1'></div>
                          <div className='w-8 h-8 mx-3 my-2 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 cursor-pointer'
                                onClick={handleDeletePreView}
                          >
                            <img
                              src={require('../../assets/icons/close.png')}
                              alt=''
                              className='w-4 h-4'
                            />                              
                          </div>                       
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className='opacity-75'>
                      {video == null || !video ? (
                        <>
                          {imagePreviews?.length > 5 ? (
                              <SixPictures
                                  selectedImages={imagePreviews?.map(img => img)} 
                                  extraImagesCount={imagePreviews?.length - 4}
                              />
                          ) : imagePreviews?.length === 5 ? (
                              <FivePictures selectedImages={imagePreviews?.map(img => img)}/>
                          ) : imagePreviews?.length === 4 ? (
                              <FourPictures selectedImages={imagePreviews?.map(img => img)}/>
                          ) : imagePreviews?.length === 3 ? (
                              <ThreePictures selectedImages={imagePreviews?.map(img => img)}/>
                          ) : imagePreviews?.length === 2 ? (
                              <TwoPictures selectedImages={imagePreviews?.map(img => img)}/>
                          ) : imagePreviews?.length === 1 ? (
                              <OnePicture selectedImages={imagePreviews?.map(img => img)}/>
                          ) : ('')}                        
                        </>
                      ) : (
                        <>
                          {imagePreviews?.length > 3 ? (
                              <VideoPlayer5
                                  url = {videoPreview}
                                  selectedImages = {imagePreviews?.map(img => img)}
                                  extraImagesCount={imagePreviews?.length - 2}
                              /> 
                          ) : imagePreviews?.length === 3 ? (
                              <VideoPlayer4
                                  url = {videoPreview}
                                  selectedImages = {imagePreviews?.map(img => img)}
                              />                                        
                          ) : imagePreviews?.length === 2 ? (
                              <VideoPlayer3
                                  url = {videoPreview}
                                  selectedImages = {imagePreviews?.map(img => img)}
                              />                                        
                          ) : imagePreviews?.length === 1 ? (
                              <VideoPlayer2
                                  url = {videoPreview}
                                  selectedImages = {imagePreviews?.map(img => img)}
                              />                                        
                          ) : (
                              <VideoPlayer url = {videoPreview}/>
                          )}                        
                        </>
                      )}

                    </div>                    
                  </div>

                  <div className="flex items-center mt-4">
                    <button className="flex items-center "
                            onClick={()=> setShowFont(true)}
                    >
                      <img src={require('../../assets/icons/text.png')} alt="Aa" className="w-9 h-9"/>
                    </button>
                    {showFont && (
                      <div className='flex'>
                        <div onClick={()=>setTypeText(true)} className='bg-gray-300 rounded-md cursor-pointer hover:bg-gray-300'>
                          <p className='font-sans px-2 py-0.5 text-sm font-medium'>
                            normal
                          </p>
                        </div>
                        <div onClick={()=>setTypeText(false)} className='ml-2 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-300'>
                          <p className='font-mono px-2 py-0.5 italic text-sm font-semibold'>
                            special
                          </p>
                        </div>
                      </div>                      
                    )}
                    <div className="flex-1 flex justify-end space-x-2">
                      <button onClick={handleImageClick} className="flex items-center">
                        <img src={require('../../assets/icons/photo.png')} alt="Location" className="w-9 h-9" />
                      </button>
                      <button onClick={handleVideoClick} className="flex items-center">
                        <img src={require('../../assets/icons/clapperboard.png')} alt="GIF" className="w-8 h-8" />
                      </button>
                      {/* Hidden inputs */}
                      <input 
                        type="file" 
                        accept="image/*" 
                        ref={imageInputRef} 
                        style={{ display: 'none' }} 
                        onChange={handleImageChange} 
                        multiple 
                      />
                      <input 
                        type="file" 
                        accept="video/*" 
                        ref={videoInputRef} 
                        style={{ display: 'none' }} 
                        onChange={handleVideoChange} 
                      />
                    </div>
                  </div>
                </div>
                <div className="border-t p-4">
                  {text || images.length > 0 || video ? (
                    <button onClick={handleCreatePost} className="w-full bg-customBlue text-white py-2 px-4 rounded-lg">
                      Post
                    </button>
                  ) : (
                    <button
                      className="w-full bg-blue-300 text-white py-2 px-4 rounded-lg"
                      disabled
                    >
                      Post
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
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