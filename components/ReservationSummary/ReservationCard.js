import React, { useContext } from 'react';
import { Image, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components';
import ReservationData from './ReservationData';

const ReservationCard = (props) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const width = Dimensions.get("screen").width
  const height = Dimensions.get("screen").height

  const { client, action } = props;

  return (
    <TouchableOpacity onPress={action} style={[
      styles.card,
      {
        flexDirection: width > height ? "column" : "row",
        width: width > height ? 380 : 700,
        height: width > height ? 350 : 250,
        paddingLeft: width > height ? 30 : 20,
        paddingRight: width > height ? 30 : 20,
        marginLeft: width > height ? 30 : 0,
        alignItems: width > height ? "flex-start" : "center",
        borderRadius: width > height ? 30 : 50,
        paddingTop: width > height ? 20 : 0,
        paddingBottom: width > height ? 20 : 0,

      }
    ]}>
      <View style={styles.info}>
        <Text style={[styles.client, {
          marginBottom: width > height ? 0 : 15
        }]}>{client}</Text>
        <View>
          <ReservationData data="Check-in completed" icon={require('../../assets/time.png')} />
          <ReservationData data="2 Guests" icon={require('../../assets/user.png')} />
          <View style={styles.dataRow}>
            <ReservationData data="20.05.2022" icon={require('../../assets/date.png')} />
            <ReservationData data="20.05.2022" icon={require('../../assets/arrow-right.png')} />
          </View>
        </View>
      </View>
      <View style={[styles.roomContainer, {
        width: width > height ? "100%" : 300,
        height: width > height ? 130 : 200,
        marginLeft: width > height ? 0 : 10

      }]}>
        <Image
          source={{ uri: "https://tusity.com/wp-content/themes/tusity/assets/images/28.png" }}
          style={styles.room}
        />
      </View>
    </TouchableOpacity >
  );
}
const themedStyles = StyleService.create({
  card: {
    backgroundColor: 'white',
    justifyContent: "space-around",
    marginTop: 20
  },
  roomContainer: {
    borderRadius: 30,
  },
  room: {
    width: "100%",
    height: "100%",
    borderRadius: 20
  },
  info: {
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  client: {
    fontFamily: "Kobe",
    color: "black",
    fontSize: 40,
  }
}
);

export default ReservationCard;