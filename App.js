import './gesture-handler';
import React, { useState, useCallback, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

import AppNavigator from './utils/navigation.js';
import * as appDataActions from './store/actions.js';
import CustomFonts from './utils/fonts.js';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const today = useSelector((state) => state.appData.today);

  const dispatch = useDispatch();

  // loading fonts
  useEffect(() => {
    // define the function
    async function prepare() {
      try {
        const now = new Date();
        if (today === null || today.getDate() !== now.getDate()) {
          dispatch(appDataActions.setDate(now));
        }
        await readFromAsyncStorage('today');
        await readFromAsyncStorage('allEmployeesList');
        await readFromAsyncStorage('clockedEmployeesList');

        await Font.loadAsync(CustomFonts);

        // artificial delay for style points
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        // something went wrong
        console.warn(e);
      } finally {
        // fonts were loaded, move on
        console.log('pass');
        setFontsLoaded(true);
        setIsLoading(false);
      }
    }

    // call it
    prepare();
  }, []);

  // read data from Async Storage
  const readFromAsyncStorage = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log(value);
        switch (key) {
          case 'today':
            dispatch(appDataActions.setDate(value));
            break;
          case 'allEmployeesList':
            dispatch(appDataActions.setAllEmployeesList(JSON.parse(value)));
            break;
          case 'clockedEmployeesList':
            dispatch(appDataActions.setClockedEmployeesList(JSON.parse(value)));
            break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        console.log('sad');
        await SplashScreen.hideAsync();
      }
    };
    hideSplashScreen();
  }, [fontsLoaded]);

  // Show/Hide the loading screen
  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     console.log('entered layoutrootview');
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  if (!fontsLoaded || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> Loading. Please wait </Text>
        <ActivityIndicator size="large" color="#9E2A2B" />
      </View>
    );
  }

  // fonts couldn't be loaded, error message shown instead of main app
  if (!fontsLoaded) {
    return <Text> Error occured while loading fonts! </Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* // onLayout={onLayoutRootView}> */}
      <AppNavigator />
    </View>
  );
}
