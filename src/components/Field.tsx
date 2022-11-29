import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import TextField from './TextField';
import Icon from 'react-native-vector-icons/Ionicons';
import Typo from './Typo';

import { StyleSheet } from 'react-native';


export default ({ onRemove, ...props }: any) => <View style={style.wrapper}>
    <View style={{ flex: 1 }}>
    <TextField {...props} style={style.text} />
    </View>
    <Typo style={style.type}>{props.type}</Typo>
    <TouchableOpacity onPress={() => onRemove()} style={style.delete}>
        <Icon name={'trash'} size={20} color={'#3d5afe'} />
    </TouchableOpacity>
</View>

const style = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    text: {
        width: '100%',
        marginBottom: 0,
    },
    type: {
        fontSize: 16,
        marginRight: 10,
        marginLeft: 10,
        color: '#3d5afe',
        fontWeight: 'bold'
    },
    delete: {
        width: 30,
    }
  });