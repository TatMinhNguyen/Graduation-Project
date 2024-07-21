import React, { useState } from 'react';
import ReactPlayer from 'react-player';

export const VideoPlayer4 = ({url, selectedImages}) => {
    // eslint-disable-next-line
    const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 });
    const [isWidthLarger, setIsWidthLarger] = useState(true);
  
    const handleReady = (player) => {
      const internalPlayer = player.getInternalPlayer();
      const videoWidth = internalPlayer.videoWidth;
      const videoHeight = internalPlayer.videoHeight;
  
      setVideoDimensions({ width: videoWidth, height: videoHeight });
      setIsWidthLarger(videoWidth > videoHeight);
    };
  
    return (
        <div className={`${isWidthLarger ? '' : 'flex'} overflow-hidden`}>
            <div className={`${isWidthLarger ? 'w-full mb-0.5 flex-1 flex items-center justify-center bg-gray-700' 
                                             : 'w-3/5 object-cover h-[70vh] bg-gray-700'} `}>
                <ReactPlayer
                    url={url}
                    controls={true}
                    width={isWidthLarger ? '70%' : '100%'}
                    height={isWidthLarger ? '100%' : '100%'}
                    onReady={handleReady}
                />
            </div>   
            {!isWidthLarger ? (
                <div className= {`h-[70vh] w-2/5 pl-0.5 flex flex-col`}>
                    <div className='flex-1 pb-px'>
                        <img className='w-full h-full object-cover'
                            src= {selectedImages[0]}
                            alt=''
                        />
                    </div> 
                    <div className='flex-1 py-px'>
                        <img className='w-full h-full object-cover'
                            src= {selectedImages[1]}
                            alt=''
                        />
                    </div> 
                    <div className='flex-1 pt-px'>
                        <img className='w-full h-full object-cover'
                            src= {selectedImages[2]}
                            alt=''
                        />
                    </div>                                      
                </div>
            ) : (
                <div className='flex h-56'>
                    <div className='w-1/3 pr-px'>
                        <img className='w-full h-full object-cover'
                            src= {selectedImages[0]}
                            alt=''
                        />
                    </div>  
                    <div className='w-1/3 px-px'>
                        <img className='w-full h-full object-cover'
                            src= {selectedImages[1]}
                            alt=''
                        />
                    </div> 
                    <div className='w-1/3 pl-px'>
                        <img className='w-full h-full object-cover'
                            src= {selectedImages[2]}
                            alt=''
                        />
                    </div>              
                </div>  
            )}         
        </div>
    );
}
