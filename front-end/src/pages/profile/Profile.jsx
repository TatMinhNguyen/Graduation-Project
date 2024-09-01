import React, { useEffect, useState } from 'react'
import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgZoom from 'lightgallery/plugins/zoom';
import { useNavigate, useParams, Outlet, useLocation  } from 'react-router-dom';
import { getMyProfile, getProfile } from '../../api/profile/profile';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../components/navbar/NavBar';
import { formatToMonthYear } from '../../utils';
import ChangeAvatar from '../../components/changeProfile/ChangeAvatar';
import ChangeBackground from '../../components/changeProfile/ChangeBackground';

const Profile = () => {
    const { userId } = useParams();
    const user = useSelector((state) => state.auth.login?.currentUser)
    const myProfile = useSelector((state) => state?.auth?.profile)
    const [profile, setProfile] = useState({})
    const location = useLocation(); 

    const [showEditAvatar, setShowEditAvatar] = useState(false)
    const [showEditCover, setShowEditCover] = useState(false)

    const navigation = useNavigate();
    const dispatch = useDispatch();

    const handleShowEditAvatar = () => {
        setShowEditAvatar(true)
    }

    const handleGetUser = async () => {
        try {
            const result = await getProfile(user?.token, userId)
            setProfile(result);
            await getMyProfile(user?.token, dispatch)
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetPost = () => {
        navigation(`/get-profile/${userId}`)
    }

    const handleGetFriends = () => {
        navigation(`/get-profile/${userId}/friends`)
    }

    /* eslint-disable */
    useEffect(() => {
        handleGetUser();
    },[userId])

    useEffect(() => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang khi component được render
    }, []);

    const onInit = () => {
        // console.log('lightGallery has been initialized');
    };

    let information = {}
    if(user?.userId === userId) {
        information = myProfile
    }
    else {
        information = profile
    }

    return (
        <div className='bg-gray-100 flex-1 flex items-center justify-center'>
            <div className='fixed top-0 w-full z-50'>
                <NavBar 
                    user={user}
                />
            </div>
            <div className=' w-3/4  pt-11'>
                <div className='w-full bg-white shadow rounded-xl'>
                    <div className='relative'>                          
                        <LightGallery
                            onInit={onInit}
                            speed={500}
                            plugins={[lgZoom]}
                            elementClassNames="flex h-full w-full"
                        >
                            <img
                                className='w-full h-[55vh] object-cover rounded-xl cursor-pointer shadow'
                                src={information?.coverPicture}
                                alt=''
                            />                        
                        </LightGallery> 
                        {userId === user?.userId && (
                            <div 
                                onClick={() => setShowEditCover(true)}
                                className='absolute flex bottom-3 right-5 px-3 py-1.5 bg-white rounded-md shadow cursor-pointer hover:bg-gray-100'>
                                <img
                                    src={require('../../assets/icons/camera-black.png')}
                                    alt=''
                                    className='w-5 h-5 mt-0.5 opacity-90 hover:opacity-100'
                                />   
                                <p className='font-medium ml-2'>
                                    Edit cover photo    
                                </p> 
                            </div>                            
                        )} 
                        {showEditCover && (
                            <ChangeBackground
                                avatar = {information?.coverPicture}
                                user = {user}
                                isCloseModal = {() => setShowEditCover(false)}
                            />
                        )}                      
                    </div>
                    <div className='flex-1 flex items-center pb-3 relative z-10'>
                        <LightGallery
                            onInit={onInit}
                            speed={500}
                            plugins={[lgZoom]}
                            elementClassNames=""
                        >
                        <img
                            className='w-44 h-44 object-cover rounded-full border-4 border-white ml-12 -mt-20 cursor-pointer'
                            src={information?.profilePicture}
                            alt=''
                        />                        
                        </LightGallery>
                        {userId === user?.userId && (
                            <div className='-ml-12 mt-12 mr-2 p-1.5 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200 border-2 border-white'
                                    onClick={handleShowEditAvatar}
                            >
                                <img
                                    src={require('../../assets/icons/camera-black.png')}
                                    alt=''
                                    className='w-6 h-6 '
                                />
                            </div>                            
                        )}
                        {showEditAvatar && (
                            <ChangeAvatar
                                avatar = {information?.profilePicture}
                                user = {user}
                                isCloseModal = {() => setShowEditAvatar(false)}
                            />
                        )}
                        <div className='ml-4'>
                            <h1 className='text-2xl font-bold'>
                                {information?.username}
                            </h1> 
                            <div className=''>
                                <p className='text-gray-500 justify-self-start font-normal cursor-pointer hover:text-gray-400 p-0'>
                                    {information?.friendsCount} friends
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
                                    {information?.friendRequested?.includes(user?.userId) ? (
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
                                    ) : information?.friendRequesting?.includes(user?.userId) ? (
                                        <div className='flex'>
                                            <div className='flex items-center cursor-pointer bg-customBlue pl-3 pr-3 py-2 rounded-md mr-3'>
                                                <img className='h-5 w-5 mr-1 mt-px'
                                                    src={require("../../assets/icons/add-friend-white.png")}
                                                    alt=''
                                                /> 
                                                <p className='font-medium text-md text-white'>
                                                    Confirm   
                                                </p>                                           
                                            </div>
                                            <div className='flex items-center cursor-pointer bg-gray-200 pl-3 pr-3 py-2 rounded-md mr-3'>
                                                <img className='h-5 w-5 mr-1 mt-px'
                                                    src={require("../../assets/icons/delete-friend.png")}
                                                    alt=''
                                                /> 
                                                <p className='font-medium text-md'>
                                                    Refuse   
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
                                    ) : information?.friends?.includes(user?.userId) ? (
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
                                            <div className='flex-1 flex items-center cursor-pointer bg-customBlue pl-3 pr-3 py-2 rounded-md mr-3'>
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
                            {!information?.work || information?.work == '' ? (
                                <p className='ml-3 text-gray-500'>
                                    No information about the job
                                </p>
                            ) : (
                                <p className='ml-3 text-gray-900'>
                                    Works at {information?.work}
                                </p>                                
                            )}
                        </div>
                        <div className='flex ml-4 my-3'>
                            <img
                                src={require('../../assets/icons/location.png')}
                                alt=''
                                className='w-5 h-5 mt-0.5'
                            />
                            {!information?.work || information?.work == '' ? (
                                <p className='ml-3 text-gray-500'>
                                    No information about the address
                                </p>
                            ) : (
                                <p className='ml-3 text-gray-900 flex'>
                                    Lives in <p className='font-medium ml-1.5'>{information?.address}</p>
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
                                Joined {formatToMonthYear(information?.createdAt)} 
                            </p>
                        </div>
                    </div>
                    <div className='w-2/3 ml-2'>
                        <div className='flex bg-white border border-white shadow rounded-md mb-3'>
                            <div className='w-1/2  flex-1 flex items-center justify-center '
                                    onClick={handleGetPost}
                            >
                                <p className={`text-lg font-bold font-mono mt-2 cursor-pointer ${location.pathname === `/get-profile/${userId}` ? 'border-b-4 border-b-customBlue pb-1' : 'pb-2'}`}>
                                    Posts
                                </p>                                
                            </div>
                            <div className='w-1/2 flex-1 flex items-center justify-center r'
                                    onClick={handleGetFriends}
                            >
                                <p className={`text-lg font-bold font-mono mt-2 cursor-pointer ${location.pathname === `/get-profile/${userId}/friends` ? 'border-b-4 border-b-customBlue pb-1' : 'pb-2'}`}>
                                    Friends
                                </p>                                
                            </div>
                        </div>
                        <Outlet context={userId}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile