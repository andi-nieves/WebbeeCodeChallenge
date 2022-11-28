
import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default ({ children, style,...props }: any) => <Text {...props} style={{ ...defStyle.text, ...style}}>{children}</Text>

const defStyle = StyleSheet.create({
    text: {
        color: '#333'
    }
  });