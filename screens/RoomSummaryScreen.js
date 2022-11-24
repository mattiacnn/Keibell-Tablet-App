import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, FlatList, TouchableOpacity, Keyboard, Animated, Dimensions, Image } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { LanguageContext } from '../providers/LanguageProvider';
import { useTheme, useStyleSheet, StyleService, Text } from '@ui-kitten/components';
import SvgReverseBg from '../components/SvgReverseBg';
import Title from '../components/ReservationSummary/Title';
import Header from '../components/Header';
import Guest from '../components/RoomSummary/Guest';
import RoomData from '../components/RoomSummary/RoomData';
import GuestSummary from '../components/RoomSummary/GuestSummary';
import { GuestsContext } from '../providers/GuestsProvider';
import callToBackend from '../backend/call';

export default function RoomSummaryScreen({ route, navigation }) {
  const language = useContext(LanguageContext);
  const theme = useTheme();

  const styles = useStyleSheet(themedStyles);
  const width = Dimensions.get("screen").width
  const height = Dimensions.get("screen").height

  const [selectedGuest, setSelectedGuest] = useState(null);

  const opacity = useRef(new Animated.Value(1)).current;
  const headerOpacity = useRef(new Animated.Value(1)).current;
  const cardsListHeight = useRef(new Animated.Value(400)).current;

  const guests = useContext(GuestsContext);

  const { reservation_data } = route.params;

  useEffect(() => {
    callToBackend(`kiosk/reservations/${reservation_data.reservation_id}/customers/`,
      null, (result) => {
        console.log("customers are:", result)
      },
      null,
      "GET"
    );
  }, [])


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        if (width > height) {
          hideHeader();
        }
        else {
          hideCards()
        }
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (width > height) {
          showHeader();
        }
        else {
          showCards();
        }
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (selectedGuest !== null) {
      animateCardsList()
    }
  }, [selectedGuest])

  const hideHeader = () => {
    Animated.timing(headerOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
    });
  }

  const showHeader = () => {
    Animated.timing(headerOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
    });
  }

  const hideCards = () => {

    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {

    });

  }
  const showCards = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
    });
  }


  const animateCardsList = () => {
    Animated.timing(cardsListHeight, {
      toValue: 500,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
    });
  }

  const handleSummary = () => {
    if (selectedGuest !== null) {

      return (
        <Animated.View style={[animatedStyle.summaryContainer(opacity, headerOpacity), {
        }]}>
          <GuestSummary
            handleSuccess={() => navigation.navigate('KeyAmount')}
            handleScan={() => navigation.navigate('Camera', { guestId: selectedGuest })}
            guestId={selectedGuest}
          />
        </Animated.View>
      )
    }
    else {
      return (
        <RoomData />
      )
    }
  }

  return (
    <Layout style={styles.container}>

      <SvgReverseBg />
      {
        selectedGuest === null &&
        <Title title="" />
      }
      <View style={{ flexDirection: width > height ? "row" : "column", zIndex: 2 }}>
        <Animated.View style={[
          animatedStyle.headerContainer(opacity)
        ]}>
          <Animated.FlatList
            style={{ marginTop: 50, alignSelf: 'center', height: width > height ? "85%" : "auto", flexGrow: 0, maxHeight: cardsListHeight }}
            horizontal={width < height}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={guests.guests}
            renderItem={({ item, index }) => (
              <Guest
                guest={item}
                isSelected={selectedGuest === item.id}
                index={index + 1}
                progress={item.progress}
                action={() => setSelectedGuest(item.id)}
              />
            )}
            keyExtractor={item => item.name}

          />

          {
            height > width ?
              <TouchableOpacity onPress={() => navigation.navigate("RemoveGuest")}>
                <Text style={styles.helper}>Do you need to remove some guests from the reservation?</Text>
              </TouchableOpacity>

              :
              null
          }
        </Animated.View>


        {handleSummary()}

      </View>

      <Animated.View style={[styles.headerContainer, {
        bottom: height > width ? 50 : 20,
        opacity: headerOpacity,
      }]}>
        <Header isBottom={true} navigation={navigation} exlcudedItem="wifi" customWidth={500} />
      </Animated.View>

    </Layout>
  );
}

const animatedStyle = StyleService.create({
  headerContainer: (opacity) => ({
    opacity: opacity,
  }),
  summaryContainer: (opacity, headerOpacity) => ({
    transform: [{
      translateY: opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [-250, 0]  // 0 : 150, 0.5 : 75, 1 : 0
      }),
    },
    {
      translateY: headerOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [-250, 0]  // 0 : 150, 0.5 : 75, 1 : 0
      }),
    }
    ],
  })
});

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
    width: "100%",
    alignSelf: "center",
    zIndex: 3
  },
});
