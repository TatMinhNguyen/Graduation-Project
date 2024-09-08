import axios from "axios";
import { apiUrl } from "../API_URL"
import { setSearchPosts, setSearchUsers } from "../../redux/searchSlice";

export const search = async(token, params, dispatch) => {
    try {
        const res = await axios.post(`${apiUrl}/search/search`, {}, {
            headers: { token: `Bearer ${token}` },
            params: params
        })
        dispatch(setSearchPosts(res.data.posts))
        dispatch(setSearchUsers(res.data.users))
        return res.data;
    } catch (error) {
        console.log(error)
    }
}