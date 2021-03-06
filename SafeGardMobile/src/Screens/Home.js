import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, Dimensions } from 'react-native'
import Api from '../Services/Api';
import LocationCards from '../Components/LocationCard';
import BaseScreen from '../Components/BaseScreen';
import StatusBarTheme from '../Components/StatusBarTheme';
import Header from '../Components/Header'
import { AuthContext } from '../AuthProvider';
import Title from '../Components/Title';


export default function Home(props) {
  const [change, setChange] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [locations, setLocaions] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    (async () => {
      setIsRefreshing(true)
      const locationsList = await Api.get('/user/establishments/' + user)
      setLocaions(locationsList.data)
      setChange(false)
    })()
    setIsRefreshing(false)
  }, [change])
  return (
    <BaseScreen >
      <StatusBarTheme />
      <Header />
      <View style={styles.content}>
        <Title>Home</Title>
        <FlatList refreshing={isRefreshing} onRefresh={() => { setChange(true) }} data={locations} renderItem={LocationCards} keyExtractor={item => String(item.id)} />
      </View>
    </BaseScreen>
  )
}



const styles = StyleSheet.create({
  content: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});