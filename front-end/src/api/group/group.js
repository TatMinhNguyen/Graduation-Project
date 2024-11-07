import axios from "axios"
import { apiUrl } from "../API_URL"
import { setGroup } from "../../redux/groupSlice"

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

export const getAGroup = async (token, groupId, dispatch) => {
    try {
        const res = await axios.get(`${apiUrl}/group/get-a-group/${groupId}`,{
            headers: { token: `Bearer ${token}` },
        })
        dispatch(setGroup(res.data))
        return res.data         
    } catch (error) {
        console.log(error)
    }
}

export const getMembers = async (token, groupId) => {
    try {
        const res = await axios.get(`${apiUrl}/group/get-members/${groupId}`,{
            headers: { token: `Bearer ${token}` },
        })
        return res.data         
    } catch (error) {
        console.log(error)
    }    
}

export const getPendingMembers = async (token, groupId) => {
    try {
        const res = await axios.get(`${apiUrl}/group/get-pending-members/${groupId}`,{
            headers: { token: `Bearer ${token}` },
        })
        return res.data         
    } catch (error) {
        console.log(error)
    }    
}

export const deleteMember = async (token, member, groupId) => {
    try {
        const res = await axios.post(`${apiUrl}/group/remove-members/${groupId}`, member, {
            headers: { token: `Bearer ${token}` },
        })
        return res.data          
    } catch (error) {
        console.log(error)
    }
}

export const approve = async (token, groupId, userId) => {
    try {
        const res = await axios.post(`${apiUrl}/group/accept-members/${groupId}/${userId}`, {}, {
            headers: { token: `Bearer ${token}` },
        })
        return res.data          
    } catch (error) {
        console.log(error)
    }    
}

export const decline = async (token, groupId, userId) => {
    try {
        const res = await axios.post(`${apiUrl}/group/refuse-members/${groupId}/${userId}`, {}, {
            headers: { token: `Bearer ${token}` },
        })
        return res.data          
    } catch (error) {
        console.log(error)
    }    
}
