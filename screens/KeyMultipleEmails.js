import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
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

export default function KeyMultipleEmails({ navigation }) {
  const language = useContext(LanguageContext);
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const windowWidth = Dimensions.get('window').width;

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
      <SharedElement id={"title"}>
        <Text style={styles.hello}>Key generator</Text>
      </SharedElement>



      <View style={[styles.form]}>
        <View style={styles.roomSummary}>
          <Text style={styles.roomName}>WOW 3A</Text>
          <Text style={styles.roomDetails}>Feliks room - 4 guests</Text>
        </View>
        <Text style={styles.label}>Just confirm your e-mail to receive the smart keys.</Text>
        <View style={{
          marginTop: 20, marginBottom: 20, width: "100%", flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}>
          <CustomTextInput width={"45%"} type="numeric" onType={(text) => handleTyping(text)} placeholder={"feliks@tusity.com"} />
          <CustomTextInput width={"45%"} type="numeric" onType={(text) => handleTyping(text)} placeholder={"feliks@tusity.com"} />
          <CustomTextInput marginTop={20} width={"45%"} type="numeric" onType={(text) => handleTyping(text)} placeholder={"feliks@tusity.com"} />
          <CustomTextInput marginTop={20} width={"45%"} type="numeric" onType={(text) => handleTyping(text)} placeholder={"feliks@tusity.com"} />
        </View>
        <CustomBtn action={() => navigation.navigate("KeySuccess", { message: "We just sent the keys on your emails." })} fullWidth disabled={false} text="Confirm" primary />
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
    fontSize: 53,
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
    height: 600,
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
