
import React, { useEffect, useState, useCallback } from 'react'
import { View } from 'react-native'
import { find } from 'lodash'
import Container from './Container';
import RenderField from './RenderField';
import Button from './Button';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { editCategoryField, deleteCategoryField } from '../stores/data.reducer'

export default ({ data, category, item }: any) => {
    const dispatch = useAppDispatch()
    const categoryData: any = useAppSelector(({data: { categoryData }}) => find(categoryData, { categoryId: category?.id}));
    const [fields, setFields] = useState<any[]>([])

    useEffect(() => {
        setFields([...item.data])
    }, [item])

    const handleOnChange = useCallback((field: any, name: string, value: string) => {
        dispatch(editCategoryField({ category: categoryData, field, value }))
    }, [data, categoryData])

    const onRemoveHandler = useCallback(() => {
        dispatch(deleteCategoryField({ categoryId: item.categoryId, fieldId: data.id }))
         
    }, [category, data])

    const renderFields = useCallback((field:any) => {
        return field.fields.map((f:any) => <RenderField key={`field-input-${f.id}${field.id}${item.categoryId}`} onChange={(name:string, value:string) => handleOnChange(f, name, value)} field={f} />)
    }, [])

    if (!fields || fields.length === 0) return <View />

    return <Container title={'Unnamed Field'}>
        {fields.map((field:any) => renderFields(field))}
        <Button type="secondary" icon='trash' text="Remove" onPress={onRemoveHandler} />
    </Container>
}
