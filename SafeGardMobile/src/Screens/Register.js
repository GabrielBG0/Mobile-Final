import React, { useState, useContext } from 'react'
import { TouchableWithoutFeedback, Keyboard, View, StyleSheet, Image, Text, Button } from 'react-native'
import StatusBarTheme from '../Components/StatusBarTheme'
import Input from '../Components/Input'
import Colors from '../Constants/Colors'
import BaseScreen from '../Components/BaseScreen'
import Title from '../Components/Title'
import Api from '../Services/Api'
import { AuthContext } from '../AuthProvider'

export default function Register({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [adress, setAdress] = useState('')
  const { returning } = useContext(AuthContext)


  async function handleRegistre() {
    const response = await Api.post('/user', {
      name,
      email,
      password,
      adress
    })

    if (response.status == 201) {
      await returning(response.data.id)
    } else {
      //TODO erro
    }
  }

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
          <Title >Cadastro</Title>
          <View style={styles.formInputs}>
            <View style={styles.inputGroup}>
              <Text>Nome</Text>
              <Input onChangeText={Inome => setName(Inome)} autoCapitalize='words' autoCompleteType='email' />
            </View>
            <View style={styles.inputGroup}>
              <Text>Email</Text>
              <Input onChangeText={Iemail => setEmail(Iemail)} autoCapitalize='none' autoCompleteType='email' />
            </View>
            <View style={styles.inputGroup}>
              <Text>Senha</Text>
              <Input onChangeText={Ipassword => setPassword(Ipassword)} autoCapitalize='none' secureTextEntry={true} />
            </View >
            <View style={styles.inputGroup}>
              <Text>Endereço</Text>
              <Input onChangeText={Iendereco => setAdress(Iendereco)} autoCapitalize='words' autoCompleteType='email' />
            </View>
            <View style={styles.formButtons}>
              <View style={styles.butttonSize}><Button title='Voltar' onPress={() => { navigation.goBack() }} color={Colors.danger} /></View>
              <View style={styles.butttonSize}><Button title='Confirmar' onPress={handleRegistre} color={Colors.icons} /></View>
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

})
