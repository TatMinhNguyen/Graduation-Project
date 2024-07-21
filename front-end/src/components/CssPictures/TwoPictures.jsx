import React from 'react'

const TwoPictures = ({selectedImages}) => {
  return (
    <div className='flex h-[50vh]'>
        <img className='w-1/2 pr-px h-full object-cover'
            src={selectedImages[0]}
            alt=''
        />
        <img className='w-1/2 pl-px h-full object-cover'
            src={selectedImages[1]}
            alt=''
        />        
    </div>
  )
}

export default TwoPictures