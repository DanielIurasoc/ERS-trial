import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

import * as appDataActions from '../store/actions.js';
import CustomButton from '../components/CustomButton.js';
import CustomListItem from '../components/CustomListItem.js';

const HomeScreen = (props) => {
  const [generated, setGenerated] = useState(false);

  const today = useSelector((state) => state.appData.today);
  const allEmployeesList = useSelector(
    (state) => state.appData.allEmployeesList
  );
  const clockedEmployeesList = useSelector(
    (state) => state.appData.clockedEmployeesList
  );

  const dispatch = useDispatch();

  const onAddHandler = () => {
    props.navigation.navigate('AddEntry');
  };

  const onSettingsHandler = () => {
    props.navigation.navigate('Settings');
  };

  const onGenerateHandler = () => {
    setGenerated((prev) => !prev);
    dispatch(appDataActions.clearClockedEmployeesList());
  };

  // write given data to Async Storage in key-value pairs
  const writeToAsyncStorage = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  };

  return (
    <View style={styles.container}>
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
              {today.getMonth() < 10
                ? '0' + today.getMonth().toString()
                : today.getMonth()}
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
            color="#9E2A2B"
            pressedColor="#8C2122"
            fontSize={28}
            fontColor="#E09F3E"
            title="Settings"
            action={onSettingsHandler}
          />
          <CustomButton
            width={85}
            height={60}
            color="#9E2A2B"
            pressedColor="#8C2122"
            fontSize={40}
            fontColor="#E09F3E"
            title="+"
            action={onAddHandler}
          />
        </View>
        <View style={styles.generateContainer}>
          <CustomButton
            width={205}
            height={60}
            color="#335C67"
            pressedColor="#214751"
            fontSize={20}
            fontColor="#E09F3E"
            title="Generate Excel file"
            action={onGenerateHandler}
          />
          {generated && (
            <Text style={styles.generateText}>
              File generated at location \Documents\ERS_Reports\ERS_092023.xlsx
            </Text>
          )}
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
    backgroundColor: '#fff',
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
  },

  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dateText: {
    fontSize: 20,
  },

  dateValue: {
    fontSize: 20,
    color: '#9E2A2B',
    fontWeight: '600',
  },

  listTitle: {
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

  generateContainer: {
    flex: 0.5,
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  generateText: {
    fontSize: 14,
    color: '#2C9E2A',
    textAlign: 'center',
  },
});
