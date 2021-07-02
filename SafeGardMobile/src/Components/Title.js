import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Colors from '../Constants/Colors'

export default function Title(props) {
  return (
    <View style={styles.titleContainer}>
      <Text style={{ ...props.style, ...styles.title }}>{props.children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: Colors.icons
  },

  titleContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})