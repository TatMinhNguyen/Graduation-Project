import React from 'react'

export const FivePictures = ({selectedImages}) => {
  return (
    <div>
        <div className='flex h-72'>
            <img className='w-1/2 mr-px mb-0.5'
                src={selectedImages[0]}
                alt=''
            />
            <img className='w-1/2 pl-px mb-0.5'
                src={selectedImages[1]}
                alt=''
            />
        </div>
        <div className='flex h-52'>
            <img className='w-1/3'
                src={selectedImages[2]}
                alt=''
            />
            <img className='w-1/3 mx-0.5'
                src={selectedImages[3]}
                alt=''
            />
            <img className='w-1/3'
                src={selectedImages[4]}
                alt=''
            />
        </div>
    </div>
  )
}