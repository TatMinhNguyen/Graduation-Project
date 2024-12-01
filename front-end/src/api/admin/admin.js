import axios from "axios";
import { apiUrl } from "../API_URL"
import { setPosts } from "../../redux/adminSlice";

export const getReportPosts = async (token, dispatch) => {
    try {
        const res = await axios.get(`${apiUrl}/admin/get-post-reported`, {
            headers: { token: `Bearer ${token}` },
        });
        dispatch(setPosts(res.data))
    } catch (error) {
        console.log(error)
    }
}

export const keepPost = async (token, postId) => {
    try {
        await axios.post(`${apiUrl}/admin/keep-post/${postId}`, {}, {
            headers: { token: `Bearer ${token}` },
        }); 
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = async (token, postId) => {
    try {
        await axios.delete(`${apiUrl}/admin/delete-post/${postId}`, {
            headers: { token: `Bearer ${token}` },
        }); 
    } catch (error) {
        console.log(error)
    }
}

export const getContentReportPosts = async (token, postId) => {
    try {
        const res = await axios.get(`${apiUrl}/admin/get-report-post/${postId}`, {
            headers: { token: `Bearer ${token}` },
        });
        return res.data
    } catch (error) {
        console.log(error)
    }
}