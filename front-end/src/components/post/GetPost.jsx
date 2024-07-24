import React from 'react'
import { convertNewlinesToBreaks, timeAgo } from '../../utils';
import { Comment } from '../comment/Comment';

const GetPost = ({ isOpen, onClose, post }) => {
    if (!isOpen) return null;
    // console.log(post)

    return (
        <div className="fixed inset-0 z-50 flex-1 flex items-center justify-center">
            <div className="absolute inset-0 bg-white opacity-10"></div>
            <div className="h-[90vh] w-2/5 relative bg-white rounded-lg shadow z-50 overflow-hidden">
                <div className="fixed top-0 w-full z-51 relative flex items-center justify-center my-4 border-b border-gray-300 pb-4">
                    <div className="flex-1 flex items-center justify-center space-x-0">
                        <h2 className="text-xl font-semibold font-serif italic mt-1">
                            {post?.author?.authorName} 
                        </h2>
                        <h2 className="text-xl font-bold">'s Post</h2> 
                    </div>
                    
                    <div className="absolute right-0 w-9 h-9 mr-4 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
                        onClick={onClose}
                    >
                        <img className="w-6 h-6" src={require("../../assets/icons/close.png")} alt="" />
                    </div>
                </div>
                <div className='pb-2 h-[calc(100%-9rem)] overflow-y-auto p-0 no-scrollbar'>
                    <div>
                        <div className='flex-1 flex items-center mx-3 mb-2'>
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
                        </div>
                        <div className=''>
                            <div className='flex mt-2 mb-2'>
                                <div className='w-1/2 flex-1 flex items-center '>
                                    <img className='h-6 w-6 ml-3.5 rounded-full border-2 border-white shadow-xl'
                                        src={require("../../assets/icons/like-blue1.png")}
                                        alt=''
                                    />
                                    <img className='h-6 w-6 -ml-1 rounded-full border-2 border-white shadow-xl'
                                        src={require("../../assets/icons/love.png")}
                                        alt=''
                                    />
                                    <img className='h-6 w-6 -ml-1 rounded-full border-2 border-white shadow-xl'
                                        src={require("../../assets/icons/haha.png")}
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
                                <div className='w-1/2 flex-1 flex items-center justify-center cursor-pointer'>
                                    <img className='h-6 w-6 ml-2'
                                        src={require("../../assets/icons/like.png")}
                                        alt=''
                                    />
                                    <p className='text-gray-500 font-normal text-base ml-2 mr-12'>
                                        Like
                                    </p>
                                </div>
                                <div className={`w-1/2 flex-1 flex items-center justify-center cursor-pointer`}
                                >
                                    <img className='h-5 w-5 ml-2'
                                        src={require("../../assets/icons/comment.png")}
                                        alt=''
                                    />
                                    <p className='text-gray-500 font-normal text-base ml-3 mb-1'>
                                        Comment
                                    </p>
                                </div>                          
                            </div>
                        </div>                    
                    </div>
                    <div>
                        <Comment 
                            user = {post?.author}
                        />
                    </div>                    
                </div>
                <div className='flex-1 flex items-center justify-center fixed absolute bottom-0 w-full px-3 py-2 bg-white 
                                shadow border-t-2 border-gray-200 z-51'>
                    <div className='h-11 w-11 mr-3'>
                        <img className='h-full w-full object-cover rounded-full shadow'
                            src={post?.author?.authorAvatar}
                            alt=''
                        />
                    </div>
                    <form className='w-11/12'>
                        <textarea
                            id="description"
                            name="description"
                            rows="1"
                            // value={description}
                            // onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 rounded-2xl mt-1 bg-gray-200 
                                focus:outline-none focus:border-gray-100 focus:ring-1 focus:ring-gray-100"
                            placeholder="Write your comment here..."
                        />

                    </form>            
                </div>
            </div>
        </div>
    );
}

export default GetPost