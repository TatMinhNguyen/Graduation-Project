import axios from "axios";
import { apiUrl } from "../API_URL"

export const getProfile = async (token, userId) => {
    try {
        const res = await axios.get(`${apiUrl}/user/get-profile/${userId}`, {
            headers: { token: `Bearer ${token}` },
        });
        // console.log(res.data)

        return res.data;
    } catch (error) {
        console.log(error);
    }
};