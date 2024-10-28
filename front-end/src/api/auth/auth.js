import axios from "axios";
import { setEmail, setLogin, setLogOut, setPassword, setVerificationCode } from "../../redux/authSlice";
import { apiUrl } from "../API_URL"

export const loginUser = async (user, dispatch, navigate) => {
    try {
        const res = await axios.post(`${apiUrl}/auth/login`, user);

        dispatch(setLogin(res.data));
        // dispatch(clearUser());
        navigate("/");
    } catch (error) {
        console.log(error);
        alert("Account or password is incorrect!");
    }
};

export const registerUser = async (newUser, dispatch, navigate) => {
    try {
        const res = await axios.post(`${apiUrl}/auth/register`, newUser);
        // console.log(res.data)

        dispatch(setVerificationCode(res.data))
        navigate('/set-verify-code')
    } catch (error) {
        console.log(error);
        alert("Account already exists!");
    }
}

export const setVeryficationCode = async (code, dispatch, navigate) => {
    try {
        await axios.post(`${apiUrl}/auth/set-verify`, code);

        // dispatch(clearVerificationCode())
        navigate('/login')        
    } catch (error) {
        console.log(error);
        alert("The verification code is incorrect or has expired!");        
    }
}

export const getVeryficationCode = async (email, dispatch, navigate) => {
    try {
        const res = await axios.post(`${apiUrl}/auth/get-verify`, email);
        // console.log(res.data)

        dispatch(setVerificationCode(res.data))
        dispatch(setEmail(res.data.email))
        navigate('/set-verify-code')        
    } catch (error) {
        console.log(error);
        alert("Your account could not be found or the account has been verified!");        
    }
}

export const forgotPass = async(email, dispatch)=> {
    try {
        const res = await axios.post(`${apiUrl}/auth/forgot-password`, email);

        dispatch(setEmail(res.data.email))
        dispatch(setPassword(res.data.newPassword))

        return res.data;
    } catch (error) {
        console.log(error)
        alert("Your account could not be found!");
    }
}

export const logOut = async(token, dispatch, navigate) => {
    try {
        await axios.post(`${apiUrl}/auth/logout`, {}, {
            headers: {token: `Bearer ${token}`}
        })
        dispatch(setLogOut());
        navigate('/login') 
    } catch (error) {
        console.log(error)
    }
}

export const changePassword = async (token, pass) => {
    try {
        const res =  await axios.post(`${apiUrl}/auth/change-password`, pass, {
            headers: {token: `Bearer ${token}`}
        }) 
        alert('Password changed successfully')

        return res.data;
    } catch (error) {
        console.log(error)
        alert('Incorrect old password')
    }
}