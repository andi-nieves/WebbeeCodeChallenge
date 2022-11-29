import {
  createSlice,
} from '@reduxjs/toolkit';
import { findIndex, find, filter } from 'lodash'

const categoriesSlice = createSlice({
  name: 'data',
  initialState: {
    categoryData: []
  },
  reducers: {
    addCategoryData: (state: any, action: any) => {
      const {categoryData} = state;
      const { payload: { id, types } } = action;
      const typeIndex = findIndex(categoryData, { categoryId: id })
      const defTypes = find(types, { id: id })
      const {fields} = defTypes
      const newField = fields.map((field: any) => { return { ...field, value: '' } })
      if (typeIndex > -1) {
        const category = categoryData[typeIndex]
        const {data} = category
        let newData = {
          ...category,
          data: [
            ...data,
            {
              id: category.lastId++ || 0,
              fields: newField
            }
          ]
        }
        categoryData[typeIndex] = newData
      } else {
        const newData = {
          categoryId: defTypes.id,
          lastId: 0,
          data: [
            {
              id: 0,
              fields: newField
            }
          ]
        }
        categoryData.push({...newData})
      }
    },
    deleteAll: (state: any) => {
      state.categoryData = []
    },
    deleteCategoryField: (state: any, action: any) => {
      const { categoryData } = state;
      const { payload: { categoryId, fieldId } } = action;
      const { payload: { id, types } } = action;
      const typeIndex = findIndex(categoryData, { categoryId })
      const data = categoryData[typeIndex].data 
      categoryData[typeIndex].data = [...filter(data, d => d.id !== fieldId)]
      console.log('del', fieldId, categoryData[typeIndex])
    },
    editCategoryField: (state: any, action: any) => {
      const { payload: { category, field, value } } = action;
      const { fields } = category;
      const index = findIndex(state.categoryData, { categoryId: category.categoryId })
      // console.log('cat', index)
      // const fieldIndex = findIndex(fields, { id: field.id })
      // fields[fieldIndex].value = value
      // state.categoryData[index].fields = fields
    }
  },
});

export const {

  addCategoryData,
  editCategoryField,
  deleteAll,
  deleteCategoryField,
} = categoriesSlice.actions
export default categoriesSlice.reducer;
