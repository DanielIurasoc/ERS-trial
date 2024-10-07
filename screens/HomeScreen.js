import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const exportToExcelFile = async () => {
    try {
      // read data from Async Storage
      const clockings = await AsyncStorage.getItem('clockings');
      const clockingsArray = clockings ? JSON.parse(clockings) : [];

      if (clockingsArray.length === 0) {
        console.log('No data to export...');
        return;
      }

      // create a new workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(clockingsArray);

      // append the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Clockings');

      // write the excel file as a binary string
      const base64 = XLSX.write(workbook, { type: 'base64' });

      // create a name for the file
      const fileName = FileSystem.documentDirectory + 'clockings_report.xlsx';

      // save it
      await FileSystem.writeAsStringAsync(fileName, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Share the file
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileName);

        // show a message
        setGenerated((prev) => !prev);
      } else {
        console.log('Sharing is not available on this device');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onGenerateHandler = () => {
    // call the function to export
    exportToExcelFile();

    // clear the clocked employees list
    dispatch(appDataActions.clearClockedEmployeesList());

    // clear the clocked entries from Async Storage
    // dispatch(appDataActions.clearClockingsFromAsyncStorage());
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
