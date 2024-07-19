import axios from "axios";
import { apiUrl } from "../API_URL"
import { setAllPosts } from "../../redux/postSlice";

export const getAllPosts = async (token, dispatch, params) => {
    try {
        const res = await axios.get(`${apiUrl}/post/get-all-posts`, {
            headers: { token: `Bearer ${token}` },
            params: params
        });
        console.log(res.data)

        dispatch(setAllPosts(res.data));
    } catch (error) {
        console.log(error);
    }
};