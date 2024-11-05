import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getAGroup } from '../../api/group/group';
import { useSelector } from 'react-redux';

const ViewGroup = () => {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const { groupId } = useParams();
    const navigate = useNavigate();

    const [group, setGroup] = useState({})

    const handleGetAGroup = async () => {
        try {
            const result = await getAGroup(user?.token, groupId)
            setGroup(result)
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
            handleGetAGroup()
        }
    },[])
  return (
    <div className=''>
        <div className='-mt-5 bg-white shadow rounded-xl mx-10 '>
            <div className='relative'>
                <img
                    className='w-full h-[60vh] object-cover rounded-xl shadow'
                    src={group?.avatar}
                    alt=''
                /> 
                {group?.createId === user?.userId && (
                    <div 
                        // onClick={() => setShowEditCover(true)}
                        className='absolute flex bottom-3 right-5 px-3 py-1.5 bg-white rounded-md shadow cursor-pointer hover:bg-gray-100'>
                        <img
                            src={require('../../assets/icons/camera-black.png')}
                            alt=''
                            className='w-5 h-5 mt-0.5 opacity-90 hover:opacity-100'
                        />   
                        <p className='font-medium ml-2'>
                            Edit cover photo    
                        </p> 
                    </div>                    
                )}
                
            </div>
            <div className='m-5'>
                <h1 className='text-[24px] font-bold mb-1'>
                    {group?.name}
                </h1>
                {group?.type === false ? (
                    <div className='flex'>
                        <div className='flex '>
                            <img className='w-3.5 h-3.5 opacity-60 mt-[3px]'
                                src={require('../../assets/icons/padlock.png')}
                                alt=''
                            />
                            <p className='ml-2 text-[15px] text-gray-600 mr-1'>
                                Private group
                            </p>
                            <p className='text-gray-500 font-medium'>
                                . {group?.members?.length} members
                            </p>                            
                        </div>
                        <div className='flex-1'></div>
                        <div className='mb-3 flex'>
                            <div className='bg-customBlue px-3 pr-4 py-1 text-white font-medium rounded-md cursor-pointer'>
                                + Invite
                            </div>
                            <div className='py-2 px-2 bg-gray-300 rounded-md ml-2 cursor-pointer'>
                                <img className='w-5 h-5'
                                    src={require('../../assets/icons/menu.png')}
                                    alt=''
                                />
                            </div>
                        </div>
                    </div>                    
                ) : (
                    <div className='flex'>
                        <img className='w-3.5 h-3.5 opacity-60 mt-[4px]'
                            src={require('../../assets/icons/earth.png')}
                            alt=''
                        />
                        <p className='ml-2 text-[15px] text-gray-600 mr-1'>
                            Public group
                        </p>
                        <p className='text-gray-500 font-medium'>
                            . {group?.members?.length} members
                        </p>
                        <div className='flex-1'></div>
                        <div className='mb-3 flex'>
                            <div className='bg-customBlue px-3 pr-4 py-1 text-white font-medium rounded-md cursor-pointer'>
                                + Invite
                            </div>
                            <div className='py-2 px-2 bg-gray-300 rounded-md ml-2 cursor-pointer'>
                                <img className='w-5 h-5'
                                    src={require('../../assets/icons/menu.png')}
                                    alt=''
                                />
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    </div>
  )
}

export default ViewGroup