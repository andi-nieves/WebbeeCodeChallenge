
import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import Typo from './Typo';

export default ({children, title}: any) => <View style={style.container}>
    <Typo style={style.title}>{title}</Typo>
    {children}
</View>

const style = StyleSheet.create({
    container: {
        padding: 10, 
        marginBottom: 10
    },
    title: {
        fontSize: 30,
        color: '#333',
        marginBottom: 10,
        fontWeight: 'bold'
    }
})