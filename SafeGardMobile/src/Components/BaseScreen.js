import React from 'react'
import { View, StyleSheet } from 'react-native'
import Colors from '../Constants/Colors';

export default function BaseScreen(props) {
  return (
    <View style={{ ...styles.baseScreen, ...props.style }}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  baseScreen: {
    flex: 1,
    backgroundColor: Colors.BGColor,
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});