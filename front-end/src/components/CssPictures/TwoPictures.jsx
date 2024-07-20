import React from 'react'

const TwoPictures = ({selectedImages}) => {
  return (
    <div className='flex h-[40vh]'>
        <img className='w-1/2 pr-px'
            src={selectedImages[0]}
            alt=''
        />
        <img className='w-1/2 pl-px'
            src={selectedImages[1]}
            alt=''
        />        
    </div>
  )
}

export default TwoPictures