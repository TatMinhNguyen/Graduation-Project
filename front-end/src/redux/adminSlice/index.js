import { createSlice } from '@reduxjs/toolkit'

const INIT = {
    posts:[],
    users:[]
}

const admin = createSlice({
    name: 'admin',
    initialState: INIT,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
            return state;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
            return state
        }
    }
})

export const { 
    setPosts,
    setUsers
  } = admin.actions

export default admin.reducer