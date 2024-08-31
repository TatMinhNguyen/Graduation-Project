import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from "react-router-dom"
import { convertNewlinesToBreaks, timeAgo } from '../../../utils'
import { SixPictures } from '../../../components/CssPictures/SixPictures'
import { FivePictures } from '../../../components/CssPictures/FivePictures'
import FourPictures from '../../../components/CssPictures/FourPictures'
import ThreePictures from '../../../components/CssPictures/ThreePictures'
import TwoPictures from '../../../components/CssPictures/TwoPictures'
import { OnePicture } from '../../../components/CssPictures/OnePicture'
import { VideoPlayer5 } from '../../../components/CssPictures/VideoPlayer5'
import { VideoPlayer4 } from '../../../components/CssPictures/VideoPlayer4'
import { VideoPlayer3 } from '../../../components/CssPictures/VideoPlayer3'
import { VideoPlayer2 } from '../../../components/CssPictures/VideoPlayer2'
import VideoPlayer from '../../../components/CssPictures/VideoPlayer'
import { getUserPost } from '../../../api/post/post'
import { useSelector } from 'react-redux'

const UserPosts = () => {
    const userId = useOutletContext()
    const user = useSelector((state) => state.auth.login?.currentUser)
    const [posts, setPosts] = useState([]);
    console.log(userId)

    const navigation = useNavigate();

    const handleGetAPost = async(postId) => {
        navigation(`/get-post/${postId}`)
    }

    const handleGetUserPost = async () => {
        try {
            const result = await getUserPost(user?.token, userId)
            setPosts(result);            
        } catch (error) {
            console.log(error)
        }
    }

    /* eslint-disable */
    useEffect(() => {
        handleGetUserPost();
    },[userId])

    return (
        <div>
            {posts?.length === 0 ? (
                <div className='flex-1 flex items-center justify-center mt-10'>
                    <p className='text-gray-500 text-base'>
                        There are no posts
                    </p>
                </div>
            ) : (
                <>
                    {posts?.map((post) => {
                        return (
                            <div key={post?.postId} 
                                className='bg-white mt-0 mb-4 border border-white shadow rounded-md flex-1 items-center'
                            >
                                <div  
                                    className='flex-1 flex items-center mx-3 my-2 cursor-pointer'>
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
                                            {timeAgo(post?.createdAt)}
                                        </p>
                                    </div>
                                </div>
                                <div onClick={() => handleGetAPost(post?.postId)} className='cursor-pointer'>
                                    {post?.typeText === false ?(
                                        <p className='ml-3.5 font-mono' style={{color: "#333333"}}>
                                            {post?.description ? (
                                                convertNewlinesToBreaks(post?.description)
                                            ) : (
                                                ''
                                            )}
                                        </p>
                                    ) : (
                                        <p className='ml-3.5 font-sans' style={{color: "#050505"}}>
                                            {post?.description ? (
                                                convertNewlinesToBreaks(post?.description)
                                            ) : (
                                                ''
                                            )}
                                        </p>
                                    )}
                                    <div className='mt-2'>
                                        {(post?.video == null || !post?.video) ? (
                                            <>
                                                {post?.images.length > 5 ? (
                                                    <SixPictures
                                                        selectedImages={post?.images.map(img => img.url)} 
                                                        extraImagesCount={post?.images.length - 4}
                                                    />
                                                ) : post?.images.length === 5 ? (
                                                    <FivePictures selectedImages={post?.images.map(img => img.url)}/>
                                                ) : post?.images.length === 4 ? (
                                                    <FourPictures selectedImages={post?.images.map(img => img.url)}/>
                                                ) : post?.images.length === 3 ? (
                                                    <ThreePictures selectedImages={post?.images.map(img => img.url)}/>
                                                ) : post?.images.length === 2 ? (
                                                    <TwoPictures selectedImages={post?.images.map(img => img.url)}/>
                                                ) : post?.images.length === 1 ? (
                                                    <OnePicture selectedImages={post?.images.map(img => img.url)}/>
                                                ) : ('')}
                                            </>
                                        ) : (
                                            <>  
                                                {post?.images.length > 3 ? (
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
                                                    <VideoPlayer url = {post?.video.url}/>
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
                                                {post?.felt}
                                            </p>
                                        </div>
                                        <div className='w-1/2 flex '>
                                            <div className='flex-1'></div>
                                            <p className='text-gray-500 font-normal text-base'>
                                                {post?.comment}
                                            </p>
                                            <p className='text-gray-500 font-normal text-base ml-1 mr-3.5'>
                                                comments
                                            </p>
                                        </div> 
                                    </div>
                                    <div className='flex-1 flex border-t border-gray-300 py-2 mx-3.5'>
                                        <div className='w-1/2 flex-1 flex items-center justify-center cursor-pointer'>
                                            <img className='h-6 w-6 ml-2'
                                                src={require("../../../assets/icons/like.png")}
                                                alt=''
                                            />
                                            <p className='text-gray-500 font-normal text-base ml-2 mr-12'>
                                                Like
                                            </p>
                                        </div>
                                        <div className={`w-1/2 flex-1 flex items-center justify-center cursor-pointer`}
                                            onClick={() => handleGetAPost(post?.postId)}
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
                        )
                    })}                
                </>
            )}

        </div>
    )
}

export default UserPosts