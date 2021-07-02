import React from 'react'
import Colors from '../Constants/Colors';
import { StatusBar, View, StyleSheet, Dimensions } from 'react-native';

export default function StatusBarTheme(props) {
  return (
    <View style={styles.statusBar} />
  )
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: Colors.StatusBar,
    height: StatusBar.currentHeight,
    width: Dimensions.get('window').width
  }
})