import React, { useState } from 'react';
import ReactPlayer from 'react-player';

export const VideoPlayer2 = ({url, selectedImages}) => {
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
            <div className={`${isWidthLarger ? 'w-full' : 'w-1/2 pr-0.5'} `}>
                <ReactPlayer
                    url={url}
                    controls={true}
                    width={isWidthLarger ? '100%' : '100%'}
                    height={isWidthLarger ? '100%' : '100%'}
                    onReady={handleReady}
                />
            </div>   
            {!isWidthLarger ? (
                <div className='w-1/2'>
                    <img className='h-full'
                        src= {selectedImages[0]}
                        alt=''
                    />
                </div>
            ) : (
                <div className='h-72 pt-0.5'>
                    <img className='w-full'
                        src= {selectedImages[0]}
                        alt=''
                    />
                </div>
            )}         
        </div>
    );
}
