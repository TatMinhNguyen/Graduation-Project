import { createSlice } from '@reduxjs/toolkit'

const INIT =  {
    posts: [],
    users: []
}

const search = createSlice({
    name: 'search',
    initialState: INIT,
    reducers: {
      setSearchPosts: (state, action) => {
        state.posts = action.payload;
        return state;
      },
      setSearchUsers: (state, action) => {
        state.users = action.payload;
        return state;
      }
    },
})

export const { 
    setSearchPosts,
    setSearchUsers
  } = search.actions

export default search.reducer