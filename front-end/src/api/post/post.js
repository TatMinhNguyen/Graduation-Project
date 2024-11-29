import axios from "axios";
import { apiUrl } from "../API_URL"
import { setAllPosts, setUserPost } from "../../redux/postSlice";

export const getAllPosts = async (token, dispatch, params) => {
    try {
        const res = await axios.get(`${apiUrl}/post/get-all-posts`, {
            headers: { token: `Bearer ${token}` },
            params: params
        });
        // console.log(res.data)
        dispatch(setAllPosts(res.data));
    } catch (error) {
        console.log(error);
    }
};

export const getAPost = async (token, postId) => {
    try {
        const res = await axios.get(`${apiUrl}/post/get-a-post/${postId}`, {
            headers: { token: `Bearer ${token}` },
        });
        // console.log(res.data)

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getUserPost = async (token, userId, dispatch) => {
    try {
        const res = await axios.get(`${apiUrl}/post/get-user-post/${userId}`, {
            headers: { token: `Bearer ${token}` },
        });
        // console.log(res.data)
        dispatch(setUserPost(res.data))
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const createPost = async (token, post) => {
    try {
        const res = await axios.post(`${apiUrl}/post/create-post`, post, {
            headers: {token: `Bearer ${token}`}
        })

        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = async (token, post, postId) => {
    try {
        await axios.post(`${apiUrl}/post/update-a-post/${postId}`, post, {
            headers: {token: `Bearer ${token}`}
        })
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = async (token, postId) => {
    try {
        await axios.delete(`${apiUrl}/post/delete-post/${postId}`, {
            headers: {token: `Bearer ${token}`}
        })
    } catch (error) {
        console.log(error)
    }
}

export const reportPost = async (token, postId, data) => {
    try {
        await axios.post(`${apiUrl}/post/report-post/${postId}`, data, {
            headers: {token: `Bearer ${token}`}
        })
    } catch (error) {
        console.log(error)
    } 
}