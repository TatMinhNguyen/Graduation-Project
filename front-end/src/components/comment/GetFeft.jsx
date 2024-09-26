import React, { useEffect, useState } from 'react'
import { getFelt } from '../../api/reaction/reaction'
import { useSelector } from 'react-redux'

const GetFeft = ({isCloseModal , postId}) => {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const myProfile = useSelector((state) => state?.auth?.profile)

    console.log(user?.userId)
    const [data, setData] = useState([])
    console.log(data)

    const handleCloseModal = () => {
        isCloseModal()
    }

    const handleGetFeft = async() => {
        try {
            const result = await getFelt(user?.token, postId)
            setData(result)
        } catch (error) {
            console.log(error)
        }
    }

    /* eslint-disable */
    useEffect(()=> {
        handleGetFeft()
    },[])
    return (
        <div className="fixed inset-0 bg-opacity-75 bg-gray-800 flex items-center justify-center z-50">
            <div className='bg-white rounded-lg shadow-md w-full max-w-lg max-h-[70vh]'>
                <div className='flex justify-between items-center p-4'>
                    <div className='flex'>
                        <button className='font-medium text-gray-600 px-4'>
                            All
                        </button>
                        <button className='px-4'>
                            <img
                                src={require('../../assets/icons/like-blue1.png')}
                                alt=''
                                className='w-6 h-6 rounded-full'
                            />
                        </button>
                        <button className='px-4'>
                            <img
                                src={require('../../assets/icons/love.png')}
                                alt=''
                                className='w-6 h-6 rounded-full'
                            />
                        </button>
                        <button className='px-4'>
                            <img
                                src={require('../../assets/icons/haha.png')}
                                alt=''
                                className='w-6 h-6 rounded-full'
                            />
                        </button>
                        <button className='px-4'>
                            <img
                                src={require('../../assets/icons/sad.png')}
                                alt=''
                                className='w-6 h-6 rounded-full'
                            />
                        </button>
                    </div>
                    <button onClick={handleCloseModal} 
                        className="w-8 h-8  bg-gray-200 rounded-full hover:bg-gray-300 flex items-center justify-center">
                        <img  
                            src={require('../../assets/icons/close.png')}
                            alt='Close'
                            className='w-5 h-5'
                        />
                    </button>                    
                </div>
                <div className='mb-2'>
                    {data?.map((user) => {
                        return (
                            <div key={user?.feelId} className='bg-white my- p-0.5 border border-white flex-1 items-center'>
                                <div className=' flex-1 flex items-center'>
                                    <div className='flex mx-3 my-2'>
                                        <div className='w-10 h-10'>
                                            <img className='h-full w-full object-cover rounded-full shadow hover:opacity-90'
                                                src= {user?.author?.authorAvatar}
                                                alt=''
                                            />
                                        </div>
                                        <div className='ml-3'>
                                            <h1 className='font-medium text-[15px]'>
                                                {user?.author?.authorName}
                                            </h1>
                                            {myProfile?.friends?.includes(user?.author?.authorId) && (
                                                <div className='text-sm text-gray-500'>
                                                    Friend.
                                                </div>
                                            )}
                                            <p className='text-sm text-gray-500'>
                                                {user?.mutualFriendsCount} mutual friends
                                            </p>                                            
                                        </div>
                                    </div> 
                                    <div className='flex-1'></div>
                                    <div className='py-1.5 px-3 bg-blue-100 rounded-md cursor-pointer mr-1 hover:bg-blue-200'
                                        // onClick={() => handleGetUser(user?.userId)}
                                    >
                                    <p className='text-customBlue font-medium text-[15px]'>
                                        View profile
                                    </p>
                                    </div>                   
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default GetFeft