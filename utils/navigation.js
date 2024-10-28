import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen.js';
import ClockingsScreen from '../screens/ClockingsScreen.js';
import DetailsScreen from '../screens/DetailsScreen.js';
import AddScreen from '../screens/AddScreen.js';
import SettingsScreen from '../screens/SettingsScreen.js';

import Colors from './colors.js';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const myBottomTab = createBottomTabNavigator();
const myStack = createStackNavigator();

// the stack navigator for clockings (list and details)
function ClockingsStack() {
  return (
    <myStack.Navigator initialRouteName="ListClockings">
      <myStack.Screen
        name="ListClockings"
        component={ClockingsScreen}
        options={{ headerShown: false }}
      />
      <myStack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({
          title: route.params?.title,
        })}
      />
    </myStack.Navigator>
  );
}

// the bottom tabs navigator for app flowf
function MainBottomTabNavigator() {
  return (
    <myBottomTab.Navigator
      initialRouteName="ListClockingsStack"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          borderTopColor: Colors.primary5,
          borderLeftColor: Colors.primary5,
          borderRightColor: Colors.primary5,
          borderTopWidth: 3,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderLeftWidth: 0.2,
          borderRightWidth: 0.2,
          overflow: 'hidden',
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.primary5,
        tabBarInactiveTintColor: '#939699',
        tabBarShowLabel: false,
      }}
    >
      <myBottomTab.Screen
        name="ListClockingsStack"
        component={ClockingsStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcon
              name="clipboard-clock-outline"
              size={40}
              color={color}
            />
          ),
        }} // force unmount when navigating away
      />
      <myBottomTab.Screen
        name="AddClocking"
        component={AddScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcon
              name="clock-edit-outline"
              size={40}
              color={color}
            />
          ),
        }}
      />
      <myBottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcon name="cog-outline" size={40} color={color} />
          ),
        }}
      />
    </myBottomTab.Navigator>
  );
}

// old stack nav
// function StackNavigator() {
//   return (
//     <myStack.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         headerShown: false,
//         headerStyle: {
//           backgroundColor: Colors.primary4,
//         },
//         headerTintColor: Colors.light1,
//         headerTitleStyle: {
//           color: Colors.light1,
//         },
//       }}
//       backBehaviour="history"
//     >
//       <myStack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           title: 'Home',
//         }}
//       />
//       <myStack.Screen
//         name="AddEntry"
//         component={AddScreen}
//         options={{
//           headerShown: true,
//           title: 'Add Entry',
//           // backgroundColor: Colors.light1,
//         }}
//       />
//       <myStack.Screen
//         name="Settings"
//         component={SettingsScreen}
//         options={{
//           headerShown: true,
//           title: 'Settings',
//           // backgroundColor: Colors.primary4,
//         }}
//       />
//     </myStack.Navigator>
//   );
// }

export default function AppNavigator() {
  return (
    <NavigationContainer>
      {/* <StackNavigator /> */}
      <MainBottomTabNavigator />
    </NavigationContainer>
  );
}
