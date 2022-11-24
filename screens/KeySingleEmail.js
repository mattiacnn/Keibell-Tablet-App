import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { LanguageContext } from '../providers/LanguageProvider';
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components';
import { Text } from '@ui-kitten/components';
import {
  SharedElement,
} from 'react-navigation-shared-element';
import SvgContainer from '../components/SvgContainer';
import Header from '../components/Header'
import CustomTextInput from '../components/CustomTextInput';
import CustomBtn from '../components/CustomBtn';

export default function KeySingleEmail({ navigation }) {
  const language = useContext(LanguageContext);
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // assign to variable the value of windowWidth/2 + 10%
  const inputWidth = windowWidth / 2 - (windowWidth / 100) * 10;

  const [disabled, setDisabled] = useState(true);

  const handleTyping = (text) => {
    if (text.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  return (
    <Layout style={styles.container}>
      <SharedElement style={{ zIndex: 99 }} id={"header"}>
        <Header navigation={navigation} excludedItem={""} />
      </SharedElement>

      {
        windowWidth < windowHeight &&
        <SharedElement id={"title"}>
          <Text style={styles.hello}>Key generator</Text>
        </SharedElement>
      }


      <View style={[styles.form, {
        height: windowHeight > windowWidth ? 600 : 400,
      }]}>
        <View style={styles.roomSummary}>
          <Text style={styles.roomName}>WOW 3A</Text>
          <Text style={styles.roomDetails}>Feliks room - 4 guests</Text>
        </View>
        <Text style={styles.label}>
          {
            windowWidth < windowHeight ?
              "Confirm your email to receive your key in the building!"
              :
              "Key generator"
          }
        </Text>
        <View style={{
          flexDirection: windowWidth < windowHeight ? 'column' : 'row',
          width: "100%",
          alignItems: "center",
          marginTop: windowWidth < windowHeight ? 0 : 80
        }}>
          <View style={{
            marginTop: 20,
            marginBottom: 20,
            width: windowWidth < windowHeight ? "100%" : "65%",
            marginRight: windowWidth > windowHeight ? 50 : 0,
          }}>
            <CustomTextInput width={"100%"}
              type="numeric" onType={(text) => handleTyping(text)}
              placeholder={"feliks@tusity.com"}
            />
          </View>
          <CustomBtn action={() => navigation.navigate("KeySuccess", { message: "Example txt lorem ipsum, lorem" })}
            disabled={false}
            text="Confirm"
            primary
            customWidth={windowWidth < windowHeight ? "100%" : "30%"}
          />
        </View>
      </View>

      <View style={{ zIndex: 1, position: "absolute", bottom: 0 }}>
        <SvgContainer />
      </View>

    </Layout >
  );
}


const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'color-primary-500',
    flex: 1,
    paddingLeft: 50,
    paddingRight: 50,
  },
  hello: {
    color: 'white',
    fontSize: 90,
    marginTop: 120
  },
  label: {
    fontSize: 55,
    color: "black",
    width: 657,
  },
  form: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: 99,
    paddingLeft: 50,
    paddingRight: 50,
  },
  roomSummary: {
    flexDirection: 'column',
    marginTop: -40
  },
  roomName: {
    fontSize: 50,
    fontFamily: "Kobe",
    color: "black",
  },
  roomDetails: {
    fontSize: 20,
    fontFamily: "Kobe",
    color: "black",
  },
  inputs: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 60,
    width: "100%",
    marginBottom: 60
  },
  textHelper: {
    color: "color-info-500",
    opacity: 0.4,
    textDecorationLine: 'underline',
    marginLeft: 20,
    marginTop: 20
  },
  column: {
    flexDirection: 'column',
  }
});
