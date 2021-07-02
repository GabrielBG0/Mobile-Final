import React from 'react'
import { StyleSheet, Text, Dimensions, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Constants/Colors';

export default function LocationCards({ item }) {
  return (
    <View style={styles.card}>
      <Text>{item.name}</Text>
      <Ionicons name={item.risk == 0 ? 'checkmark-sharp' : 'alert-sharp'} size={30} color={item.risk == 1 ? Colors.danger : Colors.safe} />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
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