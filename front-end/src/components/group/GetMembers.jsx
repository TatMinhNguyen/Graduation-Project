import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { getMembers } from '../../api/group/group';

const GetMembers = () => {
  const user = useSelector((state) => state.auth.login?.currentUser) 
  const { groupId } = useParams();

  const group = useOutletContext()

  const navigate = useNavigate();

  const [members, setMemberes] = useState([])

  const handleGetMemberes = async() => {
    try {
      const result = await getMembers(user?.token, groupId)
      setMemberes(result)
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
        handleGetMemberes()
    }
  },[])
  return (
    <div className='bg-white pt-3 rounded-md shadow mb-3'>
      {members?.map((member) => (
        <div key={member._id} className='flex-1 flex items-center justify-center'>
          <div className='w-11/12 flex bg-white border border-gray-100 shadow-sm rounded-md mb-3'>
            <div 
                className='flex-1 flex items-center mx-3 my-2 cursor-pointer'>
                <div className='w-10 h-10'>
                    <img className='h-full w-full object-cover rounded-full shadow'
                        src={member?.profilePicture}
                        alt=''
                    />
                </div>
                <div className='ml-3'>
                    <h1 className='font-medium text-base'>
                        {member?.username}
                    </h1>
                    {member._id === group?.createId && (
                      <p className='text-xs text-customBlue bg-blue-50 w-fit px-1 py-0.5 pb-[3px] rounded-md'>
                        Admin
                      </p>                      
                    )}
                </div>
                <div className='flex-1'></div>
                <div className='mr-1 cursor-pointer flex items-center hover:bg-gray-200 p-1 rounded-full' 
                  // onClick={(e) => handleThreeDotsClick(e, friend)}
                >
                    <img className='w-6 h-6'
                        src={require('../../assets/icons/menu.png')}
                        alt=""
                    />
                </div> 
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GetMembers