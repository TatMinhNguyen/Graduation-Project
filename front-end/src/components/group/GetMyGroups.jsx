import React, { useEffect, useState } from 'react'
import { cancelJoinGroup, getSuggestGroup, getUserGroups, joinGroup } from '../../api/group/group'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const GetMyGroups = () => {
    const user = useSelector((state) => state.auth.login?.currentUser)

    const navigate = useNavigate();
    const [groups, setGroups] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const [isClick, setIsClick] = useState({})

      const handleRequest = async(groupId) => {
        try {
            await joinGroup(user?.token, groupId)
            setIsClick(prev => ({
                ...prev,
                [groupId]: true
            }));
        } catch (error) {
            console.log(error)
        }
    }

    const handleCancelRequest = async(groupId) => {
        try {
            await cancelJoinGroup(user?.token, groupId)
            setIsClick(prev => ({
                ...prev,
                [groupId]: false
            }));
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetGroups = async() => {
        try {
            const res = await getUserGroups(user?.token)
            setGroups(res)
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetSuggest = async() => {
        try {
            const res = await getSuggestGroup(user?.token)
            setSuggestions(res)
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
            handleGetGroups()
            if(groups?.length <= 0) {
               handleGetSuggest() 
            }
        }
    },[])
    return (
        <div className='py-2 px-10'>
            <h1 className='text-[18px] font-medium mb-2'>
                All groups you've joined
            </h1> 
            {groups?.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                {groups?.map((group) => (
                    <div key={group._id} className="border bg-white rounded-lg pb-2">
                    <img src={group.avatar} alt='' 
                        className="w-full h-[30vh] cursor-pointer object-cover rounded-t-md hover:opacity-90" 
                        // onClick={() => handleGetProfile(group._id)}
                    />
                    <div className='mt-2 px-3'>
                        <h2 className="text-[17px] font-medium cursor-pointer hover:text-gray-700" 
                        // onClick={() => handleGetProfile(group._id)}
                        >{group.username}</h2>
                        <p className="text-sm text-gray-500">{group.mutualgroups} mutual groups</p>              
                    </div>
                    <div className="mt-4 px-3 flex flex-col space-y-1.5">
                        <button className="bg-blue-100 hover:bg-blue-200 text-customBlue font-medium py-2 px-4 rounded-lg"
                        // onClick={() => handleGetProfile(group._id)}
                        >View profile</button>
                    </div>
                    </div>
                ))}
                </div>        
            ) : (
                <div>
                    <div className='flex-1 flex items-center justify-center text-lg font-medium text-gray-500'>You have no groups</div>
                    <h1 className='text-[18px] font-medium mb-2'>
                        Suggestions
                    </h1>
                    <div className="grid grid-cols-3 gap-4">
                        {suggestions?.map((group) => (
                            <div key={group._id} className="border bg-white rounded-lg pb-2 flex flex-col justify-between h-full">
                                <img src={group.avatar} alt='' 
                                    className="w-full h-[30vh] cursor-pointer object-cover rounded-t-md hover:opacity-90" 
                                // onClick={() => handleGetProfile(group._id)}
                                />
                                <div className='mt-2 px-3'>
                                    <h2 className="text-[17px] font-medium cursor-pointer hover:text-gray-700"
                                        // onClick={() => handleGetProfile(group._id)}
                                    >{group.name}</h2>
                                    <p className="text-sm text-gray-500">{group.members.length} members</p>              
                                </div>
                                <div className="mt-4 px-3 flex flex-col space-y-1.5">
                                    {!isClick[group?._id] ? (
                                        <button className="bg-blue-100 hover:bg-blue-200 text-customBlue font-medium py-2 px-4 rounded-lg"
                                        // onClick={() => handleRequest(group._id)}
                                        >
                                            Join group
                                        </button>
                                    ) : (
                                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4 rounded-lg"
                                        // onClick={() => handleCancelRequest(group._id)}
                                        >
                                            Cancel request
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div> 
                </div>
            )}       
        </div>
    )
}

export default GetMyGroups