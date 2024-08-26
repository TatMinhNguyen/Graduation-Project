import axios from "axios";
import { apiUrl } from "../API_URL"
import { setComments } from "../../redux/postSlice";

export const getComments = async (token, dispatch, postId) => {
    try {
        const res = await axios.get(`${apiUrl}/comment/get-comments/${postId}`, {
            headers: { token: `Bearer ${token}` },
        });
        // console.log(res.data)

        dispatch(setComments(res.data));
    } catch (error) {
        console.log(error);
    }
};

export const createComment = async (token, comment) => {
    try {
        const res = await axios.post(`${apiUrl}/comment/set-comment`, comment, {
            headers: {token: `Bearer ${token}`}
        })

        return res.data;
    } catch (error) {
        console.log(error)
    }
}