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
import CustomBtn from '../components/CustomBtn';

export default function KeySuccess({ route, navigation }) {
  const language = useContext(LanguageContext);
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const { message } = route.params;
  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height;

  return (
    <Layout style={styles.container}>
      <SharedElement style={{ zIndex: 99 }} id={"header"}>
        <Header navigation={navigation} excludedItem={""} />
      </SharedElement>
      {
        width < height &&
        <SharedElement id={"title"}>
          <Text style={styles.hello}>Key generator</Text>
        </SharedElement>
      }

      <View style={styles.main}>
        <View style={styles.roomSummary}>
          <Text style={styles.roomName}>WOW 3A</Text>
          <Text style={styles.roomDetails}>Feliks room - 4 guests</Text>
        </View>

        {message && <Text style={styles.label}>{message}</Text>}

        <CustomBtn
          action={() => navigation.navigate('ReservationSummary')}
          text="Done"
          primary
          fullWidth
          disabled={false}
        />

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
  main: {
    zIndex: 99,
    marginTop: 190,
  },
  roomSummary: {
    flexDirection: 'column',
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
  label: {
    fontSize: 55,
    fontFamily: "Kobe",
    color: "black",
    width: 500,
    marginTop: 80,
    marginBottom: 50
  }
});
