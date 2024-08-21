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

export const getMutuals = async (token, userId) => {
    try {
        const res = await axios.get(`${apiUrl}/friend/get-mutual-friends/${userId}`, {
            headers: { token: `Bearer ${token}` },
        });
        // console.log(res.data)

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// Gửi lời mời kết bạn
export const requestFriends = async (token, userId) => {
    try {
        await axios.post(
            `${apiUrl}/friend/request-friend/${userId}`, 
            {}, 
            {
                headers: { token: `Bearer ${token}` }
            }
        );
    } catch (error) {
        console.log(error);
    }
}

// Hủy lời mời kết bạn
export const cancelRequest = async (token, userId) => {
    try {
        await axios.post(
            `${apiUrl}/friend/cancel-request-friend/${userId}`, 
            {}, 
            {
                headers: { token: `Bearer ${token}` }
            }
        );
    } catch (error) {
        console.log(error);
    }
}

//chap nhan ket ban
export const acceptRequest = async (token, userId) => {
    try {
        await axios.post(
            `${apiUrl}/friend/accepet-friend/${userId}`, {}, 
            {
                headers: { token: `Bearer ${token}` }
            }
        );
    } catch (error) {
        console.log(error);
    }
}

//Tu choi ket ban
export const refuseRequest = async (token, userId) => {
    try {
        await axios.post(
            `${apiUrl}/friend/refuse-friend/${userId}`, {}, 
            {
                headers: { token: `Bearer ${token}` }
            }
        );
    } catch (error) {
        console.log(error);
    }
}

//Hủy bạn bè
export const cancelFriend = async (token, userId) => {
    try {
        await axios.post(
            `${apiUrl}/friend/cancel-friend/${userId}`, {}, 
            {
                headers: { token: `Bearer ${token}` }
            }
        );
    } catch (error) {
        console.log(error);
    }
}