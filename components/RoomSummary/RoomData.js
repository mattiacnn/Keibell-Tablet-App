import React, { useContext } from 'react';
import { Image, View, Text, Dimensions } from 'react-native';
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components';
import CustomBtn from '../CustomBtn';
import ReservationData from './ReservationData';

const RoomData = (props) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const { data, icon } = props;

  const width = Dimensions.get("screen").width
  const height = Dimensions.get("screen").height

  return (
    <View style={{
      marginLeft: width > height ? 50 : 0,
    }}>
      {
        width < height ?
          <View style={{ marginTop: 20 }}>
            <CustomBtn
              text={"Go to the keys"}
              action={() => alert("key")}
              primary
              fullWidth
              disabled={false}
            />
          </View>
          : null
      }
      <View style={[styles.reservationSummary, {
        marginTop: width > height ? 30 : 30,
      }]}>
        <Text style={styles.propertyName}>Tusity WOW</Text>

        <View style={{ marginTop: 20 }}>
          <ReservationData
            icon={require('../../assets/roomIcon.png')}
            data={"Room 3A"}
          />
          <ReservationData
            icon={require('../../assets/user.png')}
            data={"4 guests"}
          />
          <ReservationData
            icon={require('../../assets/date.png')}
            data={"Check-in 20.05.2022"}
          />
          <ReservationData
            icon={require('../../assets/date.png')}
            data={"Check-out 28.05.2022"}
          />
          <ReservationData
            icon={require('../../assets/pin.png')}
            data={"Calle Pelayo 10, Las Palmas"}
          />
        </View>
      </View>
      {
        width > height ?
          <View style={{ marginTop: 30 }}>
            <CustomBtn
              text={"Go to the keys"}
              action={() => console.log(width)}
              primary
              fullWidth
              disabled={false}
            />
          </View>
          : null
      }
    </View>
  );
}
const themedStyles = StyleService.create({
  propertyName: {
    fontSize: 55,
    color: "black",
    fontFamily: "Kobe"
  },
  reservationSummary: {
    paddingLeft: 20,
  }
}
);

export default RoomData;