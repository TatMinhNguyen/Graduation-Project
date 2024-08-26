import React from 'react'
import { convertNewlinesToBreaks, timeAgo} from '../../utils'
import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgZoom from 'lightgallery/plugins/zoom';

export const Comment = ({comments}) => {
  const onInit = () => {
    // console.log('lightGallery has been initialized');
  };
  return (
    <div className=''>
      {comments?.map((comment) => {
        return(
          <div className='px-4 py-2 flex w-full '>
            <div className='h-9 w-9 mr-3 mt-2'>
                <img className='h-full w-full object-cover rounded-full shadow'
                    src={comment?.author?.authorAvatar}
                    alt=''
                />
            </div>
            {comment?.image === null || !comment?.image ? (
              <div className='max-w-[calc(100%-5rem)]'>
                <div className='bg-gray-100 px-2 py-1 rounded-xl'>
                  <div className='flex px-1'>
                    <h2 className=' font-semibold'>
                      {comment?.author?.authorName}
                    </h2> 
                  </div>
                  <p className='pb-0 px-1'>
                    {convertNewlinesToBreaks(comment?.content)}
                  </p>               
                </div>
                <div>
                  <p className='text-xs text-gray-500 px-3 mt-0.5'>
                      {timeAgo(comment?.createdAt)}
                  </p>                   
                </div>           
              </div>
            ) : (
              <div className='max-w-[calc(100%-5rem)]'>
                <div className=''>
                  <div className='flex px-1'>
                    <h2 className=' font-semibold'>
                      {comment?.author?.authorName}
                    </h2> 
                  </div>
                  <p className='pb-0 px-1'>
                    {convertNewlinesToBreaks(comment?.content)}
                  </p>
                  <div className='w-1/2 flex ml-1'>
                    <LightGallery
                      onInit={onInit}
                      speed={500}
                      plugins={[lgZoom]}
                      elementClassNames="flex h-full w-full"
                    >
                      <img className='h-full w-full object-cover rounded-lg cursor-pointer'
                          src={comment?.image?.url}
                          alt=''
                      /> 
                     </LightGallery>            
                  </div>                
                </div>
                <div>
                    <p className='text-xs text-gray-500 px-3 mt-0.5'>
                      {timeAgo(comment?.createdAt)}
                    </p>                   
                </div>           

              </div>
            )}
            <div className='flex-1'></div>
            <div className='hover:bg-gray-200 h-7 w-7 rounded-full flex items-center justify-center cursor-pointer'>
              <img className='w-5 h-5'
                src={require('../../assets/icons/menu.png')}
                alt=''
              />
            </div>
     
          </div>
        )
      })}
    </div>
  )
}
