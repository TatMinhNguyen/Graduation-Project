import React from 'react'
import { convertNewlinesToBreaks, timeAgo } from '../../utils'
import { FivePictures } from '../CssPictures/FivePictures'
import FourPictures from '../CssPictures/FourPictures'
import ThreePictures from '../CssPictures/ThreePictures'
import TwoPictures from '../CssPictures/TwoPictures'
import { SixPictures } from '../CssPictures/SixPictures'
import { OnePicture } from '../CssPictures/OnePicture'
import VideoPlayer from '../CssPictures/VideoPlayer'
import { VideoPlayer2 } from '../CssPictures/VideoPlayer2'
import { VideoPlayer3 } from '../CssPictures/VideoPlayer3'

const GetAllPosts = ({user, posts}) => {
    // console.log(user)
    // console.log(posts)
  return (
    <div>
        {posts?.map((post) => {
            return (
                <div key={post.postId}
                    className='bg-white mt-4 border border-white shadow rounded-md flex-1 items-center'
                >
                    <div className='flex-1 flex items-center mx-3 my-2'>
                        <div className=''>
                            <img className='w-10 h-10 rounded-3xl shadow'
                                src= {post.author.authorAvatar}
                                alt=''
                            />
                        </div>
                        <div className='ml-3'>
                            <h1 className='font-medium text-base'>
                                {post.author.authorName}
                            </h1>
                            <p className='text-xs text-gray-500'>
                                {timeAgo(post.createdAt)}
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className='mx-3'>
                            {post?.description ? (
                                convertNewlinesToBreaks(post?.description)
                            ) : (
                                ''
                            )}
                        </p>
                        <div className='mt-2'>
                            {(post?.video == null || !post?.video) ? (
                                <>
                                    {post?.images.length > 5 ? (
                                        <SixPictures
                                            selectedImages={post?.images.slice(0, 5).map(img => img.url)} 
                                            extraImagesCount={post?.images.length - 5}
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
                                    {/* <VideoPlayer url = {post.video.url}/> */}
                                    {/* <VideoPlayer2 
                                        url = {post.video.url}
                                        selectedImages = {post?.images.map(img => img.url)}
                                    /> */}
                                    <VideoPlayer3 
                                        url = {post.video.url}
                                        selectedImages = {post?.images.map(img => img.url)}
                                    />
                                </>
                            )} 
                            
                        </div>
                         
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default GetAllPosts