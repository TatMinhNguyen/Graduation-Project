import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const user = useSelector((state) => state.auth.login?.currentUser)
    console.log(user)

    const navigate = useNavigate();

    /* eslint-disable */
    useEffect(() => {
        if (!user) {
        navigate("/login");
        }
        if (user?.accessToken) {
        // getAllPosts(user?.accessToken, dispatch , axiosJWT);
        // getAllUsers(user?.accessToken, dispatch, axiosJWT);
        }
    }, []);
  return (
    <div>Home</div>
  )
}

export default Home