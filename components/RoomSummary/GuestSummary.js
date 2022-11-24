import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, FlatList, ScrollView, Dimensions, Image, Modal } from 'react-native';
import { useTheme, useStyleSheet, StyleService, Text } from '@ui-kitten/components';
import { LanguageContext } from '../../providers/LanguageProvider';
import CustomBtn from '../CustomBtn';
import CustomTextInput from '../CustomTextInput';
import { SignaturePad } from './SignaturePad';
import { GuestsContext } from '../../providers/GuestsProvider';

const GuestSummary = (props) => {
  const language = useContext(LanguageContext);
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [showSignature, setShowSignature] = useState(false);

  // get params from navigation
  const { guestId, handleSuccess, handleScan } = props;

  const width = Dimensions.get("screen").width
  const height = Dimensions.get("screen").height


  const guestsContext = useContext(GuestsContext);
  const guests = guestsContext.guests;

  const index = guests.findIndex(guest => guest.id === guestId);
  const selectedGuest = guests[index];

  const onBegin = () => {
    setScrollEnabled(false);
  }

  const onEnd = () => {
    setScrollEnabled(true);
  }

  const scan = () => {
    handleScan()
  }

  useEffect(() => {
    console.log(guestId)
  }, [])

  return (

    <View style={{
      width: width > height ? "80%" : "100%",
      marginLeft: width > height ? "4%" : "0%",

    }}>
      <Text style={styles.title}>Personal Information</Text>

      <CustomBtn
        text={"Scan your id"}
        icon={require('../../assets/scan.png')}
        action={() => scan()}
        primary
        fullWidth
        disabled={false}
      />

      <Text style={styles.helper}>Or put manually</Text>

      <View style={[styles.dataContainer]}>
        <ScrollView
          scrollEnabled={scrollEnabled}
          contentContainerStyle={styles.listContainer}
          style={[styles.listStyle]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <CustomTextInput
            placeholder={"First Name"}
            value={selectedGuest ? selectedGuest.firstName : ""}
            width={"48%"}
            noMargin={true}
            marginTop={20}
          />
          <CustomTextInput
            placeholder={"First Name"}
            value={selectedGuest ? selectedGuest.lastName : ""}
            width={"48%"}
            noMargin={true}
            marginTop={20}
          />

          <CustomTextInput
            placeholder={"Date of birth"}
            value={selectedGuest ? selectedGuest.dob : ""}
            width={"32%"}
            noMargin={true}
            marginTop={20}
          />
          <CustomTextInput
            placeholder={"Sex"}
            width={"32%"}
            value={selectedGuest ? selectedGuest.sex : ""}
            noMargin={true}
            marginTop={20}
          />
          <CustomTextInput
            placeholder={"Nationality"}
            value={selectedGuest ? selectedGuest.nationality_full : ""}
            width={"32%"}
            noMargin={true}
            marginTop={20}
          />

          <CustomTextInput
            placeholder={"Type of document"}
            value={selectedGuest ? selectedGuest.documentType : ""}
            width={"48%"}
            noMargin={true}
            marginTop={20}
          />
          <CustomTextInput
            placeholder={"Id number"}
            value={selectedGuest ? selectedGuest.documentNumber : ""}
            width={"48%"}
            noMargin={true}
            marginTop={20}
          />

          <View style={{ marginTop: 20, width: "100%" }}>
            <CustomBtn
              text={"Validate"}
              action={() => setShowSignature(true)}
              primary
              fullWidth
              disabled={false}
            />
          </View>
        </ScrollView>

        <Modal transparent visible={showSignature} animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.signatureContainer}>
              <Text style={styles.signTitle}>Your sign here:</Text>
              <SignaturePad
                onOK={() => setShowSignature(false)}
                onBegin={onBegin}
                onEnd={onEnd}
                success={handleSuccess}
              />
            </View>
          </View>
        </Modal>

        <Image
          source={require('../../assets/mask.png')}
          style={styles.mask} />
      </View>


    </View>
  );
}

const themedStyles = StyleService.create({
  container: {
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
    marginLeft: 20,
    marginTop: 20
  },
  headerContainer: {
    position: 'absolute',
    bottom: 50,
    width: "100%",
    alignSelf: "center"
  },
  title: {
    fontSize: 55,
    color: "black",
    fontFamily: "Kobe",
    marginTop: 30,
    marginBottom: 30
  },
  listStyle: {
    width: "100%",
    height: "90%"
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 70
  },
  reservationSummary: {
    paddingLeft: 20,
    marginTop: 30
  },
  dataContainer: {
    marginTop: 20,
    width: "100%",
    height: 300,
  },
  mask: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "20%",
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signatureContainer: {
    width: 500,
    height: 600,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 20
  },
  signTitle: {
    color: "black",
    fontSize: 25,
    alignSelf: "center"
  }
});

export default GuestSummary;