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