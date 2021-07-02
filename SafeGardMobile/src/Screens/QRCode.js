import React, { useState, useEffect, useContext } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Text, View, StyleSheet, Button } from 'react-native';
import Api from '../Services/Api';
import { AuthContext } from '../AuthProvider';

export default function QRCode({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [QRData, setQRData] = useState({})
  const [scanned, setScanned] = useState(false)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await handleRequest()
    })();
  }, [QRData]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    data = JSON.parse(data)
    setQRData(data)
  };

  async function handleRequest() {
    if (QRData.type === 'checkin') {
      try {
        await Api.post('/user/checkin', { user_id: user, establishment_id: QRData.id })
        alert('Check In realizado com suscesso')
        navigation.goBack()
      } catch (e) {
        alert('Não foi possivel fazer chack in, por favor tente mais tarde ou peça um check in manual')
        console.log(e)
        navigation.goBack()
      }
    } else if (QRData.type === 'lab') {
      try {
        await Api.put('/lab/auth', { user_id: user, lab_id: QRData.id })
        alert('Autorização realizada com suscesso')
        navigation.goBack()
      } catch (e) {
        alert('Não foi possivel autorizar o laboratório, por favor tente mais tarde ou peça uma autorização manual')
        console.log(e)
        navigation.goBack()
      }
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});