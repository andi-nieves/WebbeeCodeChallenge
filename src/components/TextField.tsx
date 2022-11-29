import React from 'react'
import { View } from 'react-native'
import { InputOutline } from 'react-native-input-outline';

export default ({ placeholder, name, onChange, value, style, ...prop }: any) => <View style={{ marginBottom: 10, ...style }}>
    <InputOutline
        placeholder={placeholder}
        paddingVertical={0}
        paddingHorizontal={5}
        value={value}
        onChangeText={(value) => onChange(name, value)}
        fontSize={16}
        {...prop}
    />
</View>