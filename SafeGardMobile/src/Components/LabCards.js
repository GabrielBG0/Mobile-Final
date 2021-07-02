import React, { useContext } from 'react'
import { StyleSheet, Text, Dimensions, View, TouchableOpacity } from 'react-native';
import Api from '../Services/Api';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Constants/Colors';

export default function LocationCards(props) {
  async function handleUnauth() {
    const response = await Api.put('/lab/unauth', { user_id: props.userId, lab_id: props.item.id })

    if (response.status == 202) {
      props.hasChanges(true)
    }
  }
  return (
    <View style={styles.card}>
      <Text>{props.item.name}</Text>
      <TouchableOpacity style={styles.button} onPress={handleUnauth}>
        <Ionicons name='close-circle' size={30} color={Colors.danger} />
        <Text style={styles.bTxt}>Revogar Autorização</Text>
      </TouchableOpacity>
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
  },
  button: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bTxt: {
    margin: 5,
  }
})