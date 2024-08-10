import React, { useEffect, useState } from 'react'
import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgZoom from 'lightgallery/plugins/zoom';
import { useNavigate, useParams } from 'react-router-dom';
import { getProfile } from '../../api/profile/profile';
import { useSelector } from 'react-redux';
import NavBar from '../../components/navbar/NavBar';
import { getUserPost } from '../../api/post/post';
import { convertNewlinesToBreaks, formatToMonthYear, timeAgo } from '../../utils';
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

const Profile = () => {
    const { userId } = useParams();
    const user = useSelector((state) => state.auth.login?.currentUser)
    const [profile, setProfile] = useState({})
    const [posts, setPosts] = useState([]);
    // console.log(user)
    // console.log(profile)

    const navigation = useNavigate();

    const handleGetUser = async () => {
        try {
            const result = await getProfile(user?.token, userId)
            setProfile(result);
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetUserPost = async () => {
        try {
            const result = await getUserPost(user?.token, userId)
            setPosts(result);            
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetAPost = async(postId) => {
        navigation(`/get-post/${postId}`)
    }

    /* eslint-disable */
    useEffect(() => {
        handleGetUser();
        handleGetUserPost();
    },[userId])

    useEffect(() => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang khi component được render
    }, []);

    const onInit = () => {
        // console.log('lightGallery has been initialized');
    };

    return (
        <div className='bg-gray-100 flex-1 flex items-center justify-center'>
            <div className='fixed top-0 w-full z-50'>
                <NavBar 
                    user={user}
                />
            </div>
            <div className=' w-3/4  pt-11'>
                <div className='w-full bg-white shadow rounded-xl'>
                    <div>
                        <LightGallery
                            onInit={onInit}
                            speed={500}
                            plugins={[lgZoom]}
                            elementClassNames="flex h-full w-full"
                        >
                        <img
                                className='w-full h-[55vh] object-cover rounded-xl cursor-pointer shadow'
                                src={profile?.coverPicture}
                                alt=''
                            />                        
                        </LightGallery>    
                    </div>
                    <div className='flex-1 flex items-center pb-3'>
                        <LightGallery
                            onInit={onInit}
                            speed={500}
                            plugins={[lgZoom]}
                            elementClassNames=""
                        >
                        <img
                            className='w-44 h-44 object-cover rounded-full border-4 border-white ml-12 -mt-20 cursor-pointer'
                            src={profile?.profilePicture}
                            alt=''
                        />                        
                        </LightGallery>
                        <div className='ml-4'>
                            <h1 className='text-3xl font-bold'>
                                {profile?.username}
                            </h1> 
                            <div className='w-1/2'>
                                <p className='text-gray-500 justify-self-start font-normal cursor-pointer hover:text-gray-400 p-0'>
                                    {profile?.friendsCount} friends
                                </p>                                 
                            </div>                          
                        </div>
                        <div className='flex-1'></div>
                        <div>
                            {userId == user?.userId ? (
                                <div className='flex-1 flex items-center cursor-pointer justify-center bg-gray-200 pl-2 pr-3 py-2 rounded-md mr-5'>
                                    <img className='h-6 w-6 mr-1'
                                        src={require("../../assets/icons/edit.png")}
                                        alt=''
                                    />
                                    <p className='font-medium text-md'>
                                        Edit profile
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    {profile?.friendRequested?.includes(user?.userId) ? (
                                        <div className='flex'>
                                            <div className='flex-1 flex items-center cursor-pointer bg-gray-200 pl-3 pr-3 py-2 rounded-md mr-3'>
                                                <img className='h-5 w-5 mr-1 mt-px'
                                                    src={require("../../assets/icons/delete-friend.png")}
                                                    alt=''
                                                /> 
                                                <p className='font-medium text-md'>
                                                    Cancel request   
                                                </p>                                           
                                            </div>
                                            <div className='flex items-center bg-gray-200 cursor-pointer pl-2 pr-3 py-2 rounded-md mr-3'>
                                                <img className='h-5 w-5 mr-1 mt-px'
                                                    src={require("../../assets/icons/messenger-black.png")}
                                                    alt=''
                                                />
                                                <p className='font-medium text-md'>
                                                    Message
                                                </p>                                            
                                            </div>
                                            <div className='flex items-center bg-gray-200 cursor-pointer px-2 py-2 rounded-md mr-5'>
                                                <img className='h-6 w-6 mt-px'
                                                    src={require("../../assets/icons/menu.png")}
                                                    alt=''
                                                />                                                
                                            </div>                                            
                                        </div>  
                                    ) : profile?.friendRequesting?.includes(user?.userId) ? (
                                        <div className='flex'>
                                            <div className='flex items-center cursor-pointer bg-blue-600 pl-3 pr-3 py-2 rounded-md mr-3'>
                                                <img className='h-5 w-5 mr-1 mt-px'
                                                    src={require("../../assets/icons/add-friend-white.png")}
                                                    alt=''
                                                /> 
                                                <p className='font-medium text-md text-white'>
                                                    Confirm request   
                                                </p>                                           
                                            </div>
                                            <div className='flex items-center cursor-pointer bg-gray-200 pl-3 pr-3 py-2 rounded-md mr-3'>
                                                <img className='h-5 w-5 mr-1 mt-px'
                                                    src={require("../../assets/icons/delete-friend.png")}
                                                    alt=''
                                                /> 
                                                <p className='font-medium text-md'>
                                                    Refuse request   
                                                </p>                                           
                                            </div>
                                            <div className='flex items-center bg-gray-200 cursor-pointer pl-2 pr-3 py-2 rounded-md mr-3'>
                                                <img className='h-5 w-5 mr-1 mt-px'
                                                    src={require("../../assets/icons/messenger-black.png")}
                                                    alt=''
                                                />
                                                <p className='font-medium text-md'>
                                                    Message
                                                </p>                                            
                                            </div>
                                            <div className='flex items-center bg-gray-200 cursor-pointer px-2 py-2 rounded-md mr-5'>
                                                <img className='h-6 w-6 mt-px'
                                                    src={require("../../assets/icons/menu.png")}
                                                    alt=''
                                                />                                                
                                            </div>                                           
                                        </div> 
                                    ) : profile?.friends?.includes(user?.userId) ? (
                                        <div className='flex'>
                                            <div className='flex-1 flex items-center cursor-pointer bg-gray-200 pl-3 pr-3 py-2 rounded-md mr-3'>
                                                <img className='h-5 w-5 mr-1 mt-px'
                                                    src={require("../../assets/icons/friends.png")}
                                                    alt=''
                                                /> 
                                                <p className='font-medium text-md'>
                                                    Friends   
                                                </p>                                           
                                            </div>
                                            <div className='flex items-center bg-gray-200 cursor-pointer pl-2 pr-3 py-2 rounded-md mr-3'>
                                                <img className='h-5 w-5 mr-1 mt-px'
                                                    src={require("../../assets/icons/messenger-black.png")}
                                                    alt=''
                                                />
                                                <p className='font-medium text-md'>
                                                    Message
                                                </p>                                            
                                            </div>
                                            <div className='flex items-center bg-gray-200 cursor-pointer px-2 py-2 rounded-md mr-5'>
                                                <img className='h-6 w-6 mt-px'
                                                    src={require("../../assets/icons/menu.png")}
                                                    alt=''
                                                />                                                
                                            </div>                                            
                                        </div> 
                                    ) :(
                                        <div className='flex'>
                                            <div className='flex-1 flex items-center cursor-pointer bg-blue-600 pl-3 pr-3 py-2 rounded-md mr-3'>
                                                <img className='h-5 w-5 mr-1 mt-px'
                                                    src={require("../../assets/icons/add-friend-white.png")}
                                                    alt=''
                                                /> 
                                                <p className='font-medium text-md text-white'>
                                                    Add friend   
                                                </p>                                           
                                            </div>
                                            <div className='flex items-center bg-gray-200 cursor-pointer pl-2 pr-3 py-2 rounded-md mr-3'>
                                                <img className='h-5 w-5 mr-1 mt-px'
                                                    src={require("../../assets/icons/messenger-black.png")}
                                                    alt=''
                                                />
                                                <p className='font-medium text-md'>
                                                    Message
                                                </p>                                            
                                            </div>
                                            <div className='flex items-center bg-gray-200 cursor-pointer px-2 py-2 rounded-md mr-5'>
                                                <img className='h-6 w-6 mt-px'
                                                    src={require("../../assets/icons/menu.png")}
                                                    alt=''
                                                />                                                
                                            </div>
                                        </div>                                        
                                    )
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='mt-4 flex '>
                    <div className='w-1/3 bg-white mr-2 border border-white shadow rounded-md self-start'>
                        <p className='text-xl font-bold font-sans m-2 ml-4 mb-5'>
                            Introduction  
                        </p>
                        <div className='flex ml-4'>
                            <img
                                src={require('../../assets/icons/work.png')}
                                alt=''
                                className='w-5 h-5 mt-0.5'
                            />
                            {!profile?.work || profile?.work == '' ? (
                                <p className='ml-3 text-gray-500'>
                                    No information about the job
                                </p>
                            ) : (
                                <p className='ml-3 text-gray-900'>
                                    Works at {profile?.work}
                                </p>                                
                            )}
                        </div>
                        <div className='flex ml-4 my-3'>
                            <img
                                src={require('../../assets/icons/location.png')}
                                alt=''
                                className='w-5 h-5 mt-0.5'
                            />
                            {!profile?.work || profile?.work == '' ? (
                                <p className='ml-3 text-gray-500'>
                                    No information about the address
                                </p>
                            ) : (
                                <p className='ml-3 text-gray-900 flex'>
                                    Lives in <p className='font-medium ml-1.5'>{profile?.address}</p>
                                </p>                                
                            )}
                        </div>
                        <div className='flex ml-4 my-3'>
                            <img
                                src={require('../../assets/icons/clock.png')}
                                alt=''
                                className='w-5 h-5 mt-0.5'
                            />
                            <p className='ml-3 text-gray-900'>
                                Joined {formatToMonthYear(profile?.createdAt)} 
                            </p>
                        </div>
                    </div>
                    <div className='w-2/3 ml-2'>
                        <div className='bg-white border border-white shadow rounded-md mb-4'>
                            <p className='text-xl font-semibold font-mono m-2'>
                                {profile?.username}'s Posts
                            </p>
                        </div>
                        <div>
                            {posts?.map((post) => {
                                return (
                                    <div key={post?.postId} 
                                        className='bg-white mt-0 mb-4 border border-white shadow rounded-md flex-1 items-center'
                                    >
                                        <div  
                                            className='flex-1 flex items-center mx-3 my-2 cursor-pointer'>
                                            <div className='w-10 h-10'>
                                                <img className='h-full w-full object-cover rounded-full shadow'
                                                    src= {post?.author?.authorAvatar}
                                                    alt=''
                                                />
                                            </div>
                                            <div className='ml-3'>
                                                <h1 className='font-medium text-base'>
                                                    {post?.author?.authorName}
                                                </h1>
                                                <p className='text-xs text-gray-500'>
                                                    {timeAgo(post?.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                        <div onClick={() => handleGetAPost(post?.postId)} className='cursor-pointer'>
                                            {post?.typeText === false ?(
                                                <p className='ml-3.5 font-mono' style={{color: "#333333"}}>
                                                    {post?.description ? (
                                                        convertNewlinesToBreaks(post?.description)
                                                    ) : (
                                                        ''
                                                    )}
                                                </p>
                                            ) : (
                                                <p className='ml-3.5 font-sans' style={{color: "#050505"}}>
                                                    {post?.description ? (
                                                        convertNewlinesToBreaks(post?.description)
                                                    ) : (
                                                        ''
                                                    )}
                                                </p>
                                            )}
                                            <div className='mt-2'>
                                                {(post?.video == null || !post?.video) ? (
                                                    <>
                                                        {post?.images.length > 5 ? (
                                                            <SixPictures
                                                                selectedImages={post?.images.map(img => img.url)} 
                                                                extraImagesCount={post?.images.length - 4}
                                                            />
                                                        ) : post?.images.length === 5 ? (
                                                            <FivePictures selectedImages={post?.images.map(img => img.url)}/>
                                                        ) : post?.images.length === 4 ? (
                                                            <FourPictures selectedImages={post?.images.map(img => img.url)}/>
                                                        ) : post?.images.length === 3 ? (
                                                            <ThreePictures selectedImages={post?.images.map(img => img.url)}/>
                                                        ) : post?.images.length === 2 ? (
                                                            <TwoPictures selectedImages={post?.images.map(img => img.url)}/>
                                                        ) : post?.images.length === 1 ? (
                                                            <OnePicture selectedImages={post?.images.map(img => img.url)}/>
                                                        ) : ('')}
                                                    </>
                                                ) : (
                                                    <>  
                                                        {post?.images.length > 3 ? (
                                                            <VideoPlayer5
                                                                url = {post.video.url}
                                                                selectedImages = {post?.images.map(img => img.url)}
                                                                extraImagesCount={post?.images.length - 2}
                                                            /> 
                                                        ) : post?.images.length === 3 ? (
                                                            <VideoPlayer4
                                                                url = {post.video.url}
                                                                selectedImages = {post?.images.map(img => img.url)}
                                                            />                                        
                                                        ) : post?.images.length === 2 ? (
                                                            <VideoPlayer3 
                                                                url = {post.video.url}
                                                                selectedImages = {post?.images.map(img => img.url)}
                                                            />                                        
                                                        ) : post?.images.length === 1 ? (
                                                            <VideoPlayer2
                                                                url = {post.video.url}
                                                                selectedImages = {post?.images.map(img => img.url)}
                                                            />                                        
                                                        ) : (
                                                            <VideoPlayer url = {post?.video.url}/>
                                                        )} 
                                                    </>
                                                )} 
                                            </div>
                                        </div>
                                        <div className=''>
                                            <div className='flex mt-2 mb-2'>
                                                <div className='w-1/2 flex-1 flex items-center '>
                                                    <img className='h-6 w-6 ml-3.5 rounded-full border-2 border-white shadow-xl'
                                                        src={require("../../assets/icons/like-blue1.png")}
                                                        alt=''
                                                    />
                                                    <img className='h-6 w-6 -ml-1 rounded-full border-2 border-white shadow-xl'
                                                        src={require("../../assets/icons/love.png")}
                                                        alt=''
                                                    />
                                                    <img className='h-6 w-6 -ml-1 rounded-full border-2 border-white shadow-xl'
                                                        src={require("../../assets/icons/haha.png")}
                                                        alt=''
                                                    />
                                                    <p className='text-gray-500 font-normal text-base ml-1'>
                                                        {post?.felt}
                                                    </p>
                                                </div>
                                                <div className='w-1/2 flex '>
                                                    <div className='flex-1'></div>
                                                    <p className='text-gray-500 font-normal text-base'>
                                                        {post?.comment}
                                                    </p>
                                                    <p className='text-gray-500 font-normal text-base ml-1 mr-3.5'>
                                                        comments
                                                    </p>
                                                </div> 
                                            </div>
                                            <div className='flex-1 flex border-t border-gray-300 py-2 mx-3.5'>
                                                <div className='w-1/2 flex-1 flex items-center justify-center cursor-pointer'>
                                                    <img className='h-6 w-6 ml-2'
                                                        src={require("../../assets/icons/like.png")}
                                                        alt=''
                                                    />
                                                    <p className='text-gray-500 font-normal text-base ml-2 mr-12'>
                                                        Like
                                                    </p>
                                                </div>
                                                <div className={`w-1/2 flex-1 flex items-center justify-center cursor-pointer`}
                                                    onClick={() => handleGetAPost(post?.postId)}
                                                >
                                                    <img className='h-5 w-5 ml-2'
                                                        src={require("../../assets/icons/comment.png")}
                                                        alt=''
                                                    />
                                                    <p className='text-gray-500 font-normal text-base ml-3 mb-1'>
                                                        Comment
                                                    </p>
                                                </div>                          
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile