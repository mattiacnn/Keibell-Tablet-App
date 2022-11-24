import React, { useState, useEffect, useCallback } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './keibell-theme.json'; // <-- Import app theme
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { LanguageProvider } from './providers/LanguageProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReservationQrScreen from './screens/ReservationQrScreen';
import StartScreen from './screens/StartScreen';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import IdentificationScreen from './screens/IdentificationScreen';
import {
  SharedElement,
  createSharedElementStackNavigator,
} from 'react-navigation-shared-element';
import PhoneIdentificationScreen from './screens/PhoneIdentificationScreen';
import AppLoading from 'expo-app-loading';
import NameIdentificationScreen from './screens/NameIdentificationScreen';
import ReservationSummary from './screens/ReservationSummary';
import RoomSummaryScreen from './screens/RoomSummaryScreen';
import KeyAmountScreen from './screens/KeyAmountScreen';
import KeySingleEmail from './screens/KeySingleEmail';
import KeyMultipleEmails from './screens/KeyMultipleEmails';
import KeySuccess from './screens/KeySuccess';
import RemoveGuestScreen from './screens/RemoveGuestScreen';
import SetUpScreen from './screens/SetUpScreen';
import CameraScreen from './screens/Camera';

import { GuestsProvider } from './providers/GuestsProvider';

const SharedStack = createSharedElementStackNavigator();

let customFonts = {
  'Kobe': require('./assets/fonts/zd.ttf'),
};

export default function App() {
  let [fontsLoaded] = useFonts(customFonts);


  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer theme={{ colors: { background: '#F9C151' } }}>
      <LanguageProvider>
        <IconRegistry icons={EvaIconsPack} />
        <GuestsProvider>
          <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
            {/* hide header on navigator */}
            <SharedStack.Navigator screenOptions={{
              headerShown: false
            }}>
              <SharedStack.Screen name="Home" component={StartScreen} />
              <SharedStack.Screen name="SetUp" component={SetUpScreen} />
              <SharedStack.Screen name="Identification" component={IdentificationScreen} sharedElements={(route) => {
                return ["svg"];
              }} />
              <SharedStack.Screen name="PhoneIdentification" component={PhoneIdentificationScreen} />
              <SharedStack.Screen name="NameIdentification" component={NameIdentificationScreen} sharedElements={(route) => {
                return ["header",];
              }} />
              <SharedStack.Screen name="ReadQr" component={ReservationQrScreen} sharedElements={(route) => {
                return ["header", "form"];
              }} />
              <SharedStack.Screen name="ReservationSummary" component={ReservationSummary} sharedElements={(route) => {
                return [""];
              }} />
              <SharedStack.Screen name="RoomSummary" component={RoomSummaryScreen} sharedElements={(route) => {
                return [""];
              }} />
              <SharedStack.Screen name="RemoveGuest" component={RemoveGuestScreen} sharedElements={(route) => {
                return [""];
              }} />
              <SharedStack.Screen name="KeyAmount" component={KeyAmountScreen} sharedElements={(route) => {
                return [""];
              }} />
              <SharedStack.Screen name="KeySingleEmail" component={KeySingleEmail} sharedElements={(route) => {
                return [""];
              }} />
              <SharedStack.Screen name="KeyMultipleEmails" component={KeyMultipleEmails} sharedElements={(route) => {
                return [""];
              }} />
              <SharedStack.Screen name="KeySuccess" component={KeySuccess} sharedElements={(route) => {
                return [""];
              }} />
              <SharedStack.Screen name="Camera" component={CameraScreen} sharedElements={(route) => {
                return [""];
              }} />
            </SharedStack.Navigator>
          </ApplicationProvider>
        </GuestsProvider>
      </LanguageProvider>
    </NavigationContainer>
  );
}
