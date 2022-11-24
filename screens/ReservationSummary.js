import React, { useContext, useEffect } from 'react';
import { View, FlatList, Dimensions, Image } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { LanguageContext } from '../providers/LanguageProvider';
import { useTheme, useStyleSheet, StyleService, Text } from '@ui-kitten/components';
import SvgReverseBg from '../components/SvgReverseBg';
import Title from '../components/ReservationSummary/Title';
import ReservationCard from '../components/ReservationSummary/ReservationCard';
import Header from '../components/Header';
import callToBackend from '../backend/call';

export default function ReservationSummary({ route, navigation }) {
  const language = useContext(LanguageContext);
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const width = Dimensions.get("screen").width
  const height = Dimensions.get("screen").height

  const { reservation_data } = route.params;


  const reservations = [
    {
      client: 'John Doe',
    },
    {
      client: 'Feliks Kasmi',
    },
    {
      client: 'Daniel dallago',
    },
    {
      client: 'Mattia Cannavò',
    },
  ]

  useEffect(() => {
    callToBackend(`kiosk/reservations/${reservation_data.reservation_id}/customers/`,
      null, (result) => {
        console.log("customers are:", result)
      },
      null,
      "GET"
    );
  }, [])



  return (
    <Layout style={styles.container}>
      <SvgReverseBg />
      <Title title="Your Reservation" />


      <Image
        source={require('../assets/s1.png')}
        style={{ right: 0, height: 350, width: 200, top: 200, position: "absolute", zIndex: 99 }}
      />

      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={reservations}
        horizontal={width > height}
        renderItem={({ item }) => (
          <ReservationCard action={() => navigation.navigate("RoomSummary")} client={item.client} />
        )}
        keyExtractor={item => item.client}
      />


      <View style={styles.headerContainer}>
        <Header isBottom={true} navigation={navigation} customWidth={500} />
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
  list: {
    marginTop: 20,
    maxHeight: 740
  },
  listContent: {
  },
  headerContainer: {
    position: 'absolute',
    bottom: 30,
    width: "100%",
    alignSelf: "center"
  },
  shadow: {
    position: "absolute",
    right: 50,
    top: 110

  }
});
