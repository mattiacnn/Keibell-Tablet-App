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
import CustomTextInput from '../components/CustomTextInput';
import CustomBtn from '../components/CustomBtn';
import callToBackend from '../backend/call';

export default function NameIdentificationScreen({ navigation }) {
  const language = useContext(LanguageContext);
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // assign to variable the value of windowWidth/2 + 10%
  const inputWidth = windowWidth / 2 - (windowWidth / 100) * 10;

  const [disabled, setDisabled] = useState(true);
  const [surname, setSurname] = useState();
  const [date, setDate] = useState();

  const getFormattedDate = () => {
    const formattedDate = date;

    const year = formattedDate.substr(formattedDate.length - 4);
    const month = formattedDate.substr(3, 2);
    const day = formattedDate.substr(0, 2);

    const correctDate = year + "-" + month + "-" + day

    return correctDate;
  }

  const searchReservation = () => {
    const paramas = {
      "surname": surname.trim(),
      "checkout_date": getFormattedDate()
    }
    callToBackend('auth/guest_at_kiosk', paramas, (result) => {
      handleFoundReservations(result)
    },
      null,
      "POST"
    );

  }

  const handleFoundReservations = async (data) => {
    if (data.customer_id) {
      navigation.push("RoomSummary", {
        reservation_data: data,
      })
    }
    else {
      alert("Sorry, we cannot find any reservation with these data")
    }
  }

  const handleDateChange = (string) => {
    setDate(string)
  }

  return (
    <Layout style={styles.container}>
      <SharedElement style={{ zIndex: 99 }} id={"header"}>
        <Header navigation={navigation} excludedItem={""} />
      </SharedElement>
      <SharedElement id={"title"}>
        <Text style={styles.hello}>Identification</Text>
      </SharedElement>

      <View style={[styles.form]}>
        <Text style={styles.label}>Put your surname and check-out day</Text>
        <View style={styles.inputs}>
          <CustomTextInput
            onChangeText={(e) => setSurname(e)}
            width={inputWidth}
            keyboardType="default"
            placeholder={"Surname"}
          />
          <CustomTextInput
            onChangeText={(text) => handleDateChange(text)}
            width={inputWidth}
            keyboardType="numeric"
            placeholder={"Check-out day"}
            value={date}
            isMasked={true}
          />
        </View>
        <CustomBtn action={searchReservation} fullWidth disabled={false} text="Go to the Check-In" primary />
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
