import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getAPost } from '../../../api/post/post';
import { useSelector } from 'react-redux';
import GetMedia from '../../../components/post/GetMedia';

const GetAPost = () => {
    const { postId } = useParams();
    const user = useSelector((state) => state.auth.login?.currentUser)

    const [post, setPost] = useState({})

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
    },[postId])

    // console.log(post)

  return (
    <div className='flex'>
      <div className='w-2/3 bg-white '>
        <GetMedia
            post =  {post}
        />
      </div>
      <div className='w-1/3 bg-white'></div>
    </div>
  )
}

export default GetAPost