import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { addMess, getAChat, getMess, getUserChat } from '../../api/chat/chat';
import { useDispatch, useSelector } from 'react-redux';
import InputEmoji from "react-input-emoji";
import { timeAgoShort } from '../../utils';
import LoadingSpinner from '../spinner/LoadingSpinner';
import socket from '../../socket';

const GetMessages = () => {
  const { chatId } = useParams();
  const imageInputRef = useRef(null);
  const loadMoreTopRef = useRef(null);
  const user = useSelector((state) => state.auth.login?.currentUser)
  const messages = useSelector((state) => state.chat.messages)
  const [chat, setChat] = useState({})
  const [newMessages, setMessages] = useState('')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)

  const [params, setParams] = useState({
    page: 1,
    index: 20,
  })

  const dispatch = useDispatch();

  /* eslint-disable */
  useEffect(() => {
    socket.on('send-message', (message) => {
    //   console.log('newMess: ', message);
      handleGetMess(); // Gọi lại hàm để lấy tin nhắn mới
    });
  
    // Hủy sự kiện khi component unmount
    return () => {
      socket.off('send-message');
    };
  }, []);  

  const handleImageClick = (e) => {
    e.preventDefault();
    imageInputRef.current.click();
};

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];       

    if(selectedImage){
        setImage(selectedImage);
        const ImageUrl = URL.createObjectURL(selectedImage);
        setImagePreview(ImageUrl);            
    }

    if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
    }
  };

  const handleDeletePreView = () => {
    setImage(null);
    setImagePreview(null)
    URL.revokeObjectURL(imagePreview);
  }

  const handleAddMessage = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
        const formData = new FormData();

        formData.append('chatId', chatId)

        if(newMessages) {
            formData.append('text', newMessages)
        }

        if(image) {
            formData.append('image', image)
        }

        await addMess(user?.token, formData)

        setImage(null)
        setMessages('')
        setImagePreview(null)

        handleGetMess();
        await getUserChat(user?.token, dispatch)

    } catch (error) {
        console.log(error)
    } finally {
        // Giải phóng các URL sau khi không cần sử dụng nữa
        URL.revokeObjectURL(imagePreview);
        setLoading(false)
      }
  }

  const handleGetAChat = async () => {
    const result = await getAChat(user?.token, chatId)
    setChat(result)
  }

  const handleGetMess = async () => {
    try {
        await getMess(user?.token, chatId, params, dispatch);
    } catch (error) {
        console.error('Errors:', error);
      }
    
};


  const handleScroll = (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setParams((prevParams) => ({
        ...prevParams,
        index: prevParams.index + 20,
      }));
    }
};

  
  /* eslint-disable */
  useEffect(() => {
    if (!loadMoreTopRef.current) return;
  
    const observer = new IntersectionObserver((entries) => {
      handleScroll(entries); // Truyền entries vào handleScroll
    });
  
    observer.observe(loadMoreTopRef.current);
  
    return () => observer.disconnect(); // Ngắt kết nối observer khi component bị unmount
  }, []); 


  /* eslint-disable */
  useEffect(() => {
    if(user?.token) {
        handleGetAChat();
        handleGetMess();
    }
  }, [chatId, params]);
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
        <div className="h-[7.5vh]"></div>

        {/* Nội dung chat cuộn */}
        <div className=" overflow-y-auto h-[73vh] flex flex-col-reverse px-3 pt-2">
            {messages?.map((message) => (
                <div key={message._id}
                    className={`flex ${message.senderId._id === user?.userId ? 'justify-end' : 'justify-start'} mb-2`}
                >
                    {message.senderId._id === user?.userId ? (
                        <div className=' '>
                            <div>
                                {message.image !== null && (
                                    <div className='mb-1'>
                                        <img className='max-w-xs max-h-[350px] rounded-lg'
                                            src={message.image.url}
                                            alt=''
                                        />                                        
                                    </div>
                                )}
                                {message.text !== '' && (
                                    <div className='pb-1.5 pt-1.5 px-1.5 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl max-w-xs bg-purple-500 text-white w-fit ml-auto'>
                                        <p className='text-[15px]'>
                                            {message.text}
                                        </p>
                                    
                                    </div>                                    
                                )}
                                <p className='text-[10px] text-gray-800 mr-1 flex justify-end'>
                                    {timeAgoShort(message.createdAt)}
                                </p>                                
                            </div>
                        </div>
                    ):(
                        <div>
                            {chat?.members?.length > 2 && (
                                <div className='ml-11 mb-px'>
                                    <p className='text-[12px]'>
                                        {message.senderId.username}
                                    </p>
                                </div>
                            )}
                            <div className='flex'>
                                <div className='h-9 w-9'>
                                    <img className='h-full w-full object-cover rounded-full hover:opacity-90'
                                        src={message.senderId.profilePicture}
                                        alt=''
                                    />
                                </div>
                                <div className='ml-2'>
                                    {message.image !== null && (
                                        <div className='mb-1'>
                                            <img className='max-w-xs max-h-[350px] rounded-lg'
                                                src={message.image.url}
                                                alt=''
                                            />                                        
                                        </div>
                                    )}
                                    {message.text !== '' && (
                                        <div className='pb-1.5 pt-1.5 pr-3 pl-2 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl max-w-xs bg-gray-200 text-black inline-block'>
                                            <p className='text-[15px]'>
                                                {message.text}
                                            </p>
                                        
                                        </div>                                    
                                    )}
                                    <p className='text-[10px] text-gray-800 ml-1'>
                                        {timeAgoShort(message.createdAt)}
                                    </p>                                
                                </div>
                                
                            </div>                        
                        </div>

                    )}
                </div>
            ))}
            <div ref={loadMoreTopRef} style={{ height: '0px' }} />
        </div>

        {/* Footer cố định */}
        <form className="fixed bottom-4 w-[calc(65vw-12px)] bg-white flex items-center z-10 px-2"
            onSubmit={handleAddMessage}
        >
            <button className='w-10 h-9 flex items-center justify-center'
                onClick={handleImageClick}
            >
                <img className='w-7 h-7'
                    src={require("../../assets/icons/image.png")}
                    alt=''
                />
            </button>
            {/* Hidden inputs */}
            <input 
                type="file" 
                accept="image/*" 
                ref={imageInputRef} 
                style={{ display: 'none' }} 
                onChange={handleImageChange} 
            /> 
            <InputEmoji
                value={newMessages}
                onChange={setMessages}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault(); // Ngăn việc thêm dòng mới
                        handleAddMessage(e);
                    }
                }}
            />
            {loading ? (
                <div>
                    <LoadingSpinner/>
                </div>
            ) : (
                <>
                    {newMessages !== '' || image ? (
                        <button type='submit'>
                            <img className='w-6 h-6'
                                src={require('../../assets/icons/send-blue.png')}
                                alt=''
                            />
                        </button>
                    ) : (
                        <img className='w-6 h-6'
                            src={require('../../assets/icons/send-gray.png')}
                            alt=''
                        />
                    )}                
                </>
            )}

        </form>
    </div>
  )
}

export default GetMessages