import React from 'react'

const ThreePictures = ({selectedImages}) => {
  return (
    <div className='flex'>
        <div className='w-2/3 h-96 mr-0.5'>
            <img className='w-full h-full object-cover'
                src={selectedImages[0]}
                alt=''
            />
        </div>
        <div className='w-1/3 h-48'>
            <img className='w-full h-full object-cover'
                src={selectedImages[1]}
                alt=''
            />
            <img className='w-full h-full object-cover pt-0.5'
                src={selectedImages[2]}
                alt=''
            />
        </div>
    </div>
  )
}

export default ThreePictures