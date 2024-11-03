import React, { useState } from 'react'
import NavBar from '../../components/navbar/NavBar'
import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const Group = () => {
  const user = useSelector((state) => state.auth.login?.currentUser)

  const location = useLocation();
  const navigate = useNavigate();

  const [showGroupsManage, setShowGroupsManage] = useState(false)
  const [showGroupsJoined, setShowGroupsJoined] = useState(false)

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='fixed top-0 w-full z-50'>
        <NavBar
          user={user}
        />
      </div>
      <div className='h-full pt-16 flex'>
        <div className='w-1/4 bg-white fixed h-full -mt-3 shadow-2xl px-2 py-4'>
            <h1 className='font-bold text-2xl ml-1 pb-3'>
                Groups
            </h1>
            <div className='w-full px-1 mb-4'>
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
                        placeholder='Search groups'
                        // value={searchInput}
                        // onChange={(e) => setSearchInput(e.target.value)}
                        className='flex-grow w-full pl-3 pr-1 py-1.5 mb-0.5 rounded-3xl bg-gray-100 overflow-hidden
                                    focus:outline-none'
                    />
                </form>
            </div>
            <div>
                <div className={`flex-1 flex items-center p-2 ${location.pathname === `/groups` ? 'bg-blue-100' : 'hover:bg-gray-100'}  rounded-md mt-0.5 cursor-pointer`}
                    onClick={() => navigate('/groups')}
                >
                    {location.pathname === `/groups` ? (
                        <div className='p-2 rounded-full bg-customBlue'>  
                            <img
                                src={require('../../assets/icons/groups-defaut.png')}
                                alt=''
                                className='w-5 h-5'
                            />
                        </div>
                    ) : (
                        <div className='p-2 rounded-full bg-gray-300'>  
                            <img
                                src={require('../../assets/icons/groups.png')}
                                alt=''
                                className='w-5 h-5'
                            />
                        </div>
                    )}
                    <p className='font-medium ml-3'>Your groups</p>
                </div>
                <div className={`flex-1 flex items-center p-2 ${location.pathname === `/groups/discover` ? 'bg-blue-100' : 'hover:bg-gray-100'}  rounded-md mt-0.5 cursor-pointer`}
                    onClick={() => navigate('/groups/discover')}
                >
                    {location.pathname === `/groups/discover` ? (
                        <div className='p-2 rounded-full bg-customBlue'>  
                            <img
                                src={require('../../assets/icons/compass-defaut.png')}
                                alt=''
                                className='w-5 h-5'
                            />
                        </div>
                    ) : (
                        <div className='p-2 rounded-full bg-gray-300'>  
                            <img
                                src={require('../../assets/icons/compass.png')}
                                alt=''
                                className='w-5 h-5'
                            />
                        </div>
                    )}
                    <p className='font-medium ml-3'>Discover</p>
                </div>
            </div>
            <div className='flex justify-center py-2 pb-3 border-b border-gray-300'>
                <button className='bg-blue-50 text-customBlue w-full hover:bg-blue-100 py-1 rounded-md'>
                    + Create new group
                </button>                
            </div>
            <div className='mt-2'>
                <div className='flex-1 flex items-center px-2 hover:bg-gray-100 rounded-md py-1 pb-1 cursor-pointer mt-1'
                    onClick={() => setShowGroupsManage(!showGroupsManage)}
                >
                    <p className='font-medium text-[16px] mb-0.5'>
                        Groups you manage
                    </p>
                    <div className='flex-1'></div>
                    {showGroupsManage ? (
                        <img className='h-3.5 w-3.5'
                            src={require("../../assets/icons/bot-arrow.png")}
                            alt=''
                        />
                    ) : (
                        <img className='h-3.5 w-3.5'
                            src={require("../../assets/icons/right-arrow.png")}
                            alt=''
                        />
                    )}
                </div> 
                <div className='flex-1 flex items-center px-2 hover:bg-gray-100 rounded-md py-1 pb-1 cursor-pointer mt-1'
                    onClick={() => setShowGroupsJoined(!showGroupsJoined)}
                >
                    <p className='font-medium text-[16px] mb-0.5'>
                        Groups you've joined
                    </p>
                    <div className='flex-1'></div>
                    {showGroupsJoined ? (
                        <img className='h-3.5 w-3.5'
                            src={require("../../assets/icons/bot-arrow.png")}
                            alt=''
                        />
                    ) : (
                        <img className='h-3.5 w-3.5'
                            src={require("../../assets/icons/right-arrow.png")}
                            alt=''
                        />
                    )}
                </div>                 
            </div>
        </div>
        <div className='flex-1'></div>
        <div className='w-3/4'>
            <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Group