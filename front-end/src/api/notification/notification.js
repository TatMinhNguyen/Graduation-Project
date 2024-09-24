import axios from "axios";
import { apiUrl } from "../API_URL"

export const getNotification = async(token) => {
    try {
        const res = await axios.get(`${apiUrl}/notification/get-notification`, {
            headers: { token: `Bearer ${token}` },
        });

        return res.data
    } catch (error) {
        console.log(error)
    }
}