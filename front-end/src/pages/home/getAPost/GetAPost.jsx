import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getAPost } from '../../../api/post/post';
import { useDispatch, useSelector } from 'react-redux';
import { convertNewlinesToBreaks, timeAgo } from '../../../utils';
import { SixPictures } from '../../../components/CssPictures/SixPictures';
import { FivePictures } from '../../../components/CssPictures/FivePictures';
import FourPictures from '../../../components/CssPictures/FourPictures';
import ThreePictures from '../../../components/CssPictures/ThreePictures';
import TwoPictures from '../../../components/CssPictures/TwoPictures';
import { OnePicture } from '../../../components/CssPictures/OnePicture';
import { VideoPlayer5 } from '../../../components/CssPictures/VideoPlayer5';
import { VideoPlayer4 } from '../../../components/CssPictures/VideoPlayer4';
import { VideoPlayer3 } from '../../../components/CssPictures/VideoPlayer3';
import { VideoPlayer2 } from '../../../components/CssPictures/VideoPlayer2';
import VideoPlayer from '../../../components/CssPictures/VideoPlayer';
import { Comment } from '../../../components/comment/Comment';
import { createComment, getComments } from '../../../api/comment/comment';
import { ImageComment } from '../../../components/CssPictures/ImageComment';
import { getProfile } from '../../../api/profile/profile';

