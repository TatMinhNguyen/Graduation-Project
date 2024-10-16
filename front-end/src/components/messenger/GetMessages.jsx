import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getAChat, getMess } from '../../api/chat/chat';
import { useDispatch, useSelector } from 'react-redux';
import InputEmoji from "react-input-emoji";
import { timeAgoShort } from '../../utils';

const GetMessages = () => {
  const { chatId } = useParams();
  const user = useSelector((state) => state.auth.login?.currentUser)
  const messages = useSelector((state) => state.chat.messages)
  const [chat, setChat] = useState({})
//   const [messages, setMessages] = useState([])
//   console.log(messages)

  const [params, setParams] = useState({
    page: 1,
    index: 10,
  })

  const dispatch = useDispatch();

  const handleGetAChat = async () => {
    const result = await getAChat(user?.token, chatId)
    setChat(result)
  }

  const handleGetMess = async () => {
    await getMess(user?.token, chatId, params, dispatch)
    // setMessages([...messages, ...result]);
  }

  /* eslint-disable */
  useEffect(() => {
    if(user?.token) {
        handleGetAChat();
        handleGetMess();
    }
  }, [chatId]);
  return (
    <div className="relative flex flex-col ">
        {/* Header cố định */}
        <div className='fixed w-[calc(65vw-12px)] flex items-center h-[7vh] min-h-14 bg-white rounded-t-lg border border-white shadow z-10'>
            <div className='w-10 h-10 ml-3'>
                <img className='h-full w-full object-cover rounded-full'
                    src={chat.avatar}
                    alt=''
                />                                
            </div>
            <div className='ml-3'>
                <h1 className='font-medium text-[16px]'>
                    {chat.name}
                </h1>
            </div>
            <div className='flex-1'></div>
            <div className='p-1.5 hover:bg-gray-100 rounded-full mr-2'>
                <img className='h-5 w-5 object-cover rounded-full'
                    src={require('../../assets/icons/call.png')}
                    alt=''
                />  
            </div>   
            <div className='p-1.5 hover:bg-gray-100 rounded-full mr-3'>
                <img className='h-5 w-5 object-cover rounded-full'
                    src={require('../../assets/icons/option.png')}
                    alt=''
                />  
            </div>        
        </div>

        {/* Khoảng trống bù để nội dung không bị che bởi header */}
        <div className="h-[8vh]"></div>

        {/* Nội dung chat cuộn */}
        <div className=" overflow-y-auto h-[73vh] flex flex-col-reverse px-3">
            {messages?.map((message) => (
                <div key={message._id}
                    className={`flex ${message.senderId._id === user?.userId ? 'justify-end' : 'justify-start'} mb-2`}
                >
                    {message.senderId._id === user?.userId ? (
                        <div className=' '>
                            <div>
                                <div className='pb-1.5 pt-1 px-1.5 rounded-tl-lg rounded-tr-lg rounded-bl-lg max-w-xs bg-purple-600 text-white'>
                                    <p className=''>
                                        {message.text}
                                    </p>
                                
                                </div>
                                <p className='text-[10px] text-gray-800 mr-1 flex justify-end'>
                                    {timeAgoShort(message.createdAt)}
                                </p>                                
                            </div>
                        </div>
                    ):(
                        <div className='flex-1 flex items-center'>
                            <div className='h-9 w-9 mr-2'>
                                <img className='h-full w-full object-cover rounded-full hover:opacity-90'
                                    src={message.senderId.profilePicture}
                                    alt=''
                                />
                            </div>
                            <div>
                                <div className='pb-1.5 pt-1 px-1.5 rounded-tl-lg rounded-tr-lg rounded-br-lg rounded- max-w-xs bg-gray-200 text-black'>
                                    <p className=''>
                                        {message.text}
                                    </p>
                                
                                </div>
                                <p className='text-[10px] text-gray-800 ml-1'>
                                    {timeAgoShort(message.createdAt)}
                                </p>                                
                            </div>
                             
                        </div>
                    )}
                </div>
            ))}
        </div>

        {/* Footer cố định */}
        <div className="fixed bottom-4 w-[calc(65vw-12px)] bg-white flex items-center z-10 px-2">
            <div>+</div>
            <InputEmoji
                // value={newMessage}
                // onChange={handleChange}
            />
            <div className="send-button button">
                Send
            </div>
        </div>
    </div>
  )
}

export default GetMessages