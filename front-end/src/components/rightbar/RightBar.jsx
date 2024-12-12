import React, { useEffect, useState } from 'react'
import { getFriends, getRequested } from '../../api/friends/friends'
import { Link, useNavigate } from 'react-router-dom'
import socket from '../../socket/index'
import { createChat1vs1 } from '../../api/chat/chat'

const RightBar = ({user}) => {
  const [requestFriends, setRequestFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const navigate = useNavigate();

  const handleGetRequestFriends = async () => {
    try {
      const result = await getRequested(user?.token)
      const limitedResult = result.slice(0, 2) // Chỉ lấy tối đa 2 phần tử
      setRequestFriends(limitedResult)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetFriends = async () => {
    try {
      const result = await getFriends(user?.token, user?.userId)
      setFriends(result)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateChat = async (userId) => {
    try {
        await createChat1vs1(user?.token, userId, navigate)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    // Lắng nghe sự kiện onlineUsers từ server
    socket.on("onlineUsers", (users) => {
      // console.log("Online users:", users);
      setOnlineUsers(users);
    });

    // Cleanup
    return () => {
      socket.off("onlineUsers");
    };
  }, []);

  /* eslint-disable */
  useEffect(()=> {
    handleGetRequestFriends();
    handleGetFriends();
  },[])
  return (
    <div className='w-[22vw] -mt-2 overflow-y-auto h-[94vh] no-scrollbar relative'>
      <div className=' pb-1 mx-2'>
        {requestFriends?.length > 0 && (
          <div className='border-b border-gray-300'>
            <h1 className='font-medium text-gray-500 ml-1'>
              Friend requests
            </h1>
            {requestFriends?.map((user) => (
              <div key={user._id} onClick={() => navigate(`/get-profile/${user?._id}`) }
                className='flex mb-1 py-2 px-2 hover:bg-gray-200 rounded-lg cursor-pointer'
              >
                <Link className='h-12 w-12' to={`/get-profile/${user?._id}`}>
                  <img className='h-full w-full object-cover rounded-full hover:opacity-90'
                    src={user?.profilePicture}
                    alt="User Avatar" 
                  />              
                </Link> 
                <div className='ml-3'>
                  <h1 className='font-medium text-[15px]'>
                    {user?.username}  
                  </h1>  
                  <p className='text-[13px] text-gray-500'>
                    {user?.mutualFriends} mutual friends
                  </p>
                  <div className='flex'>
                    <button className='mr-4 mt-1 px-8 py-1.5 bg-customBlue rounded-md font-medium text-[14px] text-white'
                      onClick={(e) => e.stopPropagation()}
                    >
                      Confirm
                    </button>
                    <button className='mt-1 px-9 py-1.5 bg-gray-300 rounded-md font-medium text-[14px]'>
                      Delete
                    </button>
                  </div>
                </div>               
              </div>
            ))}
          </div>
        )}
      </div>
      <div className=' pb-2 mx-2 my-2'>
        {friends?.length > 0 && (
          <div className=''>
            <h1 className='font-medium text-gray-500 ml-1'>
              Contacts
            </h1>  
            {friends?.map((user) => (
              <div key={user._id} className='flex items-center mb-1 py-2 px-2 hover:bg-gray-200 rounded-lg cursor-pointer'
                onClick={() => handleCreateChat(user._id)}
              >
                <div className='h-10 w-10 mr-3'>
                  {onlineUsers?.includes(user._id) && (
                    <div className='w-3 h-3 border-2 border-white rounded-full bg-green-600 absolute mt-[29px] ml-[29px]'></div>
                  )}
                  <img className='h-full w-full object-cover rounded-full'
                    src={user?.profilePicture}
                    alt="User Avatar" 
                  />            
                </div>  
                <h1 className='font-medium text-[15px]'>
                  {user.username}  
                </h1>           
              </div>
            ))}                        
          </div>
        )}
       

      </div>
    </div>
  )
}

export default RightBar