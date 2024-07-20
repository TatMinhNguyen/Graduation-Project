import React from 'react'

const ThreePictures = ({selectedImages}) => {
  return (
    <div className='flex'>
        <div className='w-2/3 mr-0.5'>
            <img className='h-96 w-full '
                src={selectedImages[0]}
                alt=''
            />
        </div>
        <div className='w-1/3'>
            <img className='h-48 w-full'
                src={selectedImages[1]}
                alt=''
            />
            <img className='h-48 w-full pt-0.5'
                src={selectedImages[2]}
                alt=''
            />
        </div>
    </div>
  )
}

export default ThreePictures