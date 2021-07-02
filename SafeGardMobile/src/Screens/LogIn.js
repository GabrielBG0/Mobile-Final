import React, { useState, useContext } from 'react'
import { TouchableWithoutFeedback, Keyboard, View, StyleSheet, Image, Text, Button } from 'react-native'
import StatusBarTheme from '../Components/StatusBarTheme'
import Input from '../Components/Input'
import Colors from '../Constants/Colors'
import BaseScreen from '../Components/BaseScreen'
import { AuthContext } from '../AuthProvider'

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
    }}>
      <BaseScreen>
        <StatusBarTheme />
        <View style={styles.header}>
          <Image source={require('../../assets/Logo.png')}
            style={{ width: 40, height: 40 }} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Log In</Text>
          <View style={styles.formInputs}>
            <View style={styles.inputGroup}>
              <Text>Email</Text>
              <Input onChangeText={Iemail => setEmail(Iemail)} autoCapitalize='none' autoCompleteType='email' />
            </View>
            <View style={styles.inputGroup}>
              <Text>Senha</Text>
              <Input onChangeText={Ipassword => setPassword(Ipassword)} secureTextEntry={true} />
            </View >
            <View style={styles.formButtons}>
              <View style={styles.butttonSize}><Button title='Back' onPress={() => { }} color={Colors.danger} /></View>
              <View style={styles.butttonSize}><Button title='Confirm' onPress={async () => { login(email, password) }} color={Colors.StatusBar} /></View>
            </View>
          </View>
        </View>
      </BaseScreen>
    </TouchableWithoutFeedback >
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.tooBarBG,
    width: '100%',
    height: '100%',
    paddingHorizontal: 10
  },
  content: {
    width: '100%',
    height: '100%',
    marginVertical: 10,
    paddingHorizontal: 20,
    flex: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  formInputs: {
    flex: 1,
    width: '100%',
    height: '100%',
    margin: 5
  },
  formButtons: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
  },
  butttonSize: {
    width: 80
  },
  inputGroup: {
    marginVertical: 5,
    width: '100%',
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    borderColor: Colors.StatusBar,
    borderWidth: 1
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: Colors.icons
  },

})
