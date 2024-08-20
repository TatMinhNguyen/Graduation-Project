import React, { useEffect, useState } from 'react'
import { getSuggestions } from '../../../api/friends/friends';
import { useNavigate } from 'react-router-dom';

const GetSuggestions = ({user}) => {
    const [data, setData] = useState([])
    // console.log(data)

    const navigation = useNavigate();

    const handleGetSuggestionFriends = async() =>{
        try {
            const result = await getSuggestions(user?.token)
            setData(result)
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetUser = async(userId) => {
        navigation(`/get-profile/${userId}`)
    }

    /* eslint-disable */
    useEffect(() => {
        handleGetSuggestionFriends();
    },[])
    return (
        <div>
            {data?.map((friend) => {
                return (
                    <div key={friend?._id} className='flex-1 flex items-center justify-center'>
                        <div className='w-11/12 flex bg-white border border-gray-100 shadow-sm rounded-md mb-3'>
                            <div onClick={() => handleGetUser(friend?._id)} 
                                className='flex mx-3 my-2 cursor-pointer'>
                                <div className='w-10 h-10'>
                                    <img className='h-full w-full object-cover rounded-full shadow'
                                        src= {friend?.profilePicture}
                                        alt=''
                                    />
                                </div>
                                <div className='ml-3'>
                                    <h1 className='font-medium text-base'>
                                        {friend?.username}
                                    </h1>
                                    <p className='text-xs text-gray-500'>
                                        {friend?.mutualFriends} mutual friends
                                    </p>
                                </div>
                            </div>  
                            <div className='flex-1'></div>
                            <div className='flex items-center'>
                                <div className='mr-3 cursor-pointer bg-customBlue py-1.5 px-6 rounded-md'>
                                    <p className='text-white font-medium text-sm'>
                                        Add friend
                                    </p>
                                </div>                                
                            </div>                     
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default GetSuggestions