import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import Api from '../Services/Api';
import LocationCards from '../Components/LocationCard';
import BaseScreen from '../Components/BaseScreen';
import StatusBarTheme from '../Components/StatusBarTheme';
import Header from '../Components/Header'
import { AuthContext } from '../AuthProvider';


export default function Home(props) {
  const [locations, setLocaions] = useState([])
  const { user, logout } = useContext(AuthContext)

  useEffect(() => {
    (async () => {
      const locationsList = await Api.get('/user/establishments/' + user)
      setLocaions(locationsList.data)
    })()
  }, [])
  return (
    <BaseScreen >
      <StatusBarTheme />
      <Header />
      <View style={styles.content}>
        {locations.map((location) => (
          <LocationCards key={location.id} risk={false} locationName={location.name} />
        ))}
        <Button title='logout' onPress={() => { logout() }} ></Button>
      </View>
    </BaseScreen>
  )
}



const styles = StyleSheet.create({
  content: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});