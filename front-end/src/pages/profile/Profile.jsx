import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProfile } from '../../api/profile/profile';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { userId } = useParams();
    const user = useSelector((state) => state.auth.login?.currentUser)
    const [profile, setProfile] = useState({})
    // console.log(profile)

    const handleGetUser = async () => {
        try {
            const result = await getProfile(user?.token, userId)
            setProfile(result);
        } catch (error) {
            console.log(error)
        }
    }

    /* eslint-disable */
    useEffect(() => {
        handleGetUser();
    },[userId])

    return (
        <div>{userId}</div>
    )
}

export default Profile