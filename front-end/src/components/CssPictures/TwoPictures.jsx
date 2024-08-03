import React from 'react'
import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgZoom from 'lightgallery/plugins/zoom';

const TwoPictures = ({selectedImages}) => {
  const onInit = () => {
    // console.log('lightGallery has been initialized');
  };
  return (
    <div className='flex h-[55vh]'>
      <LightGallery
        onInit={onInit}
        speed={500}
        plugins={[lgZoom]}
        elementClassNames="flex h-full w-full"
      >
        <img className='w-1/2 pr-px h-full object-cover'
            src={selectedImages[0]}
            alt=''
        />
        <img className='w-1/2 pl-px h-full object-cover'
            src={selectedImages[1]}
            alt=''
        /> 
      </LightGallery>         
    </div>
  )
}

export default TwoPictures