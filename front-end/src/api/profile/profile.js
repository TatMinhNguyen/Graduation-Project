import axios from "axios";
import { apiUrl } from "../API_URL"
import { setProfile } from "../../redux/authSlice";

export const getProfile = async (token, userId) => {
    try {
        const res = await axios.get(`${apiUrl}/user/get-profile/${userId}`, {
            headers: { token: `Bearer ${token}` },
        });
        // console.log(res.data)

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