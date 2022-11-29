import {
  createSlice,
} from '@reduxjs/toolkit';

import { findIndex, filter } from 'lodash'

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    types: [],
    lastFieldId: 2,
    lastCategoryId: 0,
  },
  reducers: {
    editCategoryName: (state: any, action: any) => {
      const { types } = state
      const { payload: { categoryId, value } } = action
      const index = findIndex(types, { id: categoryId })
      types[index].name = value
    },
    editFieldName: (state: any, action: any) => {
      const { types } = state
      const { payload: { categoryId, field, value } } = action
      const index = findIndex(types, { id: categoryId })
      const {fields} = types[index]
      const fieldIndex = findIndex(fields, { id: field.id })
      fields[fieldIndex] = { ...field, name: value }
    },
    addNewField: (state: any, action: any) => {
      const { types } = state
      const { payload: { categoryId, fieldType } } = action
      const index = findIndex(types, { id: categoryId })
      const type = types[index]
      const { fields } = type
      const newId = state.lastFieldId++
      types[index].fields = [...fields, { id: newId, name: '', type: fieldType }]
      state = { ...state, types, lastFieldId: newId }
    },
    deleteCategoryField: (state: any, action: any) => {
      const { types } = state
      const { payload: { categoryId, fieldId} } = action
      const index = findIndex(state.types, { id: categoryId })
      const type = types[index]
      const { fields } = type
      state.types[index].fields = [...filter(fields, field => field.id !== fieldId)]
    },
    deleteCategory: (state: any, action: any) => {
      const { types } = state
      const { payload: { categoryId} } = action
      state.types = [...filter(types, type => type.id !== categoryId)]
    },
    addDefaultField: (state: any, action: any) => {
      const { types } = state
      const { payload: { categoryId } } = action
      const index = findIndex(state.types, { id: categoryId })
      const newId = state.lastFieldId++
      types[index].fields.push({ id: newId, name: '', type: 'TEXT' })
      state.lastFieldId = newId
    },
    addNewCategory: (state: any) => {
      let { types, lastCategoryId, ...prop } = state
      const newCategoryId = +lastCategoryId + 1
      const type = {
        id: newCategoryId,
        name: '',
        fields: [{ id: 0, name: '', type: 'TEXT' }]
      }
      state = { ...prop, lastCategoryId: newCategoryId, types: [...types, type]}
      return state
    },
    deleteAll: (state: any) => {
      state.types = []
    }
  },
});

export const { 
  addNewField, 
  deleteCategoryField, 
  editCategoryName, 
  editFieldName, 
  addDefaultField, 
  deleteCategory,
  addNewCategory,
  deleteAll } = categoriesSlice.actions
export default categoriesSlice.reducer;
