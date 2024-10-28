import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { getUserChat } from '../../api/chat/chat'
import { useNavigate, useParams } from 'react-router-dom'
import socket from '../../socket'
import CreateGroupChat from './CreateGroupChat'

const GetChats = () => {
    const chats = useSelector((state) => state.chat.chats)
    const user = useSelector((state) => state.auth.login?.currentUser)
    const { chatId } = useParams();

    const [showCreateGroupChat, setShowCreateGroupChat] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const handleGetUserChats = async() => {
      try {
          await getUserChat(user?.token, dispatch)
      } catch (error) {
          console.log(error)
      }
    }
  
    /* eslint-disable */
    useEffect(() => {
      socket.on('send-chat', () => {
        handleGetUserChats(); 
      });
  
      // //Hủy sự kiện khi component unmount
      return () => {
        socket.off('send-chat');
      };
    }, []); 
  
    /* eslint-disable */
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        if(user?.token) {
            handleGetUserChats();
        }
    }, []);

    return (
        <div className='p-2'>
            <div className='flex mt-1'>
                <h1 className='text-2xl font-bold ml-2'>
                    Chats
                </h1>
                <div className='flex-1'></div>
                <div className='bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-gray-200 mr-2'
                    onClick={() => setShowCreateGroupChat(true)}
                >
                    <img className='w-4 h-4'
                        src={require('../../assets/icons/plus.png')}
                        alt=''
                    />                
                </div>
            </div>
            {showCreateGroupChat && (
                <CreateGroupChat
                    isClose = {() => setShowCreateGroupChat(false)}
                />
            )}
            <div className='w-full px-2'>
                <form className='flex-1 flex items-center mt-2 bg-gray-100 mx-auto rounded-3xl'
                        // onSubmit={handleSearch}
                >
                    <button>
                        <img className='w-5 h-5 ml-3 mt-0.5'
                            src = {require('../../assets/icons/search.png')}
                            alt=''
                        />                    
                    </button>
                    <input
                        type='text'
                        id='search'
                        name='search'
                        placeholder='Search messenger'
                        // value={searchInput}
                        // onChange={(e) => setSearchInput(e.target.value)}
                        className='flex-grow w-full pl-3 pr-1 py-1.5 mb-0.5 rounded-3xl bg-gray-100 overflow-hidden
                                    focus:outline-none'
                    />
                </form>
            </div>
            <div className='mt-4'>
                {chats?.map((chat) => {
                    return (
                        <div key={chat._id}
                            className={`flex items-center p-2 py-2.5 ${chat._id === chatId ? "bg-neutral-200" : "hover:bg-gray-200"}  rounded-lg cursor-pointer`}
                            onClick={() => navigate(`/messenger/${chat._id}`)}
                        >
                            <div className='w-10 h-10'>
                                <img className='h-full w-full object-cover rounded-full'
                                    src={chat.avatar}
                                    alt=''
                                />                                
                            </div>
                            <div className='ml-3'>
                                <h1 className={`text-[15px] font-medium`}>
                                    {chat.name}
                                </h1>
                                {chat.firstMessage === null ? (
                                    <div className={`text-[13.5px] font-medium`}>
                                        Please send a message to {chat.name}.
                                    </div>
                                ) : (
                                    <div>
                                        {chat.firstMessage?.image !== null ? (
                                            <div className={`${chat.read === false ? "text-[13.5px] font-medium" : "text-[13.5px]"}`}>
                                                {chat.firstMessage?.senderId._id === user?.userId ? (
                                                    <p>
                                                        You have sent 1 photo to {chat.name}.
                                                    </p>
                                                ) : (
                                                    <p>
                                                        {chat.firstMessage?.senderId.username} have sent 1 photo to you.
                                                    </p>
                                                )}
                                            </div>
                                        ) : (
                                            <div
                                                className={`${chat.read === false ? "text-[13.5px] font-medium" : "text-[13.5px]"}`}
                                                style={{ 
                                                    maxWidth: '20vw', 
                                                    overflow: 'hidden', 
                                                    whiteSpace: 'nowrap', 
                                                    textOverflow: 'ellipsis',
                                                    display: 'block' // Đảm bảo rằng nó là block hoặc inline-block để xử lý ellipsis
                                                }}
                                            >
                                                {chat.firstMessage?.senderId._id === user?.userId ? (
                                                    <p style={{ display: 'inline', margin: 0 }}>
                                                        You: {chat.firstMessage?.text}
                                                    </p>
                                                ) : (
                                                    <p style={{ display: 'inline', margin: 0 }}>
                                                        {chat.firstMessage?.senderId.username}: {chat.firstMessage?.text}
                                                    </p>
                                                )}
                                            </div>

                                        )}
                                    </div>
                                )}
                            </div>
                        </div>                      
                    )
                })}
            </div>
        </div>
    )
}

export default GetChats