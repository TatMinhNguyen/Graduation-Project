import axios from "axios";
import { apiUrl } from "../API_URL"
import { setChats, setMessages } from "../../redux/chatSlice";


export const getUserChat = async (token, dispatch) => {
    try {
        const res = await axios.get(`${apiUrl}/chat/get-user-chat`, {
            headers: { token: `Bearer ${token}` },
        });
        // console.log(res.data)
        dispatch(setChats(res.data))
    } catch (error) {
        console.log(error);
    }
};

export const getAChat = async (token, chatId) => {
    try {
        const res = await axios.get(`${apiUrl}/chat/get-a-chat/${chatId}`, {
            headers: { token: `Bearer ${token}` },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const createChat1vs1 = async (token, userId, navigate) => {
    try {
        const res = await axios.post(`${apiUrl}/chat/create-chat/${userId}`, {}, {
            headers: { token: `Bearer ${token}` },
        })
        navigate(`/messenger/${res.data._id}`)
    } catch (error) {
        // console.log(error)
        if(error.response.data.error === 'Phòng chat đã tồn tại'){
            navigate(`/messenger/${error.response.data.chatId}`)
        }
    }
}

export const getMess = async (token, chatId, params, dispatch) => {
    try {
        const res = await axios.get(`${apiUrl}/chat/get-message/${chatId}`, {
            headers: { token: `Bearer ${token}` },
            params: params
        })
        dispatch(setMessages(res.data))
        // return res.data
    } catch (error) {
        console.log(error)
    }
}

export const addMess = async (token, message) => {
    try {
        const  res = await axios.post(`${apiUrl}/chat/add-message`, message, {
            headers: {token: `Bearer ${token}`}
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getMembers = async (token, chatId) => {
    try {
        const res = await axios.get(`${apiUrl}/chat/get-members/${chatId}`, {
            headers: { token: `Bearer ${token}` },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}