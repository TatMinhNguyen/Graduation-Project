import axios from "axios";
import { apiUrl } from "../API_URL"
import { setProfile, setProfileDiff } from "../../redux/authSlice";

export const getProfile = async (token, dispatch, userId) => {
    try {
        const res = await axios.get(`${apiUrl}/user/get-profile/${userId}`, {
            headers: { token: `Bearer ${token}` },
        });
        // console.log(res.data)
        dispatch(setProfileDiff(res.data))
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getMyProfile = async (token, dispatch) => {
    try {
        const res = await axios.get(`${apiUrl}/user/get-my-profile`, {
            headers: { token: `Bearer ${token}` },
        });
        // console.log(res.data)
        dispatch(setProfile(res.data))
    } catch (error) {
        console.log(error);
    }
};

export const changeAvatar = async (token, image) => {
    try {
        await axios.post(`${apiUrl}/user/update-avatar`, image, {
            headers: {token: `Bearer ${token}`}
        })
    } catch (error) {
        console.log(error)
    }
}

export const changeCover = async (token, image) => {
    try {
        await axios.post(`${apiUrl}/user/update-background`, image, {
            headers: {token: `Bearer ${token}`}
        })
    } catch (error) {
        console.log(error)
    }
}

export const changeProfile = async(token, profile) => {
    try {
        await axios.post(`${apiUrl}/user/update-profile`, profile, {
            headers: {token: `Bearer ${token}`}
        })
    } catch (error) {
        console.log(error)
    }    
}

export const reportUser = async (token, userId, data) => {
    try {
        await axios.post(`${apiUrl}/user/report/${userId}`, data, {
            headers: {token: `Bearer ${token}`}
        })
    } catch (error) {
        console.log(error)
    } 
}