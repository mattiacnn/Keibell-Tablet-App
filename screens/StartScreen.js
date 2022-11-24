import React, { useContext, useEffect } from 'react';
import { Pressable, Image, Dimensions } from 'react-native';
import { LanguageContext } from '../providers/LanguageProvider';
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components';
import { Text } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function StartScreen({ navigation }) {
  const language = useContext(LanguageContext);
  
  let deviceWidth = Dimensions.get('window').width
  let deviceHeight = Dimensions.get('window').width

  useEffect(() => {
    checkForToken();    
  }), []


  const checkForToken = async () => {
    const jsonToken = await AsyncStorage.getItem('@token')
    if (jsonToken === null) {
      navigation.navigate('SetUp');
    }
    else {
      jsonToken = await JSON.parse(jsonToken)
    }
  }

  return (
    <LinearGradient
      colors={['#F9C151', '#FACB66', '#FBD57C']}
      style={styles.container(deviceWidth, deviceHeight)}
      start={{ x: 0.1, y: 0.5 }}
      end={{ x: 0, y: 1 }}

    >
      <Pressable style={{ height: "100%", width: "100%" }} onPress={() => navigation.navigate("Identification")}>
        <>
          <Image source={require('../assets/font-logo.png')} style={styles.logo} />
          <Text style={styles.title(deviceWidth, deviceHeight)}>
            Tap to start
          </Text>
        </>
      </Pressable>

    </LinearGradient >

  );
}

const styles = StyleService.create({
  container: (deviceWidth, deviceHeight) => ({
    flex: 1,
    paddingLeft: 130,
    paddingRight: 130,
    paddingTop: deviceWidth > deviceHeight ? 100 : 150,
    justifyContent: "flex-start",

  }),
  logo: {
    height: 96,
    width: 379
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 150
  },
  title: (deviceWidth, deviceHeight) => ({
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    fontFamily: "Kobe",
    position: "absolute",
    bottom: deviceWidth > deviceHeight ? 500 : 100,
    alignSelf: "center"
  })
});
