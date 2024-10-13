import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserChat } from '../../api/chat/chat'

const GetChats = () => {
    const chats = useSelector((state) => state.chat.chats)
    const user = useSelector((state) => state.auth.login?.currentUser)

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
                <div className='bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-gray-200 mr-2'>
                    <img className='w-4 h-4'
                        src={require('../../assets/icons/plus.png')}
                        alt=''
                    />                
                </div>
            </div>
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
                            className='flex items-center p-2 py-2.5 hover:bg-gray-100 rounded-lg cursor-pointer'
                        >
                            <div className='w-11 h-11'>
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
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default GetChats