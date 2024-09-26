import React, { useEffect } from 'react'
import { timeAgo } from '../../utils';
// import socket from '../../socket';

const GetNotifications = ({notifications}) => {

    useEffect(() => {
        // socket.on("notification", (newNotification) => {
        //   console.log("New notification:", newNotification);
        //   // Cập nhật state thông báo
        // //   setNotifications((prev) => [newNotification, ...prev]);
        // }); 
      
        // return () => {
        //   socket.off("notification");
        // };
    }, []);
    return (
        <div>
            <div className='absolute top-[-8px] right-[79px] transform rotate-45 w-3 h-3 bg-white border-l border-t border-gray-200'>
            </div>
            <div>
                <h1 className='font-bold text-xl ml-2.5'>
                    Notifications
                </h1>
            </div>
            {notifications?.length <= 0 ? (
                <div className='flex-1 flex items-center justify-center mt-5'>
                    <div className='flex flex-col items-center justify-center'>
                        <img
                            src={require('../../assets/icons/notification.png')}
                            alt=''
                            className='w-20 h-20 mb-4'
                        />
                        <p className='text-gray-500 text-xl font-medium italic'>
                            You have no notifications
                        </p>                        
                    </div>
                </div>
            ) : (
                <div className='mt-3'>
                    {notifications?.map((notification) => {
                        return (
                            <div key={notification._id}>
                                <div className={`flex mx-1 my-1 cursor-pointer hover:bg-gray-200 rounded-md p-1.5 py-1 ${notification?.read === false ? '' : 'opacity-60'}`}>
                                    <div className='w-11 h-11 mr-3 mt-1'>
                                        <img className='h-full w-full object-cover rounded-full shadow hover:opacity-90'
                                            src= {notification?.sender?.profilePicture}
                                            alt=''
                                        />
                                    </div>
                                    <div className='absolute left-9 mt-9'>
                                        {notification?.type === 'set_comment' || notification?.type === 'update_comment' ? (
                                            <img
                                                src={require('../../assets/icons/comment1.png')}
                                                alt=''
                                                className='w-6 h-6 rounded-full'
                                            />                                            
                                        ) : notification?.type === 'create_post' ? (
                                            <div className='rounded-full bg-customBlue w-6 h-6'
                                                style={{ backgroundPosition: '-1.5px -1945.5px', backgroundImage: `url(${require('../../assets/icons/icons.png')})` }}
                                            >
                                            </div>
                                        ) : notification?.type === 'friend_request' || notification?.type === 'friend_accept' ? (
                                            <div className='rounded-full bg-customBlue w-6 h-6'
                                                style={{ backgroundPosition: '-1.5px -1191px', backgroundImage: `url(${require('../../assets/icons/icons.png')})` }}
                                            >
                                            </div>                                            
                                        ) : (
                                            <>  
                                                {notification?.type_felt === '1' ? (
                                                    <img
                                                        src={require('../../assets/icons/like-blue1.png')}
                                                        alt=''
                                                        className='w-6 h-6 rounded-full'
                                                    />                                                     
                                                ) : notification?.type_felt === '2' ? (
                                                    <img
                                                        src={require('../../assets/icons/love.png')}
                                                        alt=''
                                                        className='w-6 h-6 rounded-full'
                                                    /> 
                                                ) : notification?.type_felt === '3' ? (
                                                    <img
                                                        src={require('../../assets/icons/haha.png')}
                                                        alt=''
                                                        className='w-6 h-6 rounded-full'
                                                    /> 
                                                ) : (
                                                    <img
                                                        src={require('../../assets/icons/sad.png')}
                                                        alt=''
                                                        className='w-6 h-6 rounded-full'
                                                    /> 
                                                )}
                                           
                                            </>
                                        )}

                                    </div>
                                    <div className='w-5/6'>
                                        <p className='text-base'>
                                            <strong>{notification?.sender?.username}</strong>  {notification?.message}
                                        </p>
                                        <span className={`text-sm ${notification?.read === false ? 'text-customBlue font-medium' : 'text-gray-800' } `}>
                                            {timeAgo(notification?.createdAt)}
                                        </span>                                        
                                    </div>
                                </div> 
                            </div>
                        )
                    })}
                </div>                
            )}

        </div>
    )
}

export default GetNotifications