import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Typo from './Typo';

export default ({ text, onPress, type = "primary", icon }: any) => <TouchableOpacity onPress={onPress} style={type === "primary" ? style.primary : style.secondary}><Typo style={type === "primary" ? style.textPrimary : style.textSecondary}>{icon && <Icon name={icon} size={20} style={{ marginTop: 5, marginRight: 5 }} color={'#3d5afe'} />}{text}</Typo></TouchableOpacity>

const style = StyleSheet.create({
    primary: {
        backgroundColor: '#304ffe',
        padding: 15,
    },
    secondary: {
        padding: 15,
    },
    textPrimary: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold'
    },
    textSecondary: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});