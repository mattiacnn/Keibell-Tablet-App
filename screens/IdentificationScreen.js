import React, { useContext } from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { LanguageContext } from '../providers/LanguageProvider';
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components';
import HelperBtn from '../components/HelperBtn';
import { Text } from '@ui-kitten/components';
import {
  SharedElement,
} from 'react-navigation-shared-element';
import SvgContainer from '../components/SvgContainer';
import CustomBtn from '../components/CustomBtn';
import Header from '../components/Header'

export default function IdentificationScreen({ navigation }) {
  const language = useContext(LanguageContext);
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height;

  return (
    <Layout style={styles.container}>
      <SharedElement id="header">
        <Header navigation={navigation} excludedItem="" />
      </SharedElement>
      <SharedElement id={"title"}>
        {
          height > width &&
          <Text style={styles.hello}>Identification</Text>
        }
      </SharedElement>

      <View style={[styles.form, { height: width > height ? 500 : 600 }]}>
        <Text style={styles.label}>Identify your reservation {'\n'}and confirm your identity</Text>
        <View style={styles.inputs}>
          <View style={[styles.column, { width: width > height ? "45%" : "auto" }]}>
            <CustomBtn
              action={() => navigation.navigate('PhoneIdentification')}
              text="Phone number"
              icon={require('../assets/phone.png')}
              disabled={false}
              customWidth={width > height ? "100%" : 359}
            />
            <TouchableOpacity onPress={() => navigation.navigate("NameIdentification")}>
              <Text style={styles.textHelper}>Confirm your identity with name</Text>
            </TouchableOpacity>
          </View>
          <View style={[{ width: width > height ? "45%" : "auto",marginLeft: width > height ?  30 : 0 }]}>
            <CustomBtn
              action={() => navigation.navigate('ReadQr')}
              text="Scan QR code"
              primary
              icon={require('../assets/qr-sm.png')}
              disabled={false}
              customWidth={width > height ? "100%" : 359}
            />
          </View>

        </View>
      </View>

      <View style={{ zIndex: -1, position: "absolute", bottom: 0 }}>
        <SvgContainer />
      </View>

    </Layout>
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
    fontSize: 50,
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
    paddingLeft: 40,
    paddingRight: 40,
    zIndex: 99
  },
  inputs: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 60,
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
