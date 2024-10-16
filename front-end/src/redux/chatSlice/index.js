import { createSlice } from '@reduxjs/toolkit'

const INIT = {
    chats:[],
    messages:[]
}

const chat = createSlice({
    name: 'chat',
    initialState: INIT,
    reducers: {
      setChats: (state, action) => {
        state.chats = action.payload;
        return state;
      },
      setMessages: (state, action) => {
        state.messages = action.payload;
        return state;
      }
    },
})

export const { 
    setChats,
    setMessages,
  } = chat.actions

export default chat.reducer