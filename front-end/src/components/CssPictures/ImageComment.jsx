import React, { useEffect, useState } from 'react'

export const ImageComment = ({selectedImages}) => {
    const [isWidthLarger, setIsWidthLarger] = useState(true);

    /* eslint-disable */
    useEffect(() => {
      const img = new Image();
      img.src = selectedImages;
      img.onload = () => {
        if (img.width > img.height) {
          setIsWidthLarger(true);
        } else {
          setIsWidthLarger(false);
        }
      };
    }, []);
    return (
        <div className='flex-1'>
            {isWidthLarger === true ? (
                <div className='w-1/3'>
                    <img
                        src={selectedImages}
                        alt=''
                        className='w-full'
                    />
                </div>
            ) : (
                <div className='flex-1'>
                    <img
                        src={selectedImages}
                        alt=''
                        className='h-[30vh] '
                    />
                </div>
            )}
        </div>
    )
}
