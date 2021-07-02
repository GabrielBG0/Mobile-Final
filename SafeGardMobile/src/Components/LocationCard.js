import React from 'react'
import { StyleSheet, Text, Dimensions, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Constants/Colors';

export default function LocationCards(props) {
  return (
    <View style={styles.card}>
      <Text>{props.locationName}</Text>
      <Ionicons name={props.risk ? 'alert-sharp' : 'checkmark-sharp'} size={30} color={props.risk ? Colors.danger : Colors.safe} />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    padding: 20,
    height: '100%',
    maxHeight: 75,
    width: Dimensions.get('window').width - 20,
    backgroundColor: Colors.cards,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  }
})