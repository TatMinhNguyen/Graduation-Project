import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getAChat } from '../../api/chat/chat';
import { useSelector } from 'react-redux';
import InputEmoji from "react-input-emoji";

const GetMessages = () => {
  const { chatId } = useParams();
  const user = useSelector((state) => state.auth.login?.currentUser)
  const [chat, setChat] = useState({})

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
        <div className=" overflow-y-auto h-[73vh]">
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>3</div>
            <div>3</div>
            <div>3</div>
            <div>3</div>
            <div>3</div>
            <div>3</div>
            <div>3</div>
            <div>3</div>
            <div>3</div>
        </div>

        {/* Footer cố định */}
        <div className="fixed bottom-4 w-[calc(65vw-12px)] bg-white flex items-center z-10">
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