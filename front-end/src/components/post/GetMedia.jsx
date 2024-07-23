import React, { useEffect, useState } from 'react'
import { convertNewlinesToBreaks, timeAgo } from '../../utils'

const GetMedia = ({post}) => {
    console.log(post?.post?.images)
    // eslint-disable-next-line
    const [photoIndex, setPhotoIndex] = useState(0);
    // eslint-disable-next-line
    const [isOpen, setIsOpen] = useState(false);

    const [isWidthLarger, setIsWidthLarger] = useState(true);
    const [imageDimensions, setImageDimensions] = useState([]);

    const getImageDimensions = (url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve({ width: img.width, height: img.height });
          img.onerror = reject;
        });
    };  

    useEffect(() => {
        const fetchImageDimensions = async () => {
          try {
            const dimensions = await Promise.all(
              post?.post?.images.map(image => getImageDimensions(image.url))
            );
            setImageDimensions(dimensions);
          } catch (error) {
            console.error("Error loading image dimensions:", error);
          }
        };
    
        fetchImageDimensions();
    }, [post?.post?.images]);

    useEffect(() => {
        const allImagesWide = imageDimensions.every(dim => dim.width > dim.height);
        setIsWidthLarger(allImagesWide);
    }, [imageDimensions]);  

  return (
    <div>
        <div className='flex-1 flex items-center mx-3 my-2'>
            <div className='w-10 h-10'>
                <img className='h-full w-full object-cover rounded-full shadow'
                    src= {post?.author?.authorAvatar}
                    alt=''
                />
            </div>
            <div className='ml-3'>
                <h1 className='font-medium text-base'>
                    {post?.author?.authorName}
                </h1>
                <p className='text-xs text-gray-500'>
                    {timeAgo(post?.post?.createdAt)}
                </p>
            </div>
        </div>
        <div>
            {post?.post?.typeText === false ?(
                <p className='ml-3.5 font-mono' style={{color: "#333333"}}>
                    {post?.post?.description ? (
                        convertNewlinesToBreaks(post?.post?.description)
                    ) : (
                        ''
                    )}
                </p>
            ) : (
                <p className='ml-3.5 font-sans' style={{color: "#050505"}}>
                    {post?.post?.description ? (
                        convertNewlinesToBreaks(post?.post?.description)
                    ) : (
                        ''
                    )}
                </p>
            )}
            <div className='mt-2'>
                {(post?.post?.video == null || !post?.post?.video) ? (
                    <>
                        <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden">
                            {post?.post?.images.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={image.url}
                                    onClick={() => {
                                        setPhotoIndex(index);
                                        setIsOpen(true);
                                    }}
                                    className={`w-full ${isWidthLarger ? 'h-auto' : 'h-[90vh] object-cover'}`}
                                    alt="Ảnh của tôi"
                                />
                            </div>
                            ))}
                        </div>

                        {/* {isOpen && (
                            <Lightbox
                                mainSrc={post?.post?.images[photoIndex].url}
                                nextSrc={post?.post?.images[(photoIndex + 1) % post?.post?.images.length].url}
                                prevSrc={post?.post?.images[(photoIndex + post?.post?.images.length - 1) % post?.post?.images.length].url}
                                onCloseRequest={() => setIsOpen(false)}
                                onMovePrevRequest={() =>
                                    setPhotoIndex((photoIndex + post?.post?.images.length - 1) % post?.post?.images.length)
                                }
                                onMoveNextRequest={() =>
                                    setPhotoIndex((photoIndex + 1) % post?.post?.images.length)
                                }
                            />
                        )}   */}
                    </>
                ) : (
                    <>  
                        {/* {post?.images.length > 3 ? (
                            <VideoPlayer5
                                url = {post.video.url}
                                selectedImages = {post?.images.map(img => img.url)}
                                extraImagesCount={post?.images.length - 2}
                            /> 
                        ) : post?.images.length === 3 ? (
                            <VideoPlayer4
                                url = {post.video.url}
                                selectedImages = {post?.images.map(img => img.url)}
                            />                                        
                        ) : post?.images.length === 2 ? (
                            <VideoPlayer3 
                                url = {post.video.url}
                                selectedImages = {post?.images.map(img => img.url)}
                            />                                        
                        ) : post?.images.length === 1 ? (
                            <VideoPlayer2 
                                url = {post.video.url}
                                selectedImages = {post?.images.map(img => img.url)}
                            />                                        
                        ) : (
                            <VideoPlayer url = {post.video.url}/>
                        )}  */}
                    </>
                )} 
            </div>
        </div>        
    </div>
  )
}

export default GetMedia