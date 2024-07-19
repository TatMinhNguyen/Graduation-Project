import { createSlice } from '@reduxjs/toolkit'

const INIT =  {
    posts: []
}

const post = createSlice({
    name: 'post',
    initialState: INIT,
    reducers: {
      setAllPosts: (state, action) => {
        state.posts = action.payload;
        return state;
      },
    },
})

export const { 
    setAllPosts
  } = post.actions
  
export default post.reducer