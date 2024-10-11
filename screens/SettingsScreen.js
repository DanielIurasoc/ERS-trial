import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SelectList } from 'react-native-dropdown-select-list';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../utils/colors.js';
import * as appDataActions from '../store/actions.js';
import SettingsCard from '../components/SettingsCard.js';
import CustomButton from '../components/CustomButton.js';
import CustomTextInputField from '../components/CustomTextInputField.js';

const SettingsScreen = (props) => {
  const [generated, setGenerated] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    changed: false,
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [reset, setReset] = useState(0);

  const allEmployeesList = useSelector(
    (state) => state.appData.allEmployeesList
  );

  const dispatch = useDispatch();

  // TEXT INPUT HANDLER FOR PERSONAL DATA
  const handleInputChange = (text) => {
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      name: text,
    }));

    if (!newEmployee.changed) {
      setNewEmployee((prevEmployee) => ({
        ...prevEmployee,
        changed: true,
      }));
    }
  };

  const onConfirmAddHandler = () => {
    dispatch(appDataActions.addEmployee(newEmployee.name));
    handleInputChange('');
  };

  const onCancelAddHandler = () => {
    handleInputChange('');
  };

  const onConfirmDeleteHandler = () => {
    dispatch(appDataActions.deleteEmployee(selectedEmployee));
    onCancelDeleteHandler();
  };

  const onCancelDeleteHandler = () => {
    setSelectedEmployee(null);
    setReset((prev) => prev + 1);
  };

  const onGenerateHandler = () => {
    // call the function to export
    exportToExcelFile();

    // clear the clocked employees list
    dispatch(appDataActions.clearClockedEmployeesList());

    // clear the clocked entries from Async Storage
    // dispatch(appDataActions.clearClockingsFromAsyncStorage());
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
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
      //const worksheet = XLSX.utils.json_to_sheet(clockingsArray);

      // create the base sheet with all clockings
      const allClockings_WS = generateAllClockingsWorksheet(clockingsArray);

      // create the separate sheets for each employee
      let employeeSheets = [];
      allEmployeesList.forEach((employee) => {
        employeeSheets = employeeSheets.concat(
          generateEmployeeSheet(clockingsArray, employee.id)
        );
      });

      // append the base worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, allClockings_WS, 'All Clockings');

      // append all the employees sheets to the workbook
      for (let i = 0; i < employeeSheets.length; i++) {
        XLSX.utils.book_append_sheet(
          workbook,
          employeeSheets[i],
          allEmployeesList[i].name
        );
      }

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

  const generateAllClockingsWorksheet = (clockingsArray) => {
    // create the column headers
    const headers = [
      'Employee id',
      'Employee name',
      'Date',
      'Start time',
      'End time',
      'Location',
      'Description',
      'Advance Payment',
      'Worked hours',
    ];

    // map data to rows, and include a formula at the end for calculating daily worked hours
    const mappedData = clockingsArray.map((item, index) => [
      item.employeeId,
      allEmployeesList.find((emp) => emp.id === item.employeeId).name,
      formatDate(item.date),
      formatTime(item.startTime),
      formatTime(item.endTime),
      item.location,
      item.description,
      parseFloat(item.advancePayment) || 0,
      { f: `TEXT(E${index + 2}-D${index + 2}, "[h]:mm")` }, // formula here
    ]);

    // append the headers and data to the worksheet
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...mappedData]);

    return worksheet;
  };

  const generateEmployeeSheet = (clockingsArray, employeeId) => {
    // create the column headers with styling
    const headers = [
      { v: 'Date', s: { font: { bold: true, sz: 14 } } },
      { v: 'Start time', s: { font: { bold: true, sz: 14 } } },
      { v: 'End time', s: { font: { bold: true, sz: 14 } } },
      { v: 'Location', s: { font: { bold: true, sz: 14 } } },
      { v: 'Description', s: { font: { bold: true, sz: 14 } } },
      { v: 'Advance Payment', s: { font: { bold: true, sz: 14 } } },
      { v: 'Worked hours', s: { font: { bold: true, sz: 14 } } },
    ];

    // map data to rows, and include a formula at the end for calculating daily worked hours
    const filteredArray = clockingsArray.filter(
      (obj) => obj.employeeId === employeeId
    );

    const mappedData = filteredArray.map((item, index) => [
      formatDate(item.date),
      formatTime(item.startTime),
      formatTime(item.endTime),
      item.location,
      item.description,
      parseFloat(item.advancePayment) || 0,
      { f: `TEXT(C${index + 2}-B${index + 2}, "[h]:mm")` }, // formula here
    ]);

    // find the last row in the sheet
    const summaryRowIndex = mappedData.length + 2;

    // add the total row at the end with formulas
    const summaryRow = [
      'Totals',
      '',
      '',
      '',
      '',
      { f: `SUM(F2:F${summaryRowIndex - 1})` },
      {
        f: `TEXT(SUMPRODUCT((C2:C${summaryRowIndex - 1}-B2:B${
          summaryRowIndex - 1
        })), "[h]:mm")`,
      },
    ];

    // append the headers, mapped data and summary to the work sheet
    const worksheet = XLSX.utils.aoa_to_sheet([
      headers,
      ...mappedData,
      summaryRow,
    ]);

    // define the column widths
    worksheet['!cols'] = [
      { wch: 15 }, // Date column width
      { wch: 10 }, // Start time column width
      { wch: 10 }, // End time column width
      { wch: 20 }, // Location column width
      { wch: 30 }, // Description column width
      { wch: 15 }, // Advance payment column width
      { wch: 15 }, // Worked hours column width
    ];

    // merge first 5 columns on summary row for better visuals
    worksheet['!merges'] = [
      {
        s: { r: summaryRowIndex - 1, c: 0 },
        e: { r: summaryRowIndex - 1, c: 4 },
      },
    ];

    return worksheet;
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary4} barStyle={'light-content'} />

      {/* ADD NEW EMPLOYEE */}
      <SettingsCard
        title="Add new employee"
        iconName="account-multiple-plus"
        confirmText="Add employee"
        onConfirm={onConfirmAddHandler}
        onCancel={onCancelAddHandler}
      >
        <View style={styles.addContainer}>
          <CustomTextInputField
            label="Employee name"
            value={newEmployee.name}
            placeholder="enter here"
            iconName="account-plus-outline"
            action={(text) => handleInputChange(text)}
          />
        </View>
      </SettingsCard>

      {/* DELETE AN EMPLOYEE */}
      <SettingsCard
        title="Delete an employee"
        iconName="account-multiple-remove"
        confirmText="Delete employee"
        onConfirm={onConfirmDeleteHandler}
        onCancel={onCancelDeleteHandler}
        style={{ zIndex: 50 }}
      >
        {/* EMPLOYEE PICKER */}
        <SelectList
          key={reset}
          setSelected={(selected) => {
            setSelectedEmployee(selected);
          }}
          data={allEmployeesList.map((employee) => ({
            key: employee.id,
            value: employee.name,
          }))}
          save="key"
          placeholder="Select the employee"
          value={selectedEmployee}
          boxStyles={{
            width: '80%',
            height: 58,
            lineHeight: 40,
            borderWidth: 3,
            borderRadius: 20,
            paddingVertical: 15,
            paddingLeft: 15,
            marginVertical: 10,
            borderColor: Colors.primary5, //'#9E2A2B',
          }}
          inputStyles={{ fontSize: 18, fontWeight: '700', color: Colors.dark }}
          dropdownStyles={{
            zIndex: 999,
            position: 'absolute',
            top: 60,
            width: Dimensions.get('window').width * 0.7, //'80%',
            lineHeight: 40,
            backgroundColor: Colors.light1, //'#fff',
            borderRadius: 20,
            borderColor: Colors.primary5, //'#9E2A2B',
          }}
          dropdownTextStyles={{ fontSize: 16, color: Colors.dark }}
        />
      </SettingsCard>

      {/* GENERATE REPORT FILE */}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light1,
  },

  addContainer: {
    width: Dimensions.get('window').width * 0.7,
  },

  deleteEmployeeContainer: {
    height: 150,
    maxHeight: Dimensions.get('window').height * 0.4,
    width: '90%',
    borderRadius: 20,
    borderColor: Colors.dark, //'#000',
  },

  generateContainer: {
    flex: 0.5,
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 1,
  },

  generateText: {
    fontSize: 14,
    color: '#2C9E2A',
    textAlign: 'center',
  },
});

export default SettingsScreen;
