import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import Api from '../Services/Api';
import LabCards from '../Components/LabCards';
import BaseScreen from '../Components/BaseScreen';
import StatusBarTheme from '../Components/StatusBarTheme';
import Header from '../Components/Header'
import { AuthContext } from '../AuthProvider';
import Title from '../Components/Title'


export default function Home(props) {
  const [hasChanges, setHasChanges] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [labs, setLabs] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    (async () => {
      setIsRefreshing(true)
      const labList = await Api.get('/user/labs/' + user)
      setLabs(labList.data)
      setHasChanges(false)
      setIsRefreshing(false)
    })()
  }, [hasChanges])
  return (
    <BaseScreen >
      <StatusBarTheme />
      <Header />
      <View style={styles.content}>
        <Title>Laboratórios</Title>
        <FlatList refreshing={isRefreshing} onRefresh={() => { setHasChanges(true) }} data={labs} renderItem={({ item }) => <LabCards item={item} userId={user} hasChanges={setHasChanges} />} keyExtractor={item => String(item.id)} />
      </View>
    </BaseScreen>
  )
}



const styles = StyleSheet.create({
  content: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});