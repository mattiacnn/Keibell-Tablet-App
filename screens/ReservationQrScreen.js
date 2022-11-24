import { Dimensions, Text, View, Animated } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useState, useEffect, useContext, useRef } from 'react';
import QrScanner from '../components/QrScanner';
import { Layout, Spinner } from '@ui-kitten/components';
import { LanguageContext } from '../providers/LanguageProvider';
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components';
import Header from '../components/Header'
import {
  SharedElement,
} from 'react-navigation-shared-element';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReservationQrScreen({ navigation }) {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const language = useContext(LanguageContext);
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const opacity = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  
  const [loading, setLoading] = useState(true);

  const windowWidth = Dimensions.get('window').width;

  // fade in animation with duration of 500ms
  const fadeIn = () => {
    console.log("start")
    Animated.timing(
      opacity,
      {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }
    ).start();

  }

  const searchReservation = async (reservationId) => {
    let jsonToken = await AsyncStorage.getItem('@token')
    jsonToken = await JSON.parse(jsonToken)

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + jsonToken);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "reservation_id": reservationId,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://app.keibell.com/api/auth/guest_at_kiosk", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    (
      async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();

        setHasPermission(status === 'granted');

        // after 2 seconds set loading to false
        setTimeout(() => {
          setLoading(false);
          fadeIn();
        }, 1000);

      })();
  }, []);


  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const reservationId = JSON.parse(data).reservation_id;
    searchReservation(reservationId)
  };

  if (hasPermission === null) {
    return (
      <Layout style={styles.container}>
        <Spinner />
      </Layout>
    );
  }

  if (hasPermission === false) {
    return (
      <Layout style={styles.container}>
        <Text>No access to camera</Text>;
      </Layout>
    );
  }

  return (
    <View style={[styles.container]}>

      <SharedElement id={"header"}>
        <Header navigation={navigation} excludedItem={""} />
      </SharedElement>

      <Text style={styles.hello}>Scan your QR Code</Text>


      <QrScanner
        windowWidth={windowWidth}
        scanned={scanned}
        handleBarCodeScanned={handleBarCodeScanned}
      />

    </View>
  );
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "color-primary-500",
  },
  hello: {
    color: 'white',
    fontSize: 70,
    marginTop: 120
  },
  successBar: {
    backgroundColor: "#57EA15",
    height: 70,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0
  }
});
