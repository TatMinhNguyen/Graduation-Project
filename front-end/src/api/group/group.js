import axios from "axios"
import { apiUrl } from "../API_URL"

export const getUserGroups = async(token) => {
    try {
        const res = await axios.get(`${apiUrl}/group/get-user-group`, {
            headers: { token: `Bearer ${token}` },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getSuggestGroup = async(token) => {
    try {
        const res = await axios.get(`${apiUrl}/group/get-suggest`, {
            headers: { token: `Bearer ${token}` },
        })
        return res.data        
    } catch (error) {
        console.log(error)
    }
}

export const joinGroup = async (token, groupId) => {
    try {
        const res = await axios.post(`${apiUrl}/group/join-group/${groupId}`, {}, {
            headers: { token: `Bearer ${token}` },
        })
        return res.data          
    } catch (error) {
        console.log(error)
    }
}

export const cancelJoinGroup = async (token, groupId) => {
    try {
        const res = await axios.post(`${apiUrl}/group/cancel-join/${groupId}`, {}, {
            headers: { token: `Bearer ${token}` },
        })
        return res.data          
    } catch (error) {
        console.log(error)
    }
}

export const leaveGroup = async (token, groupId) => {
    try {
        const res = await axios.post(`${apiUrl}/group/leave-group/${groupId}`, {}, {
            headers: { token: `Bearer ${token}` },
        })
        return res.data          
    } catch (error) {
        console.log(error)
    }
}