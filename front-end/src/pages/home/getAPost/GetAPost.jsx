import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getAPost } from '../../../api/post/post';
import { useSelector } from 'react-redux';
import GetMedia from '../../../components/post/GetMedia';
import { GetComment } from '../../../components/post/GetComment';

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
      <div className="flex h-screen">
        <div className="w-3/4 bg-white overflow-y-auto no-scrollbar">
          <GetMedia post={post} />
        </div>
        <div className="w-1/4 bg-white overflow-y-auto no-scrollbar">
          <GetComment 
            post={post}
            user = {user} 
          />
        </div>
      </div>
    )
    
}

export default GetAPost