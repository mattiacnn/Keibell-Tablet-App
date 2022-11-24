import React, { useContext } from 'react';
import { Image, View, Text } from 'react-native';
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components';

const ReservationData = (props) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const { data, icon } = props;

  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={icon} style={styles.icon} />
      <Text style={styles.data}>{data}</Text>
    </View>
  );
}
const themedStyles = StyleService.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10
  },
  icon: {
    height: 30,
  },
  info: {

  },
  data: {
    fontFamily: "Kobe",
    color: "black",
    fontSize: 30,
    marginLeft: 20
  }
}
);

export default ReservationData;