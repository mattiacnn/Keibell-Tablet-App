import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
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

export default function KeyAmountScreen({ navigation }) {
  const language = useContext(LanguageContext);
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [keyCounter, setKeyCounter] = useState(1);
  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height;


  // increment key counter
  const incrementKeyCounter = () => {
    if (keyCounter < 4) {
      setKeyCounter(keyCounter + 1);
    }
  }

  // decrement key counter
  const decrementKeyCounter = () => {
    if (keyCounter > 1) {
      setKeyCounter(keyCounter - 1);
    }
  }



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


      <View style={[styles.main, {
        marginTop: height > width ? 190 : 0,
        flexDirection: height > width ? 'column' : 'row',
        position: width > height ? 'absolute' : "relative",
        bottom:0,
        width: width > height ? "95%" : "100%",
        alignSelf:"center"
      }]}>
        <View>
          <View style={styles.roomSummary}>
            <Text style={styles.roomName}>WOW 3A</Text>
            <Text style={styles.roomDetails}>Feliks room - 4 guests</Text>
          </View>


          <Text style={styles.label}>
            How many keys do you need?
          </Text>

          {
            width > height &&
            <Text style={styles.helper}>Maximum number of keys: 4</Text>
          }
          <View style={styles.counterContainer}>
            <TouchableOpacity onPress={decrementKeyCounter}>
              <Image source={require('../assets/minus_btn.png')} style={styles.counterIcon} />
            </TouchableOpacity>
            <Text style={styles.amount}>{keyCounter}</Text>
            <TouchableOpacity onPress={incrementKeyCounter}>
              <Image source={require('../assets/plus_btn.png')} style={styles.counterIcon} />
            </TouchableOpacity>
          </View>

          {
            height > width &&
            <Text style={styles.helper}>Maximum number of keys: 4</Text>
          }
        </View>

        <View style={[styles.inputs, {
          flexDirection: width < height ? "row" : "column",
          width: "100%",
          justifyContent: width < height ? "space-between" : "center",
          marginLeft: width > height ? 60 : 0,
        }]}>
          <CustomBtn
            action={() => navigation.navigate('KeySingleEmail')}
            text="Key cards"
            customWidth={"48%"}
            icon={require('../assets/keys.png')}
            disabled={false}
          />
          <CustomBtn
            action={() => navigation.navigate('KeyMultipleEmails')}
            text="Mobile keys"
            primary
            customWidth={"49%"}
            icon={require('../assets/pkeys.png')}
            disabled={false}
            marginTop={width < height ? 0 : 40}
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
  main: {
    zIndex: 99,
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
    fontSize: 40,
    fontFamily: "Kobe",
    color: "black",
    marginTop: 30
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    width: 400,
    marginLeft: -40,
    marginTop: 0,
  },
  amount: {
    fontSize: 150,
    fontFamily: "Kobe",
    color: "black",
  },
  helper: {
    color: 'color-info-500',
    fontSize: 16,
    opacity: 0.3,
    marginBottom: 30
  },
  inputs: {
  },
});
