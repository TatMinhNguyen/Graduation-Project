import axios from "axios";
import { setLogin, setVerificationCode } from "../../redux/authSlice";
import { apiUrl } from "../API_URL"

export const loginUser = async (user, dispatch, navigate) => {
    try {
        const res = await axios.post(`${apiUrl}/auth/login`, user);
        console.log(res.data)

        dispatch(setLogin(res.data));
        navigate("/");
    } catch (error) {
        console.log(error);
        alert("Tài khoản hoặc mật khẩu không chính xác!");
    }
};

export const registerUser = async (newUser, dispatch, navigate) => {
    try {
        const res = await axios.post(`${apiUrl}/auth/register`, newUser);
        console.log(res.data)

        dispatch(setVerificationCode(res.data))
        navigate('/set-verify-code')
    } catch (error) {
        console.log(error);
        alert("Tài Khoản đã tồn tại!");
    }
}

export const setVeryficationCode = async (code, dispatch, navigate) => {
    try {
        const res = await axios.post(`${apiUrl}/auth/set-verify`, code);
        console.log(res.data)

        // dispatch(clearVerificationCode())
        navigate('/login')        
    } catch (error) {
        console.log(error);
        alert("Mã xác minh không đúng hoặc đã hết hạn!");        
    }
}

export const getVeryficationCode = async (email, dispatch, navigate) => {
    try {
        const res = await axios.post(`${apiUrl}/auth/get-verify`, email);
        console.log(res.data)

        dispatch(setVerificationCode(res.data))
        navigate('/set-verify-code')        
    } catch (error) {
        console.log(error);
        alert("Không tìm thấy tài khoản của bạn!");        
    }
}