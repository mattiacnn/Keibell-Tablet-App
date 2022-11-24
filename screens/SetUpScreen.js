import React, { useContext, useState } from 'react';
import { Pressable, Dimensions, TextInput } from 'react-native';
import { LanguageContext } from '../providers/LanguageProvider';
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components';
import { Text } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SetUpScreen({ navigation }) {
  const language = useContext(LanguageContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const identifyKiosk = async () => {
    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://app.keibell.com/api/auth/kiosks", requestOptions)
      .then(response => response.json())
      .then(async (result) => {
        console.log("result:")
        console.log(result);
        // verify if authentication is successful
        if (result && result.jwt) {
          // save the jwt token
          await AsyncStorage.setItem('@token', JSON.stringify(result.jwt));
          // navigate to home
          navigation.navigate('Home');
        } else {
          alert("Username or password is incorrect");
        }
      })
      .catch(error => {
        console.log('error', error);
        alert("Username or password is incorrect");
      });
  }

  let deviceWidth = Dimensions.get('window').width
  let deviceHeight = Dimensions.get('window').width

  return (
    <LinearGradient
      colors={['#F9C151', '#FACB66', '#FBD57C']}
      style={styles.container(deviceWidth, deviceHeight)}
      start={{ x: 0.1, y: 0.5 }}
      end={{ x: 0, y: 1 }}

    >
      <TextInput
        style={styles.input(deviceWidth, deviceHeight)}
        placeholder={"Kiosk username"}
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input(deviceWidth, deviceHeight)}
        placeholder={"Kiosk password"}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Pressable style={styles.button(deviceWidth, deviceHeight)} onPress={() => identifyKiosk()}>
        <>
          <Text style={styles.title(deviceWidth, deviceHeight)}>
            Login kioks
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
  input: (deviceWidth, deviceHeight) => ({
    height: 50,
    width: "100%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingLeft: 20,
    fontSize: 20,
    fontFamily: "Kobe",
    color: '#000',
    alignSelf: "center"
  }),
  button: (deviceWidth, deviceHeight) => ({
    height: 50,
    width: "100%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingLeft: 20,
    fontSize: 20,
    fontFamily: "Kobe",
    color: '#000',
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  }),
  title: (deviceWidth, deviceHeight) => ({
    fontSize: 20,
    fontFamily: "Kobe",
    color: '#000',
  }),
});
