import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

import * as appDataActions from '../store/actions.js';
import DefaultButton from '../components/CustomButton.js';
import CustomListItem from '../components/CustomListItem.js';

const employees = [
  {
    id: 'eid001',
    name: 'John Cena',
  },
  {
    id: 'eid002',
    name: 'Matthew McConnaghay',
  },
  {
    id: 'eid003',
    name: 'Sir Alex Ferguson',
  },
];

const HomeScreen = (props) => {
  const [generated, setGenerated] = useState(false);
  const today = useSelector((state) => state.appData.today);

  const dispatch = useDispatch();

  const clockedEmployeesList = useSelector(
    (state) => state.appData.clockedEmployeesList
  );

  const onAddHandler = () => {
    props.navigation.navigate('AddEntry');
  };

  const onAddUsersHandler = async () => {
    // try {
    //   await writeToAsyncStorage('allEmployeesList', employees);
    //   dispatch(appDataActions.setAllEmployeesList(employees));
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const onGenerateHandler = () => {
    setGenerated((prev) => !prev);
  };

  // write given data to Async Storage in key-value pairs
  const writeToAsyncStorage = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Welcome, Ruben</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}> Today is </Text>
            <Text style={styles.dateValue}>
              {today.getDate()}.
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
              data={employees}
              renderItem={(itemData) => (
                <CustomListItem
                  counter={itemData.index + 1}
                  content={itemData.item.name}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <DefaultButton
          width={85}
          height={60}
          color="#9E2A2B"
          pressedColor="#8C2122"
          fontSize={40}
          fontColor="#E09F3E"
          title="+"
          action={onAddHandler}
        />
        <DefaultButton
          width={150}
          height={60}
          color="#9E2A2B"
          pressedColor="#8C2122"
          fontSize={28}
          fontColor="#E09F3E"
          title="Add users"
          action={onAddUsersHandler}
        />
        <View style={styles.generateContainer}>
          <DefaultButton
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

  greetingContainer: {
    flex: 0.3,
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
