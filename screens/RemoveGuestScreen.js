import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, FlatList, TouchableOpacity, Keyboard, Animated } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { LanguageContext } from '../providers/LanguageProvider';
import { useTheme, useStyleSheet, StyleService, Text } from '@ui-kitten/components';
import SvgReverseBg from '../components/SvgReverseBg';
import Title from '../components/ReservationSummary/Title';
import Header from '../components/Header';
import { Picker } from '@react-native-picker/picker';
import CustomTextInput from '../components/CustomTextInput';
import CustomBtn from '../components/CustomBtn';

export default function RemoveGuestScreen({ navigation }) {
  const language = useContext(LanguageContext);
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [selectedGuest, setSelectedGuest] = useState();
  const [selectedReason, setSelectedReason] = useState();

  return (
    <Layout style={styles.container}>
      <SvgReverseBg />
      <Title title="Remove guest" />

      <View style={styles.headerContainer}>
        <Header isBottom={true} navigation={navigation} exlcudedItem="wifi" customWidth={500} />
      </View>


      <View style={styles.form}>
        <View style={styles.picker}>
          <Picker
            style={[{ width: '100%' }]}
            selectedValue={selectedGuest}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedGuest(itemValue)
            }>

            <Picker.Item label="Select guest" value="" />
            <Picker.Item label="Mattia Cannavò" value="Mattia cannavò" />
            <Picker.Item label="Feliks Kasmi" value="Feliks kasmi" />
            <Picker.Item label="Daniel Dallago" value="Daniel dallago" />
          </Picker>
        </View>

        <View style={styles.picker}>
          <Picker
            style={[{ width: '100%' }]}
            selectedValue={selectedReason}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedReason(itemValue)
            }>
            <Picker.Item label="Select reason" value="" />
            <Picker.Item label="Lost the flight" value="Lost the flight" />
            <Picker.Item label="Work" value="Work" />
          </Picker>
        </View>



        <CustomTextInput
          width={"100%"}
          placeholder={"Comments"}
          fontSize={17}
        />


        <CustomBtn
          action={() => navigation.goBack()}
          text="Confirm cancellation"
          primary
          fullWidth
          disabled={false}
        />
      </View>



    </Layout >
  );
}

const animatedStyle = StyleService.create({
  headerContainer: (opacity) => ({
    opacity: opacity,
  }),
  summaryContainer: (opacity) => ({
    transform: [{
      translateY: opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [-250, 0]  // 0 : 150, 0.5 : 75, 1 : 0
      }),
    }],
  })
});

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'color-primary-500',
    flex: 1,
    paddingLeft: 50,
    paddingRight: 50,
  },
  form:{
    justifyContent:"space-evenly",
    height:"45%"
  },
  hello: {
    color: 'white',
    fontSize: 90,
    marginTop: 120
  },
  list: {
    marginTop: 20
  },
  listContent: {
  },
  helper: {
    color: 'color-info-500',
    fontSize: 16,
    opacity: 0.3,
    textDecorationLine: "underline",
    marginLeft: 20,
    marginTop: 20
  },
  headerContainer: {
    position: 'absolute',
    bottom: 50,
    width: "100%",
    alignSelf: "center"
  },
  picker: {
    backgroundColor: 'white',
    minWidth: 80,
    borderRadius: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    height: 82
  },
  pickerInput: {
    fontSize: 26,
  }
});
