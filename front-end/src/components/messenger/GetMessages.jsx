import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getAChat } from '../../api/chat/chat';
import { useSelector } from 'react-redux';

const GetMessages = () => {
  const { chatId } = useParams();
  const user = useSelector((state) => state.auth.login?.currentUser)
  const [chat, setChat] = useState({})

  console.log(chat)

  const handleGetAChat = async () => {
    const result = await getAChat(user?.token, chatId)
    setChat(result)
  }

  /* eslint-disable */
  useEffect(() => {
    if(user?.token) {
        handleGetAChat();
    }
  }, [chatId]);
  return (
    <div>
        <div className='flex items-center h-[7vh] min-h-14 bg-white border border-white shadow z-50'>
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
    </div>
  )
}

export default GetMessages