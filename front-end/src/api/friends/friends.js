import axios from "axios";
import { apiUrl } from "../API_URL"

export const getFriends = async (token, userId) => {
    try {
        const res = await axios.get(`${apiUrl}/friend/get-friends/${userId}`, {
            headers: { token: `Bearer ${token}` },
        });
        // console.log(res.data)

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getSuggestions = async (token) => {
    try {
        const res = await axios.get(`${apiUrl}/friend/get-suggest-friends`, {
            headers: { token: `Bearer ${token}` },
        });
        // console.log(res.data)

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getRequested = async (token) => {
    try {
        const res = await axios.get(`${apiUrl}/friend/get-requested`, {
            headers: { token: `Bearer ${token}` },
        });
        // console.log(res.data)

        return res.data;
    } catch (error) {
        console.log(error);
    }
};