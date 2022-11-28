
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
import { addCategory } from '../stores/categories.reducer'


interface field {
    id: Number,
    title: string
}
const fieldTypes = ['TEXT', 'CHECKBOX', 'DATE', 'NUMBER']

export default ({ data, title }: any) => {
    const [fields, setFields] = useState<field[]>([])
    const dispatch = useAppDispatch()
    useEffect(() => {
        setFields(data.fields)
    }, [data])

    console.log('data', data, fields)
    const handleChange = useCallback((name: string, value: string) => {
        console.log('e', name, value)

    }, [data])

    const handleNewField = useCallback((fieldType: string) => {
        console.log('e=fieldType', fieldType)
        dispatch(addCategory({ categoryId: data.id, fieldType}))
    }, [data])


    return <Container title={title}>
        <View style={style.wrapper}>
            <TextField onChange={handleChange} name="category" placeholder="Category Name" />
            {fields.length === 0 && <Field onChange={handleChange} name="category" placeholder="Category Name" onRemove={() => { console.log('re') }} />}
            {fields.length > 0 && fields.map((field) => <Field key={field.id} onChange={handleChange} name={`field${field.id}`} placeholder={field.title || 'Field'} onRemove={() => { console.log('re') }} />)}
            <View style={style.actionButtonWrapper}>
                <TouchableOpacity style={style.actionButtonAdd}><Menu>
                    <MenuTrigger text='ADD NEW FIELD' style={style.menuTrigger as StyleProp<ViewStyle>}/>
                    <MenuOptions>
                        {fieldTypes.map(fieldType => <MenuOption key={fieldType} onSelect={() => handleNewField(fieldType)}>
                                <Typo style={style.bottomSheetText}>{fieldType}</Typo>
                            </MenuOption>)}
                    </MenuOptions>
                </Menu></TouchableOpacity>
                <TouchableOpacity style={style.actionButtonRemove}><Typo style={style.btnTextRemove}><Icon name={'trash'} size={20} color={'#3d5afe'} /> REMOVE</Typo></TouchableOpacity>
            </View>
        </View>
    </Container>
}

const style = StyleSheet.create({
    menuTrigger: {
        fontSize: 20,
        color: 'red'
    },
    wrapper: {
        marginBottom: 10
    },
    actionButtonWrapper: {
        flexDirection: 'row'
    },
    actionButtonAdd: {
        padding: 15,
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