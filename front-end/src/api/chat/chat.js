import axios from "axios";
import { apiUrl } from "../API_URL"
import { setChats } from "../../redux/chatSlice";


export const getUserChat = async (token, dispatch) => {
    try {
        const res = await axios.get(`${apiUrl}/chat/get-user-chat`, {
            headers: { token: `Bearer ${token}` },
        });
        // console.log(res.data)
        dispatch(setChats(res.data))
    } catch (error) {
        console.log(error);
    }
};