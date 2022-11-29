
import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default ({ children, color="#333", fontSize = 14, fontWeight, style,...props }: any) => <Text {...props} style={{ fontSize, fontWeight, color, ...style}}>{children}</Text>
