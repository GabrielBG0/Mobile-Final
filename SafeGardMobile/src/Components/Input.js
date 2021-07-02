import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import Colors from '../Constants/Colors'

export default function Input(props) {
  return (
    <TextInput {...props} style={{ ...styles.input, ...props.style }} />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 20,
    width: '100%',
    maxWidth: 300,
    backgroundColor: Colors.BGColor,
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  }
})