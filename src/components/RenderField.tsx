
import React, { useState, useCallback } from 'react'
import { Switch, View, StyleSheet  } from 'react-native'
import Typo from './Typo';
import TextField from './TextField';

import DatePicker from './DatePicker';

export default ({ field, ...prop }: any) => {
    const [isEnabled, setIsEnabled] = useState<boolean>(false)
    

    const switchChangeHandler = useCallback(() => {
        if (field.type !== 'CHECKBOX') return
        setIsEnabled(!isEnabled)
        prop.onChange(field.name, !isEnabled)
    }, [field, isEnabled])

    switch (field.type) {
        case 'CHECKBOX':
            return <View style={style.checkbox}>
                <View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#304ffe" }}
                        thumbColor={isEnabled ? "#FFF" : "#304ffe"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={switchChangeHandler}
                        value={isEnabled}
                    />
                </View>
                <Typo>{field.name}</Typo>
            </View>
        case 'DATE':
            return <DatePicker field={field} {...prop} />
        case 'NUMBER':
            return <TextField keyboardType='numeric' {...prop} name={`field${field.id}`} placeholder={field.name} />
        default:
            return <TextField {...prop} name={`field${field.id}`} placeholder={field.name} />
    }
    return <View />
}

const style = StyleSheet.create({
    checkbox: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
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