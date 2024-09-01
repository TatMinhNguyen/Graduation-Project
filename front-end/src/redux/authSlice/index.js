import { createSlice } from '@reduxjs/toolkit'

const INIT =  {
    login:{
        currentUser: null,
    },
    verificationCode: null,
    profile:{}
}

const auth = createSlice({
    name: 'auth',
    initialState: INIT,
    reducers: {
      setLogin: (state, action) => {
        state.login.currentUser = action.payload;
        return state;
      },
      setProfile:(state, action) => {
        state.profile = action.payload;
        return state;
      },
      setVerificationCode: (state, action) => {
        state.verificationCode = action.payload;
        return state;
      },
      setLogOut: (state) => {
        state.login.currentUser = null
        state.verificationCode = null
      },
      clearVerificationCode: (state) => {
        state.verificationCode = null
      }
    },
})
  
export const { 
    setLogOut,
    setLogin,
    setVerificationCode,
    clearVerificationCode,
    setProfile,
  } = auth.actions
  
export default auth.reducer