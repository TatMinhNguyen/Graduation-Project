import React, { useState } from 'react';
import ReactPlayer from 'react-player';

export const VideoPlayer3 = ({url, selectedImages}) => {
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
            <div className={`${isWidthLarger ? 'w-full pb-0.5' : 'w-3/5 pr-0.5'} `}>
                <ReactPlayer
                    url={url}
                    controls={true}
                    width={isWidthLarger ? '100%' : '100%'}
                    height={isWidthLarger ? '100%' : '100%'}
                    onReady={handleReady}
                />
            </div>   
            {!isWidthLarger ? (
                <div className= {`h-[80vh] w-2/5 flex flex-col`}>
                    <div className='flex-1 pb-px'>
                        <img className='w-full h-full object-cover'
                            src= {selectedImages[0]}
                            alt=''
                        />
                    </div> 
                    <div className='flex-1 pt-px'>
                        <img className='w-full h-full object-cover'
                            src= {selectedImages[1]}
                            alt=''
                        />
                    </div>                                       
                </div>
            ) : (
                <div className='flex h-48'>
                    <div className='w-1/2 pr-px'>
                        <img className='w-full'
                            src= {selectedImages[0]}
                            alt=''
                        />
                    </div>  
                    <div className='w-1/2 pl-px'>
                        <img className='w-full'
                            src= {selectedImages[1]}
                            alt=''
                        />
                    </div>              
                </div>  
            )}         
        </div>
    );
}
