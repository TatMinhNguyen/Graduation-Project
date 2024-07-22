import { createSlice } from '@reduxjs/toolkit'

const INIT =  {
    posts: [],
    post: {}
}

const post = createSlice({
    name: 'post',
    initialState: INIT,
    reducers: {
      setAllPosts: (state, action) => {
        state.posts = action.payload;
        return state;
      },
      setPost: (state, action) => {
        state.post = action.payload;
        return state
      }
    },
})

export const { 
    setAllPosts,
    setPost
  } = post.actions
  
export default post.reducer