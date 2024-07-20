import React, { useEffect, useState } from 'react'

export const OnePicture = ({selectedImages}) => {
    const [isWidthLarger, setIsWidthLarger] = useState(true);

    /* eslint-disable */
    useEffect(() => {
      const img = new Image();
      img.src = selectedImages[0];
      img.onload = () => {
        if (img.width > img.height) {
          setIsWidthLarger(true);
        } else {
          setIsWidthLarger(false);
        }
      };
    }, []);
  return (
    <div className='flex-1 flex items-center justify-center'>
        {isWidthLarger === true ? (
            <div>
                <img className='w-full h-auto'
                    src= {selectedImages[0]}
                    alt=''
                />
            </div>
        ) : (
            <div className='bg-gray-700 h-[70vh] overflow-hidden flex-1 flex items-center justify-center'>
                <img className='w-3/4 '
                    src={selectedImages[0]}
                    alt=''
                />
            </div>            
        )}


    </div>
  )
}
