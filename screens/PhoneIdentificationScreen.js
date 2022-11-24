import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Keyboard,Animated } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { LanguageContext } from '../providers/LanguageProvider';
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components';
import { Text } from '@ui-kitten/components';
import {
  SharedElement,
} from 'react-navigation-shared-element';
import SvgContainer from '../components/SvgContainer';
import Header from '../components/Header'
import PhoneNumberForm from '../components/PhoneIdentification/PhoneNumberForm';
import OtpForm from '../components/PhoneIdentification/OtpForn';

export default function PhoneIdentificationScreen({ navigation }) {
  const language = useContext(LanguageContext);
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const [showOtp, setShowOtp] = useState(false);

  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height;
  const opacity = useRef(new Animated.Value(1)).current;

  const handleOtpRender = () => {
    if (showOtp === true) {
      return <OtpForm onSuccess={() => navigation.navigate("ReservationSummary")} />
    }
    else {
      return null
    }
  }


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        hideHeader() // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        showHeader(); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const hideHeader = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
    });
  }
  const showHeader = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
    });
  }

  return (
    <Layout style={styles.container}>
      <Animated.View style={animatedStyle.headerContainer(opacity)}>
        <Header navigation={navigation} excludedItem={""} />
      </Animated.View>
      {
        height > width &&
        <SharedElement id={"title"}>
          <Text style={styles.hello}>Identification</Text>
        </SharedElement>
      }

      <PhoneNumberForm afterSubmit={() => setShowOtp(true)} />
      {handleOtpRender()}

      <View style={{ zIndex: -1, position: "absolute", bottom: 0 }}>
        <SvgContainer />
      </View>

    </Layout >
  );
}
const animatedStyle = StyleService.create({
  headerContainer: (opacity) => ({
    opacity: opacity,
  }),
});


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
    height: 600
  },
  inputs: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 60,
    width: "100%"
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
