import React from 'react'

const FourPictures = ({selectedImages}) => {
  return (
    <div>
        <div className='flex h-64'>
            <img className='w-1/2 mr-px mb-0.5'
                src={selectedImages[0]}
                alt=''
            />
            <img className='w-1/2 ml-px mb-0.5'
                src={selectedImages[1]}
                alt=''
            />
        </div>
        <div className='flex h-64'>
            <img className='w-1/2 mr-px'
                src={selectedImages[2]}
                alt=''
            />
            <img className='w-1/2 ml-px'
                src={selectedImages[3]}
                alt=''
            />
        </div>
    </div>
  )
}

export default FourPictures