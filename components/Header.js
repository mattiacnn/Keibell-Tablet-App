import React, { useContext } from 'react';
import { Image, View, Dimensions } from 'react-native';
import { LanguageContext } from '../providers/LanguageProvider';
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components';
import HelperBtn from './HelperBtn';
import {
  SharedElement,
} from 'react-navigation-shared-element';

const Header = (props) => {
  const language = useContext(LanguageContext);
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const { navigation, isBottom, exlcudedItem, customWidth } = props;
  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height;

  return (
    <View style={{ }}>
      {isBottom !== true &&
        <Image source={require('../assets/logo.png')} style={width > height ? styles.logoV : styles.logo} />
      }
      <View style={[styles.row, { marginTop: isBottom === true ? 0 : width > height ? 40 : 50, width: customWidth ? customWidth : width > height ? 500 : "100%" }]}>
        <HelperBtn
          action={() => navigation.goBack()}
          icon={require('../assets/back.png')}
        />
        {exlcudedItem !== "wifi" &&
          <HelperBtn
            icon={require('../assets/wifi.png')}
            text={""}
          />}
        <HelperBtn
          icon={require('../assets/assistance.png')}
          text={"Assistance"}
        />
      </View>
    </View>
  );
}
const themedStyles = StyleService.create({
  logo: {
    height: 47,
    width: 81,
    resizeMode: "contain",
    alignSelf: 'center',
    marginTop: 80
  },
  logoV: {
    height: 47,
    width: 81,
    resizeMode: "contain",
    position:"absolute",
    right:20,
    marginTop:60
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}
);

export default Header;