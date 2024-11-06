import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getAGroup } from '../../api/group/group';
import { useSelector } from 'react-redux';
import { formatToMonthYear } from '../../utils';

const ViewGroup = () => {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const { groupId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

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
    <div className='mx-10'>
        <div className='-mt-5 bg-white shadow rounded-xl'>
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
            <div className='m-5 mb-2'>
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
                            <div className='bg-customBlue hover:bg-blue-600 px-3 pr-4 py-1 pt-[5.5px] text-white font-medium rounded-md cursor-pointer'>
                                + Invite
                            </div>
                            <div className='py-2 px-2 bg-gray-200 hover:bg-gray-300 rounded-md ml-2 cursor-pointer'>
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
                            <div className='bg-customBlue px-3 pr-4 py-1 pt-[5.5px] rounded-md cursor-pointer'>
                                <p className='text-white font-medium'>
                                    + Invite
                                </p>
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
        <div className='mt-4 flex '>
            <div className='w-3/5 mr-2'>
                <div className='flex bg-white border border-white shadow rounded-md mb-3'>
                    <div className='w-1/2  flex-1 flex items-center justify-center '
                            onClick={() => navigate(`/groups/${groupId}`)}
                    >
                        <p className={`text-lg font-bold font-mono mt-2 cursor-pointer ${location.pathname === `/groups/${groupId}` ? 'border-b-4 border-b-customBlue pb-1' : 'pb-2'}`}>
                            Posts
                        </p>                                
                    </div>
                    <div className='w-1/2 flex-1 flex items-center justify-center r'
                            onClick={() => navigate(`/groups/${groupId}/members`)}
                    >
                        <p className={`text-lg font-bold font-mono mt-2 cursor-pointer ${location.pathname === `/groups/${groupId}/members` ? 'border-b-4 border-b-customBlue pb-1' : 'pb-2'}`}>
                            Members
                        </p>                                
                    </div>
                </div>
                <Outlet context={group}/>
            </div>
            <div className='w-2/5 bg-white ml-2 border border-white shadow rounded-md self-start mb-2'>
                <p className='text-xl font-bold font-sans m-2 ml-4 mb-5'>
                    About  
                </p>
                {group?.type === false ? (
                    <div className='flex mx-4'>
                        <img
                            src={require('../../assets/icons/padlock.png')}
                            alt=''
                            className='w-4 h-4 mt-0.5 opacity-90 mt-1'
                        />
                        <div className='ml-3'>
                            <h1 className='font-medium text-[16.5px]'>
                               Private 
                            </h1> 
                            <p className='text-[15px] ml-px'>
                                Only members can see who's in the group and what they post
                            </p>                            
                        </div>
                               
                    </div>                    
                ) : (
                    <div className='flex mx-4'>
                        <img
                            src={require('../../assets/icons/earth.png')}
                            alt=''
                            className='w-5 h-5 mt-0.5 opacity-90 mt-1'
                        />  
                        <div className='ml-3'>
                            <h1 className='font-medium text-[16.5px]'>
                               Public 
                            </h1> 
                            <p className='ml-px text-[15px]'>
                                Anyone can see who's in the group and what they post
                            </p>                                
                        </div>                                           
                    </div> 
                )}

                <div className='flex ml-4 my-3'>
                    <img
                        src={require('../../assets/icons/visibility.png')}
                        alt=''
                        className='w-5 h-5 mt-0.5'
                    />
                    <div className='ml-3'>
                        <h1 className='font-medium text-[16.5px]'>
                            Visible
                        </h1>
                        <p className='ml-px text-[15px]'>
                            Anyone can find this group
                        </p>                        
                    </div>

                </div>
                <div className='flex ml-4 my-3'>
                    <img
                        src={require('../../assets/icons/clock1.png')}
                        alt=''
                        className='w-5 h-5 mt-0.5'
                    />
                    <p className='ml-3 text-gray-900'>
                        Created {formatToMonthYear(group?.createdAt)} 
                    </p>
                </div>
            </div>            
        </div>
    </div>
  )
}

export default ViewGroup