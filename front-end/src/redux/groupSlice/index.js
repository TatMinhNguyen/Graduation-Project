import { createSlice } from '@reduxjs/toolkit'

const INIT = {
    groups:[],
    group: {}
}

const group = createSlice({
    name: 'group',
    initialState: INIT,
    reducers: {
      setGroups: (state, action) => {
        state.groups = action.payload;
        return state;
      },
      setGroup: (state, action) => {
        state.group = action.payload;
        return state
      }
    },
})

export const { 
    setGroups,
    setGroup
  } = group.actions

export default group.reducer