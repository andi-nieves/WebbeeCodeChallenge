
import React, { useCallback, useState, useEffect } from 'react'

import { TouchableOpacity, View, StyleSheet, ViewStyle, StyleProp } from 'react-native'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

import Icon from 'react-native-vector-icons/Ionicons';

import TextField from './TextField'
import Container from './Container';
import Field from './Field';
import Typo from './Typo';

import { useAppDispatch } from '../hooks/redux';
import { addNewField, deleteCategoryField, editCategoryName, editFieldName ,addDefaultField, deleteCategory } from '../stores/categories.reducer'

interface field {
    type: any;
    id: Number,
    name: string
}
const fieldTypes = ['TEXT', 'CHECKBOX', 'DATE', 'NUMBER']

export default ({ data }: any) => {
    const [fields, setFields] = useState<field[]>([])
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (data.fields.length === 0) {
            dispatch(addDefaultField({ categoryId: data.id }))
            return
        }
        setFields(data.fields)
    }, [data])

    const handleCategoryChange = useCallback((name: string, value: string) => {
        dispatch(editCategoryName({ categoryId: data.id, value}))
    }, [data])

    const handleChange = useCallback((name:string, value: string, field: any) => {
        dispatch(editFieldName({ categoryId: data.id,  field, value }))
    }, [data])

    const handleNewField = useCallback((fieldType: string) => {
        dispatch(addNewField({ categoryId: data.id, fieldType}))
    }, [data])

    const handleRemoveField = useCallback((field: field) => {
        dispatch(deleteCategoryField({ categoryId: data.id, fieldId: field.id }))
    }, [data])

    const handleDeleteCategory = useCallback(() => {
        dispatch(deleteCategory({ categoryId: data.id }))
    }, [data])

    return <Container title={data.name}>
        <View style={style.wrapper}>
            <TextField onChange={handleCategoryChange} name="category" value={data.name} placeholder="Category Name" />
            {fields.length > 0 && fields.map((field) => <Field key={`${data.name}${data.id}${field.id}`} value={field.name} type={field.type} onChange={(name: string, value: string) => handleChange(name, value, field)} name={`field${field.id}`} placeholder={'Field'} onRemove={() => handleRemoveField(field)} />)}
            <View style={style.actionButtonWrapper}>
                <TouchableOpacity style={style.actionButtonAdd}><Menu>
                    <MenuTrigger text='ADD NEW FIELD' style={style.menuTrigger as StyleProp<ViewStyle>}/>
                    <MenuOptions>
                        {fieldTypes.map(fieldType => <MenuOption key={fieldType} onSelect={() => handleNewField(fieldType)}>
                                <Typo style={style.bottomSheetText}>{fieldType}</Typo>
                            </MenuOption>)}
                    </MenuOptions>
                </Menu></TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteCategory} style={style.actionButtonRemove}><Typo style={style.btnTextRemove}><Icon name={'trash'} size={20} color={'#3d5afe'} /> REMOVE</Typo></TouchableOpacity>
            </View>
        </View>
    </Container>
}

const style = StyleSheet.create({
    menuTrigger: {
        fontSize: 20,
        color: 'red',
        padding: 15
    },
    wrapper: {
        marginBottom: 10
    },
    actionButtonWrapper: {
        flexDirection: 'row'
    },
    actionButtonAdd: {
        backgroundColor: '#304ffe',
    },
    actionButtonRemove: {
        padding: 15,
    },
    btnTextAdd: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    btnTextRemove: {
        fontSize: 16
    },
    bottomSheetText: {
        fontSize: 16,
        padding: 10
    }
})