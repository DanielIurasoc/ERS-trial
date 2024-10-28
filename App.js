import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

import * as appDataActions from './store/actions.js';
import AppNavigator from './utils/navigation.js';
import CustomFonts from './utils/fonts.js';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [storedDate, setStoredDate] = useState(null);
  const today = useSelector((state) => state.appData.today);

  const dispatch = useDispatch();

  // loading fonts
  useEffect(() => {
    // define the function
    async function prepare() {
      try {
        // read data from Async for day and clockings
        await readFromAsyncStorage('today');

        // read full list of employees
        await readFromAsyncStorage('allEmployeesList');

        // read all clockings data from async storage
        await readFromAsyncStorage('allClockings');

        await Font.loadAsync(CustomFonts);

        // artificial delay for style points
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        // something went wrong
        console.warn(e);
      } finally {
        // fonts were loaded, move on
        setFontsLoaded(true);
        setIsLoading(false);
      }
    }

    // call it
    prepare();
  }, []);

  useEffect(() => {
    async function prepare() {
      // DAY RESET LOGIC

      // get current date
      const currentDate = new Date();

      // check if the day has changed
      if (storedDate.getDate() !== currentDate.getDate()) {
        // reset today and clocked employees list in async storage
        await writeToAsyncStorage('today', currentDate);
        await writeToAsyncStorage('clockedEmployeesList', []);

        // reset today and clocked employees list in redux store
        dispatch(appDataActions.setDate(currentDate));
        dispatch(appDataActions.clearClockedEmployeesList());
      } else {
        //read data from Async for clockings
        await readFromAsyncStorage('clockedEmployeesList');
      }
    }

    if (
      storedDate instanceof Date &&
      !isNaN(storedDate) &&
      storedDate !== null
    ) {
      prepare();
    }
  }, [storedDate]);

  // read data from Async Storage
  const readFromAsyncStorage = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        switch (key) {
          case 'today':
            setStoredDate(new Date(JSON.parse(value)));
            //dispatch(appDataActions.setDate(new Date(parsedValue)));
            break;
          case 'allEmployeesList':
            dispatch(appDataActions.setAllEmployeesList(JSON.parse(value)));
            break;
          case 'clockedEmployeesList':
            dispatch(appDataActions.setClockedEmployeesList(JSON.parse(value)));
            break;
          case 'allClockings':
            dispatch(appDataActions.setAllClockingsList(JSON.parse(value)));
            break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // write data to async storage
  const writeToAsyncStorage = async (identifier, array) => {
    try {
      AsyncStorage.setItem(identifier, JSON.stringify(array));
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplashScreen();
  }, [fontsLoaded]);

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
      <AppNavigator />
    </View>
  );
}
