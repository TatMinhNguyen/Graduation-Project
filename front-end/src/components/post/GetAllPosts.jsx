import React from 'react'
import { convertNewlinesToBreaks, timeAgo } from '../../utils'
import { FivePictures } from '../CssPictures/FivePictures'

const GetAllPosts = ({user, posts}) => {
    console.log(user)
    console.log(posts)
  return (
    <div>
        {posts?.map((post) => {
            return (
                <div key={post.postId}
                    className='bg-white mt-3 border border-white shadow rounded-md flex-1 items-center'
                >
                    <div className='flex-1 flex items-center mx-3 my-2'>
                        <div className=''>
                            <img className='w-11 h-11 rounded-3xl'
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
                            <FivePictures/>
                        </div>
                         
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default GetAllPosts