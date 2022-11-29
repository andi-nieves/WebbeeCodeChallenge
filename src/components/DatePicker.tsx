import React, { useState, useCallback } from 'react'
import { View, TouchableOpacity } from 'react-native'
import TextField from './TextField';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'

export default ({ field, ...prop }: any) => {
    const [showDate, setShowDate] = useState<boolean>(false)
    const [value, setValue] = useState<string>()

    const dateChangeHandler = useCallback((value: any) => {
        const val = moment(value).format('MM/DD/YYYY')
        setValue(val)
        setShowDate(false)
        prop.onChange(field.name, val)
    }, [field, value])

    return <View>
        <TouchableOpacity style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }} onPress={() => { console.log('test'); setShowDate(true) }} />
        <DateTimePickerModal
            isVisible={showDate}
            mode="date"
            onConfirm={dateChangeHandler}
            onCancel={() => setShowDate(false)}
        />
        <TextField
            editable={false}
            value={value}
            {...prop} name={`field${field.id}`} placeholder={field.name} />

    </View>
}