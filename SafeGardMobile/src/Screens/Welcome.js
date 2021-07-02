import React from 'react'
import { TouchableWithoutFeedback, Keyboard, View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native'
import StatusBarTheme from '../Components/StatusBarTheme'
import Colors from '../Constants/Colors'
import BaseScreen from '../Components/BaseScreen'
import Title from '../Components/Title'

export default function Welcome({ navigation }) {

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
    }}>
      <BaseScreen>
        <StatusBarTheme />
        <View style={styles.content}>
          <View style={styles.header}>
            <Image source={require('../../assets/Logo.png')}
              style={{ width: 150, height: 150, margin: 20 }} />
            <Title >Bem Vindo ao Kora</Title>
          </View>
          <View style={styles.wButtons}>
            <TouchableOpacity onPress={() => { navigation.navigate('LogIn') }} style={styles.button}>
              <Text>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Register') }} style={styles.button}>
              <Text>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BaseScreen>
    </TouchableWithoutFeedback >
  )
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    flex: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.StatusBar
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wButtons: {
    width: '100%',
    height: '40%',
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center'
  },
  button: {
    margin: 12,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Colors.icons

  }
})
