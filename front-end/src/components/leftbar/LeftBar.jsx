import React from 'react'
import { useNavigate } from 'react-router-dom';

const LeftBar = ({profile}) => {
  const navigate = useNavigate();
  return (
    <div className='w-[22vw] -mt-3'>
      <div className='flex items-center cursor-pointer hover:bg-gray-200 px-2 py-2 w-full rounded-md'>
        <div className='h-9 w-9'>
          <img className='h-full w-full object-cover rounded-full hover:opacity-90'
            src={profile?.profilePicture}
            alt='avatar'
          />
        </div> 
        <p className='ml-3 font-medium'>
          {profile?.username}  
        </p>       
      </div>

      <div className='flex items-center cursor-pointer hover:bg-gray-200 px-2 py-2 rounded-md'
        onClick={() => navigate('/friends')}
      >
        <div className='h-9 w-9'
          style={{ backgroundPosition: '0px -333px', backgroundImage: `url(${require('../../assets/icons/media.png')})` }}
        >
        </div> 
        <p className='ml-3 font-medium'>
          Friends 
        </p>       
      </div>

      <div className='flex items-center cursor-pointer ml-px hover:bg-gray-200 px-2 py-2 rounded-md'>
        <div className='h-8 w-8'>
          <img className='h-full w-full object-cover rounded-full hover:opacity-90'
            src={require('../../assets/icons/mess.png')}
            alt='avatar'
          />
        </div> 
        <p className='ml-[15px] font-medium'>
          Messenger 
        </p>       
      </div>

      <div className='flex items-center cursor-pointer hover:bg-gray-200 px-2 py-2 rounded-md'
        onClick={() => navigate('/groups')}
      >
        <div className='h-9 w-9'
          style={{ backgroundPosition: '0px -37px', backgroundImage: `url(${require('../../assets/icons/media.png')})` }}
        >
        </div> 
        <p className='ml-3 font-medium'>
          Groups 
        </p>       
      </div>

    </div>
  )
}

export default LeftBar