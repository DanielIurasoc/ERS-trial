import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../utils/colors.js';
import CustomButton from '../components/CustomButton.js';
import CustomListItem from '../components/CustomListItem.js';

const HomeScreen = (props) => {
  const today = useSelector((state) => state.appData.today);
  const allEmployeesList = useSelector(
    (state) => state.appData.allEmployeesList
  );
  const clockedEmployeesList = useSelector(
    (state) => state.appData.clockedEmployeesList
  );

  const onAddHandler = () => {
    props.navigation.navigate('AddEntry');
  };

  const onSettingsHandler = () => {
    props.navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary4} barStyle={'light-content'} />
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/Logo_ERS.png')}
            style={styles.logoImage}
          />
        </View>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Welcome, Ruben</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}> Today is </Text>
            <Text style={styles.dateValue}>
              {today.getDate() < 10
                ? '0' + today.getDate().toString()
                : today.getDate()}
              .
              {today.getMonth() < 9
                ? '0' + today.getMonth().toString() + 1
                : today.getMonth() + 1}
              .{today.getFullYear()}
            </Text>
          </View>
        </View>
        <View>
          <SafeAreaView style={styles.employeesList}>
            <Text style={styles.listTitle}>So far, you added entries for:</Text>
            <FlatList
              data={clockedEmployeesList}
              renderItem={(itemData) => (
                <CustomListItem
                  counter={itemData.index + 1}
                  content={
                    allEmployeesList.find((emp) => emp.id === itemData.item)
                      .name
                  }
                />
              )}
              keyExtractor={(item) => item}
            />
          </SafeAreaView>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <View style={styles.mainButtonsContainer}>
          <CustomButton
            width={150}
            height={60}
            color={Colors.blue3} //"#9E2A2B"
            pressedColor={Colors.blue4} //"#8C2122"
            fontSize={28}
            fontColor={Colors.light1} //"#E09F3E"
            title="Settings"
            action={onSettingsHandler}
          />
          <CustomButton
            width={85}
            height={60}
            color={Colors.primary2} //"#9E2A2B"
            pressedColor={Colors.primary4} //"#8C2122"
            fontSize={40}
            fontColor={Colors.light1} //"#E09F3E"
            title="+"
            action={onAddHandler}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: Colors.light1, //'#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerContainer: {
    flex: 0.6,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  logoContainer: {
    flex: 4,
    // paddingVertical: '5%',
  },

  logoImage: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.2,
    maxHeight: 150,
    resizeMode: 'stretch',
    paddingVertical: '0%',
  },

  greetingContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  greetingText: {
    fontSize: 26,
    fontWeight: '600',
    color: Colors.dark,
  },

  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dateText: {
    fontSize: 20,
    color: Colors.dark,
  },

  dateValue: {
    fontSize: 20,
    color: Colors.primary1, //'#9E2A2B',
    fontWeight: '600',
  },

  listTitle: {
    color: Colors.dark,
    textAlign: 'center',
  },

  employeesList: {
    flex: 0.5,
  },

  actionsContainer: {
    flex: 0.3,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  mainButtonsContainer: {
    flex: 0.5,
    // paddingHorizontal: 50,
    paddingRight: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
