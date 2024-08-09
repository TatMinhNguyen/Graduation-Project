import React, { useEffect, useState } from 'react'
import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgZoom from 'lightgallery/plugins/zoom';
import { useParams } from 'react-router-dom';
import { getProfile } from '../../api/profile/profile';
import { useSelector } from 'react-redux';
import NavBar from '../../components/navbar/NavBar';

const Profile = () => {
    const { userId } = useParams();
    const user = useSelector((state) => state.auth.login?.currentUser)
    const [profile, setProfile] = useState({})
    // console.log(user)

    const handleGetUser = async () => {
        try {
            const result = await getProfile(user?.token, userId)
            setProfile(result);
        } catch (error) {
            console.log(error)
        }
    }

    /* eslint-disable */
    useEffect(() => {
        handleGetUser();
    },[userId])

    const onInit = () => {
        // console.log('lightGallery has been initialized');
    };

    return (
        <div className='bg-gray-100'>
            <div className='fixed top-0 w-full z-50'>
                <NavBar 
                    user={user}
                />
            </div>
            <div className='flex-1 flex items-center justify-center pt-11'>
                <div className='w-2/3 bg-white shadow'>
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
                    <div className='flex-1 flex items-center '>
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
                            <div className='w-full'>
                                <p className='text-gray-500 font-normal cursor-pointer hover:text-gray-400 p-0'>
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
                                    {user?.friendRequesting?.includes(userId) ? (
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
                                            <div className='flex items-center bg-gray-200 cursor-pointer pl-2 pr-3 py-2 rounded-md mr-5'>
                                                <img className='h-5 w-5 mr-1 mt-px'
                                                    src={require("../../assets/icons/messenger-black.png")}
                                                    alt=''
                                                />
                                                <p className='font-medium text-md'>
                                                    Message
                                                </p>                                            
                                            </div>
                                        </div>  
                                    ) : user?.friendRequested?.includes(userId) ? (
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
                                            <div className='flex items-center bg-gray-200 cursor-pointer pl-2 pr-3 py-2 rounded-md mr-5'>
                                                <img className='h-5 w-5 mr-1 mt-px'
                                                    src={require("../../assets/icons/messenger-black.png")}
                                                    alt=''
                                                />
                                                <p className='font-medium text-md'>
                                                    Message
                                                </p>                                            
                                            </div>
                                        </div> 
                                    ) : user?.friends?.includes(userId) ? (
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
                                            <div className='flex items-center bg-gray-200 cursor-pointer pl-2 pr-3 py-2 rounded-md mr-5'>
                                                <img className='h-5 w-5 mr-1 mt-px'
                                                    src={require("../../assets/icons/messenger-black.png")}
                                                    alt=''
                                                />
                                                <p className='font-medium text-md'>
                                                    Message
                                                </p>                                            
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
                                            <div className='flex items-center bg-gray-200 cursor-pointer pl-2 pr-3 py-2 rounded-md mr-5'>
                                                <img className='h-5 w-5 mr-1 mt-px'
                                                    src={require("../../assets/icons/messenger-black.png")}
                                                    alt=''
                                                />
                                                <p className='font-medium text-md'>
                                                    Message
                                                </p>                                            
                                            </div>
                                        </div>                                        
                                    )
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile