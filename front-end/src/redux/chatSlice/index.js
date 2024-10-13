import { createSlice } from '@reduxjs/toolkit'

const INIT = {
    chats:[]
}

const chat = createSlice({
    name: 'chat',
    initialState: INIT,
    reducers: {
      setChats: (state, action) => {
        state.chats = action.payload;
        return state;
      },
    },
})

export const { 
    setChats,
  } = chat.actions

export default chat.reducer