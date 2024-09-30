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

export const checkNotification = async(token, notificationId) => {
    try {
        await axios.post(`${apiUrl}/notification/check-notification/${notificationId}`, {}, {
            headers: {token: `Bearer ${token}`}
        })
    } catch (error) {
        console.log(error)
    }
}