const GetAPost = () => {
    const { postId } = useParams();
    const user = useSelector((state) => state.auth.login?.currentUser)
    const comments = useSelector((state) => state.post.comments)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const profile = useSelector((state) => state?.auth?.profile)

    const [post, setPost] = useState({})
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const textareaRef = useRef(null); 
    const imageInputRef = useRef(null); 

    const handleGoBack = () => {
        navigate(-1);  // Quay lại trang trước đó
        URL.revokeObjectURL(imagePreview);
    };

    const handleGetComments = async() => {
      try {
        await getComments(user?.token, dispatch, postId)
      } catch (error) {
        console.log(error)
      }
    }

    const handleInput = (e) => {
      setDescription(e.target.value);
      const textarea = textareaRef.current;
      textarea.style.height = 'auto'; // Reset the height to auto
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the scroll height
    };

    const handleImageClick = () => {
        imageInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];       

        if(selectedImage){
            setImage(selectedImage);
            const ImageUrl = URL.createObjectURL(selectedImage);
            setImagePreview(ImageUrl);            
        }

        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
    };

    const handleDeletePreView = () => {
        setImage(null);
        setImagePreview(null)
        URL.revokeObjectURL(imagePreview);
    }

    const handleCreateComment = async(e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
      
            if (description) {
              formData.append('content', description);
            }
            if (image) {
                formData.append('image', image);
            }
            formData.append('postId', postId);

            setDescription('')
            setImage(null) 
            setImagePreview(null)
            
            // Reset chiều cao của textarea
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }

            await createComment(user?.token, formData)

            handleGetComments();
            handleGetPost();
        } catch (error) {
            console.log(error)
        } finally {
            // Giải phóng các URL sau khi không cần sử dụng nữa
            URL.revokeObjectURL(imagePreview);
          }
    }

    const handleGetPost = async() => {
        try {
            const result = await getAPost(user?.token, postId);

            setPost(result)
        } catch (error) {
            console.log(error);
        }
    }

    /* eslint-disable */
    useEffect(() => {
        handleGetPost();
        handleGetComments();
    },[postId])

    useEffect(() => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang khi component được render
    }, []);

    // console.log(post)

  return (
    <div className="flex-1 flex justify-center bg-black">
        <div className='absolute left-0 top-0 p-3 bg-gray-500 m-3 rounded-full cursor-pointer hover:bg-gray-400'
                onClick={handleGoBack}
        >
            <img
                src={require('../../../assets/icons/cancel.png')}
                alt=''
                className='w-5 h-5'
            />
        </div>
        <div className="h-full w-1/2 bg-white shadow z-50 ">
            <div className='py-2 h-[calc(100%)] p-0 '>
                <div>
                    <div className='flex-1 flex items-center mx-3 mb-2'>
                        <div className='w-10 h-10'>
                            <img className='h-full w-full object-cover rounded-full  hover:opacity-90'
                                src= {post?.author?.authorAvatar}
                                alt='Avatar'
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
                        <div className='mt-2 cursor-pointer'>
                            {(post?.post?.video == null || !post?.post?.video) ? (
                                <>
                                    {post?.post?.images.length > 5 ? (
                                        <SixPictures
                                            selectedImages={post?.post?.images.map(img => img.url)} 
                                            extraImagesCount={post?.post?.images.length - 4}
                                        />
                                    ) : post?.post?.images.length === 5 ? (
                                        <FivePictures selectedImages={post?.post?.images.map(img => img.url)}/>
                                    ) : post?.post?.images.length === 4 ? (
                                        <FourPictures selectedImages={post?.post?.images.map(img => img.url)}/>
                                    ) : post?.post?.images.length === 3 ? (
                                        <ThreePictures selectedImages={post?.post?.images.map(img => img.url)}/>
                                    ) : post?.post?.images.length === 2 ? (
                                        <TwoPictures selectedImages={post?.post?.images.map(img => img.url)}/>
                                    ) : post?.post?.images.length === 1 ? (
                                        <OnePicture selectedImages={post?.post?.images.map(img => img.url)}/>
                                    ) : ('')}
                                </>
                            ) : (
                                <>  
                                    {post?.post?.images.length > 3 ? (
                                        <VideoPlayer5
                                            url = {post?.post?.video.url}
                                            selectedImages = {post?.post?.images.map(img => img.url)}
                                            extraImagesCount={post?.post?.images.length - 2}
                                        /> 
                                    ) : post?.post?.images.length === 3 ? (
                                        <VideoPlayer4
                                            url = {post?.post?.video.url}
                                            selectedImages = {post?.post?.images.map(img => img.url)}
                                        />                                        
                                    ) : post?.post?.images.length === 2 ? (
                                        <VideoPlayer3
                                            url = {post?.post?.video.url}
                                            selectedImages = {post?.post?.images.map(img => img.url)}
                                        />                                        
                                    ) : post?.post?.images.length === 1 ? (
                                        <VideoPlayer2 
                                            url = {post?.post?.video.url}
                                            selectedImages = {post?.post?.images.map(img => img.url)}
                                        />                                        
                                    ) : (
                                        <VideoPlayer url = {post?.post?.video.url}/>
                                    )} 
                                </>
                            )} 
                        </div>                                                   
                    </div>
                    <div className=''>
                        <div className='flex mt-2 mb-2'>
                            <div className='w-1/2 flex-1 flex items-center '>
                                <img className='h-6 w-6 ml-3.5 rounded-full border-2 border-white shadow-xl'
                                    src={require("../../../assets/icons/like-blue1.png")}
                                    alt=''
                                />
                                <img className='h-6 w-6 -ml-1 rounded-full border-2 border-white shadow-xl'
                                    src={require("../../../assets/icons/love.png")}
                                    alt=''
                                />
                                <img className='h-6 w-6 -ml-1 rounded-full border-2 border-white shadow-xl'
                                    src={require("../../../assets/icons/haha.png")}
                                    alt=''
                                />
                                <p className='text-gray-500 font-normal text-base ml-1'>
                                    {post?.post?.felt}
                                </p>
                            </div>
                            <div className='w-1/2 flex '>
                                <div className='flex-1'></div>
                                <p className='text-gray-500 font-normal text-base'>
                                    {post?.post?.comment}
                                </p>
                                <p className='text-gray-500 font-normal text-base ml-1 mr-3.5'>
                                    comments
                                </p>
                            </div> 
                        </div>
                        <div className='flex-1 flex border-t border-b border-gray-300 py-2 mx-3.5'>
                            <div className='w-1/2 flex-1 flex items-center justify-center cursor-pointer mr-[8vh]'>
                                <img className='h-6 w-6 ml-2'
                                    src={require("../../../assets/icons/like.png")}
                                    alt=''
                                />
                                <p className='text-gray-500 font-normal text-base ml-2 mr-12'>
                                    Like
                                </p>
                            </div>
                            <div className={`w-1/2 flex-1 flex items-center justify-center cursor-pointer ml-[8vh]`}
                            >
                                <img className='h-5 w-5 ml-2'
                                    src={require("../../../assets/icons/comment.png")}
                                    alt=''
                                />
                                <p className='text-gray-500 font-normal text-base ml-3 mb-1'>
                                    Comment
                                </p>
                            </div>                          
                        </div>
                    </div>                    
                </div>
                    <div className='flex-1 flex items-center justify-center w-full px-3 py-2 bg-white '>
                        <div className='h-10 w-10 mr-3'>
                            <img className='h-full w-full object-cover rounded-full shadow'
                                src={profile?.profilePicture}
                                alt='Avatar'
                            />
                        </div>
                        <form onSubmit={handleCreateComment} className="w-11/12 mx-auto rounded-2xl bg-gray-100 items-center">
                            <textarea
                                id="description"
                                name="description"
                                rows="1"
                                value={description}
                                onChange={handleInput}
                                ref={textareaRef}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleCreateComment(e);  // Gọi hàm submit form
                                    }
                                }}
                                className="flex-grow w-full px-4 py-2 rounded-2xl mt-1 bg-gray-100 overflow-hidden
                                    focus:outline-none focus:border-gray-100 focus:ring-1 focus:ring-gray-100"
                                placeholder="Write your comment here..."
                                style={{resize: 'none'}} // Optional: Prevent manual resizing
                            />
                            {imagePreview && (
                                <div className='m-4 flex-1 flex'>
                                    <ImageComment
                                        selectedImages = {imagePreview}
                                    />
                                    <div className='w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300'
                                            onClick={handleDeletePreView}
                                    >
                                        <img
                                            src={require('../../../assets/icons/close.png')}
                                            alt=''
                                            className='w-4 h-4'
                                        />
                                    </div>
                                </div>
                            )}
                            
                            <div className="flex items-center space-x-2 pb-2 px-3">
                                <div className='text-gray-500 cursor-pointer'>
                                    <img className='h-6 w-6 object-cover'
                                        src={require("../../../assets/icons/smile.png")}
                                        alt=''
                                    />                                 
                                </div>
                                <div onClick={handleImageClick} className='text-gray-500 cursor-pointer'>
                                    <img className='h-6 w-6 object-cover'
                                        src={require("../../../assets/icons/camera.png")}
                                        alt=''
                                    />                                 
                                </div>  
                                {/* Hidden inputs */}
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    ref={imageInputRef} 
                                    style={{ display: 'none' }} 
                                    onChange={handleImageChange} 
                                />                                             
                                <div className='flex-1'></div>
                                {description || image ? (
                                    <button type="submit" className="text-white">
                                        <img className='h-6 w-6 object-cover'
                                            src={require("../../../assets/icons/send-blue.png")}
                                            alt=''
                                        />                            
                                    </button>                                 
                                ) :(
                                    <div className="text-white">
                                        <img className='h-6 w-6 object-cover'
                                            src={require("../../../assets/icons/send-gray.png")}
                                            alt=''
                                        />                            
                                    </div>   
                                )}
                            
                            </div>
                        </form>            
                    </div>
                <div>
                    <Comment 
                        comments = {comments}
                        user = {user}
                        authorPost = {post?.author?.authorId}
                        postId = {postId}
                        profile = {profile?.profilePicture}
                    />
                </div> 
                <div className='ml-3 mb-2'>
                    <p className='text-xs text-gray-500'>
                    There are no more comments.
                    </p>
                </div>                                 
            </div>
        </div>
    </div>
  )
    
}

export default GetAPost