import {
  createSlice,
} from '@reduxjs/toolkit';

import { findIndex, map } from 'lodash'

const categoriesSlice = createSlice({
  name: 'user',
  initialState: {
    types: [{
      id: 1,
      name: 'Machines',
      fields: []
    },
    {
      id: 2,
      name: 'Cars',
      fields: []
    }
    ],
    lastId: 2
  },
  reducers: {
    addCategory: (state: any, action: any) => { 
      const { types } = state
      const { payload } = action
      const index = findIndex(state.types, {id: payload.categoryId })
      const type = types[index]
      const {fields} = type
      const newId = state.lastId++
      types[index].fields = [...fields, { id: newId, title: '', type: payload.fieldType }]
      state = { ...state, types, lastId: newId}
     }
  },
});

export const { addCategory } = categoriesSlice.actions
export default categoriesSlice.reducer;
