import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen.js';
import AddScreen from '../screens/AddScreen.js';
import SettingsScreen from '../screens/SettingsScreen.js';
import Colors from './colors.js';

const myStack = createStackNavigator();

function StackNavigator() {
  return (
    <myStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: Colors.primary4,
        },
        headerTintColor: Colors.light1,
        headerTitleStyle: {
          color: Colors.light1,
        },
      }}
      backBehaviour="history"
    >
      <myStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <myStack.Screen
        name="AddEntry"
        component={AddScreen}
        options={{
          headerShown: true,
          title: 'Add Entry',
          // backgroundColor: Colors.light1,
        }}
      />
      <myStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          title: 'Settings',
          // backgroundColor: Colors.primary4,
        }}
      />
    </myStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
