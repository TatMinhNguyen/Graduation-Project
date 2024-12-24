import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getReportGroups } from '../../api/admin/admin'

const GetGroupReported = () => {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const groups = useSelector((state) => state.admin.groups)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [showDetailReport, setShowDetail] = useState(false)
    const [showComfirm, setShowComfirm] = useState(false)

    const [showModal, setShowModal] = useState(null); 

    const handleGetGroups = async() => {
        try {
            await getReportGroups(user?.token, dispatch);
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
        }
    },[])
  return (
    <div>
        <div className='flex w-full h-[8vh] bg-white shadow items-center fixed z-10'>
            <h1 className='text-2xl font-bold ml-[5vw]'>
                Number of reported groups  ·
            </h1> 
            <p className='text-2xl font-bold ml-2 text-gray-500'>
                {groups?.length}
            </p>       
        </div>
        <div className='py-[9vh]'>
            {groups?.map((group) => (
                <div key={group._id}
                    className='flex items-center justify-center'
                >
                    <div className='w-2/3 bg-white border border-gray-100 shadow-sm rounded-md mb-3'>
                        <div className='border-b mx-3 py-2 text-gray-500'>
                            This group has been reported.
                            <span className='text-customBlue text-[13px] ml-2 border-b border-customBlue italic cursor-pointer hover:text-purple-700 hover:border-purple-700'
                                // onClick={()=> handleShowDetail(user)}
                            >
                                detail
                            </span>
                        </div> 
                        <div className='flex-1 flex items-center mx-3 my-2.5 '>
                            <div className='w-10 h-10 cursor-pointer'
                                // onClick={()=> handleGetUser(user._id)}
                            >
                                <img className='h-full w-full object-cover rounded-lg shadow'
                                    src={group?.avatar}
                                    alt=''
                                />
                            </div>  
                            <div className='ml-3 cursor-pointer'
                                // onClick={()=> handleGetUser(user._id)}
                            >
                                <h1 className='font-medium text-base'>
                                    {group?.name}
                                </h1>
                            </div> 
                            <div className='flex-1'></div>
                            <div>
                                <div className='flex items-center justify-center'>
                                    <button className='bg-customBlue hover:bg-blue-600 font-medium mr-2 w-1/2 py-1 pb-1.5 px-8 rounded-md text-white'
                                        // onClick={() => handleKeepPost(post.postId)}
                                    >
                                        Keep
                                    </button>
                                    <button className='bg-gray-200 hover:bg-gray-300 font-medium ml-2 w-1/2 py-1 pb-1.5 px-5 rounded-md'
                                        // onClick={() => handleShowComfirmDelete(post)}
                                    >
                                        Remove
                                    </button>
                                </div>                            
                            </div>                                                    
                        </div>

                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default GetGroupReported