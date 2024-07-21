import React from 'react'

export const SixPictures = ({selectedImages, extraImagesCount}) => {
  return (
    <div>
        <div className='flex h-72'>
            <img className='w-1/2 h-full object-cover mr-px mb-0.5'
                src={selectedImages[0]}
                alt=''
            />
            <img className='w-1/2 h-full object-cover pl-px mb-0.5'
                src={selectedImages[1]}
                alt=''
            />
        </div>
        <div className='flex h-52 mt-0.5'>
            <img className='w-1/3 h-full object-cover'
                src={selectedImages[2]}
                alt=''
            />
            <img className='w-1/3 h-full object-cover mx-0.5'
                src={selectedImages[3]}
                alt=''
            />
            <div className='relative w-1/3 h-full object-cover'>
                <img className='opacity-50 h-52 w-full'
                    src={selectedImages[4]}
                    alt=''
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-black text-3xl font-bold">
                        +{extraImagesCount}
                    </span>
                </div>                
            </div>

        </div>
    </div>
  )
}
