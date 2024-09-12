import { createSlice } from '@reduxjs/toolkit'

const INIT =  {
    posts: [],
    userPosts: [],
    comments: []
}

const post = createSlice({
    name: 'post',
    initialState: INIT,
    reducers: {
      setAllPosts: (state, action) => {
        state.posts = action.payload;
        return state;
      },
      setUserPost: (state, action) => {
        state.userPosts = action.payload;
        return state
      },
      setComments: (state, action) => {
        state.comments = action.payload;
        return state;
      }
    },
})

export const { 
    setAllPosts,
    setUserPost,
    setComments
  } = post.actions
  
export default post.reducer