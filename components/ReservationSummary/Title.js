import React, { useContext } from 'react';
import { Image, View, Text, Dimensions } from 'react-native';
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components';

const Title = (props) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const width = Dimensions.get("screen").width

  const height = Dimensions.get("screen").height

  const { navigation, title } = props;

  return (
    <View style={{ flexDirection: width > height ? "row" : "column", justifyContent: "space-between", alignItems: "center", marginTop: width > height ? 50 : 0, zIndex:3}}>
      {
        width < height &&
        <Image source={require('../../assets/logo-black.png')} style={styles.logo} />
      }
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {
        width > height &&
        <Image source={require('../../assets/logo-black.png')} style={styles.logo2} />
      }
    </View >
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
  logo2: {
    height: 47,
    width: 81,
    resizeMode: "contain",
    alignSelf: 'center',
  },
  title: {
    fontSize: 85,
    fontFamily: "Kobe",
    textAlign: "center",
  }
}
);

export default Title;