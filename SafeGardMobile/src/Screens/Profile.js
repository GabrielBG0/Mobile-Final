import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet, Button, Text } from 'react-native'
import Api from '../Services/Api';
import BaseScreen from '../Components/BaseScreen';
import StatusBarTheme from '../Components/StatusBarTheme';
import Header from '../Components/Header'
import { AuthContext } from '../AuthProvider';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Constants/Colors';
import Title from '../Components/Title';



export default function Profile(props) {
  const [userInfo, setUserInfo] = useState([])
  const { user, logout } = useContext(AuthContext)

  useEffect(() => {
    (async () => {
      const response = await Api.get('/user/' + user)
      setUserInfo(response.data)
    })()
  }, [])
  return (
    <BaseScreen >
      <StatusBarTheme />
      <Header />
      <View style={styles.content}>
        <Title>Perfil</Title>
        <View style={styles.info}>
          <Text>Nome</Text>
          <Text >{userInfo.name}</Text>
        </View>
        <View style={styles.info}>
          <Text>Email</Text>
          <Text>{userInfo.email}</Text>
        </View>
        <View style={styles.info}>
          <Text>Endereço</Text>
          <Text>{userInfo.adress}</Text>
        </View>
        <View style={styles.button}>
          <View style={styles.info}>
            <Text>Risco</Text>
            <Ionicons name={userInfo.infected == 0 ? 'checkmark-sharp' : 'alert-sharp'} size={30} color={userInfo.infected == 0 ? Colors.safe : Colors.danger} />
          </View>
          <Button title='logout' onPress={logout} color={Colors.cards}></Button>
        </View>
      </View>
    </BaseScreen>
  )
}



const styles = StyleSheet.create({
  content: {
    flex: 10,
    padding: 20,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  info: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10
  },
});