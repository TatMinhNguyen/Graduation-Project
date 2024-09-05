import axios from "axios";
import { apiUrl } from "../API_URL"

export const setFelt = async(token, data) => {
    try {
        await axios.post(`${apiUrl}/comment/set-feel`, data, {
            headers: { token: `Bearer ${token}` },
        }); 
    } catch (error) {
        console.log(error)
    }
}

export const updateFelt = async(token, data, postId) =>{
    try {
        await axios.post(`${apiUrl}/comment/update-feel/${postId}`, data, {
            headers: { token: `Bearer ${token}` },
        }); 
    } catch (error) {
        console.log(error)
    }    
}

export const unFelt = async(token, postId) => {
    try {
        await axios.delete(`${apiUrl}/comment/delete-feel/${postId}`, {
            headers: { token: `Bearer ${token}` },
        }); 
    } catch (error) {
        console.log(error)
    } 
}

export const getFelt = async(token, postId) => {
    try {
        const res = await axios.get(`${apiUrl}/comment/get-feel/${postId}`, {
            headers: { token: `Bearer ${token}` },
        }); 

        return res.data
    } catch (error) {
        console.log(error)
    } 
}

