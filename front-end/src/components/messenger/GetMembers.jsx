import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getMembers } from '../../api/chat/chat'
import AddMembers from './AddMembers'

const GetMembers = ({chatId, createId, isCloseModal}) => {
    const user = useSelector((state) => state.auth.login?.currentUser)

    const [members, setMembers] = useState([])
    const [showAddMembers, setShowAddMembers] = useState(false)

    const handleShowAddMembers = ()  => {
        setShowAddMembers(true);
    }
    
     const handleGetMembers = async () => {
        try {
            const res = await getMembers(user?.token, chatId)
            setMembers(res)
        } catch (error) {
            console.log(error)
        }
    }

      /* eslint-disable */
    useEffect(() => {
        if(user?.token) {
            handleGetMembers();
        }
    }, [chatId]);
    return (
        <div className=''>
            {members?.map((member) => (
                <div key={member._id}
                    className='mx-6 mb-3 flex-1 flex items-center'
                >
                    <div className='w-9 h-9'>
                        <img className='h-full w-full object-cover rounded-full'
                            src={member.profilePicture}
                            alt=''
                        />                                
                    </div>
                    <div className='ml-2'>
                        <h3 className='font-medium text-[15px]'>
                            {member.username}
                        </h3>
                        {createId === member._id && (
                            <p className='text-[12px]'>
                                Admin
                            </p>
                        )}
                    </div>
                    <div className='flex-1'></div>
                    <div className='p-1.5 hover:bg-gray-200 rounded-full cursor-pointer'>
                        <img className='w-5 h-5'
                            src={require("../../assets/icons/menu.png")}
                            alt=''
                        />
                    </div>
                </div>
            ))}
            <div className='m-3 py-1 px-3 flex items-center hover:bg-gray-100 rounded-md cursor-pointer'
                onClick={handleShowAddMembers}
            >
                <div className='w-9 h-9 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer'>
                    <img className='w-5 h-5'
                        src={require("../../assets/icons/invite.png")}
                        alt=''
                    />
                </div> 
                <p className='ml-2 font-medium text-[15px]'>
                    Add people
                </p>
            </div>
            {showAddMembers && (
                <AddMembers
                    chatId={chatId}
                    onCloseModal={() => setShowAddMembers(false)}
                    isCloseModal={() => isCloseModal()}
                />
            )}
        </div>
    )
}

export default GetMembers