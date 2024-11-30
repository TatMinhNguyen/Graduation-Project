import { createSlice } from '@reduxjs/toolkit'

const INIT = {
    posts:[],
}

const admin = createSlice({
    name: 'admin',
    initialState: INIT,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
            return state;
        },
    }
})

export const { 
    setPosts,
  } = admin.actions

export default admin.reducer