import axios from "axios"
import { apiUrl } from "../API_URL"
import { setGroup, setMembers } from "../../redux/groupSlice"

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

export const getMembers = async (token, groupId, dispatch) => {
    try {
        const res = await axios.get(`${apiUrl}/group/get-members/${groupId}`,{
            headers: { token: `Bearer ${token}` },
        })
        dispatch(setMembers(res.data))
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

export const editGroup = async (token, groupId, group) => {
    try {
        const res = await axios.post(`${apiUrl}/group/change-name/${groupId}`, group, {
            headers: { token: `Bearer ${token}` },
        })
        return res.data          
    } catch (error) {
        console.log(error)
    }   
}

export const editPhoto = async (token, groupId, group) => {
    try {
        const res = await axios.post(`${apiUrl}/group/change-avatar/${groupId}`, group, {
            headers: { token: `Bearer ${token}` },
        })
        return res.data          
    } catch (error) {
        console.log(error)
    }   
}

export const createGroup = async (token, group, navigate) => {
    try {
        const res = await axios.post(`${apiUrl}/group/create-group`, group, {
            headers: {token: `Bearer ${token}`}
        })

        navigate(`/groups/${res.data.group._id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getSuggestionUser = async(token) => {
    try {
        const res = await axios.get(`${apiUrl}/group/get-suggest-user`,{
            headers: { token: `Bearer ${token}` },
        })
        return res.data        
    } catch (error) {
        console.log(error)
    }
}

export const SearchSuggestionUser = async(token, input) => {
    try {
        const res = await axios.post(`${apiUrl}/group/search-suggest-user`, input, {
            headers: { token: `Bearer ${token}` },
        })
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export const SearchInviteUser = async(token, input, groupId) => {
    try {
        const res = await axios.post(`${apiUrl}/group/search-invite-user/${groupId}`, input, {
            headers: { token: `Bearer ${token}` },
        })
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export const InviteUser = async(token, member, groupId) => {
    try {
        const res = await axios.post(`${apiUrl}/group/add-members/${groupId}`, member, {
            headers: { token: `Bearer ${token}` },
        })
        return res.data;
    } catch (error) {
        console.log(error)
    }
}