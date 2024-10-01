import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-native-date-picker';
import { SelectList } from 'react-native-dropdown-select-list';

import * as appDataActions from '../store/actions.js';
import CustomButton from '../components/CustomButton.js';
import CustomInputField from '../components/CustomInputField.js';
import CustomTextInputField from '../components/CustomTextInputField.js';

const AddScreen = (props) => {
  // FORM DATA
  const [formState, setFormState] = useState({
    employeeId: '',
    date: ' - ', //useSelector((state) => state.appData.date),
    dateOpen: false,
    startTime: ' - ', //useSelector((state) => state.appData.startTime),
    startOpen: false,
    endTime: ' - ', //useSelector((state) => state.appData.endTime),
    endOpen: false,
    location: '',
    description: '',
    advancePayment: 0,
    changed: false,
    isValid: false,
  });

  const {
    employeeId,
    date,
    dateOpen,
    startTime,
    startOpen,
    endTime,
    endOpen,
    location,
    description,
    advancePayment,
    changed,
    isValid,
  } = formState;

  const allEmployeesList = useSelector(
    (state) => state.appData.allEmployeesList
  );

  const dispatch = useDispatch();

  // method to update a specific field in the form state
  const updateDataField = (identifier, value) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [identifier]: value,
    }));
  };

  // clear the form data on submit
  const clearData = () => {
    updateDataField('locationName', ' - ');
    updateDataField('date', ' - ');
    updateDataField('startTime', ' - ');
    updateDataField('endTime', ' - ');
    updateDataField('pauseTime', ' 00 : 00 ');
    updateDataField('isValid', false);
  };

  // TEXT INPUT HANDLER FOR PERSONAL DATA
  const handleInputChange = (field, text) => {
    setFormState((prevUserData) => ({
      ...prevUserData,
      [field]: text,
    }));

    if (!changed) {
      setFormState((prevUserData) => ({
        ...prevUserData,
        changed: true,
      }));
    }
  };

  const onConfirmHandler = () => {
    props.navigation.goBack();
    dispatch(appDataActions.addClockedEmployee(employeeId));
    // console.log(allEmployeesList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Manual entry for: </Text>

      {/* EMPLOYEE PICKER */}
      <SelectList
        // onSelect={() => console.log(employeeId)}
        setSelected={(selected) => {
          updateDataField('employeeId', selected);
        }}
        data={allEmployeesList.map((employee) => ({
          key: employee.id,
          value: employee.name,
        }))}
        save="key"
        boxStyles={{
          width: '80%',
          height: 58,
          lineHeight: 40,
          borderWidth: 3,
          borderRadius: 20,
          paddingVertical: 15,
          paddingLeft: 15,
          marginVertical: 10,
          borderColor: '#9E2A2B',
        }}
        inputStyles={{ fontSize: 18, fontWeight: '700', color: '#000' }}
        placeholder="Select the employee"
        dropdownStyles={{
          zIndex: 999,
          position: 'absolute',
          top: 60,
          width: '80%',
          lineHeight: 40,
          backgroundColor: '#fff',
          borderRadius: 20,
          borderColor: '#9E2A2B',
        }}
        dropdownTextStyles={{ fontSize: 16, color: '#000' }}
      />

      {/* DATE PICKER */}
      <CustomInputField
        label="Date"
        value={date !== ' - ' ? date.toLocaleDateString('ro-RO') : date}
        iconName="calendar-clock-outline"
        action={() => {
          updateDataField('dateOpen', true);
        }}
      />
      <DatePicker
        modal
        mode="date"
        maximumDate={new Date()}
        open={dateOpen}
        date={date === ' - ' ? new Date() : date}
        onConfirm={(date) => {
          updateDataField('dateOpen', false);
          updateDataField('date', date);
          // dispatch(appDataActions.setClockingData('date', date));
        }}
        onCancel={() => {
          updateDataField('dateOpen', false);
        }}
      />

      {/* START TIME */}
      <CustomInputField
        label="Start time"
        value={
          startTime === ' - '
            ? startTime
            : ' ' +
              startTime.getHours().toString().padStart(2, '0') +
              ' : ' +
              startTime.getMinutes().toString().padStart(2, '0')
        }
        iconName="clock-edit-outline"
        action={() => {
          updateDataField('startOpen', true);
        }}
      />
      <DatePicker
        modal
        mode="time"
        locale="ro"
        is24hourSource="locale"
        minuteInterval={5}
        title="Select the start time"
        open={startOpen}
        date={startTime === ' - ' ? new Date() : startTime}
        onConfirm={(date) => {
          updateDataField('startOpen', false);
          updateDataField('startTime', date);
          //   dispatch(appDataActions.setClockingData('startTime', date));
        }}
        onCancel={() => {
          updateDataField('startOpen', false);
        }}
      />

      {/* END TIMEE */}
      <CustomInputField
        label="End time"
        value={
          endTime === ' - '
            ? endTime
            : ' ' +
              endTime.getHours().toString().padStart(2, '0') +
              ' : ' +
              endTime.getMinutes().toString().padStart(2, '0')
        }
        iconName="clock-check-outline"
        action={() => {
          updateDataField('endOpen', true);
        }}
      />
      <DatePicker
        modal
        mode="time"
        locale="ro"
        is24hourSource="locale"
        minuteInterval={5}
        title="Select the finish time"
        open={endOpen}
        date={endTime === ' - ' ? new Date() : endTime}
        onConfirm={(date) => {
          updateDataField('endOpen', false);
          updateDataField('endTime', date);
          //   dispatch(appDataActions.setClockingData('endTime', date));
        }}
        onCancel={() => {
          updateDataField('endOpen', false);
        }}
      />

      {/* LOCATION INPUT */}
      <CustomTextInputField
        label="Location"
        value={location}
        placeholder="enter here"
        iconName="map-marker-outline"
        action={(text) => handleInputChange('location', text)}
      />

      {/* DESCRIPTION INPUT */}
      <CustomTextInputField
        label="Description"
        value={description}
        placeholder="enter here"
        iconName="comment-text-outline"
        action={(text) => handleInputChange('description', text)}
      />

      {/* ADVANCE PAYMENT INPUT */}
      <CustomTextInputField
        label="Advance payment"
        value={advancePayment}
        placeholder="enter here"
        iconName="cash-multiple"
        action={(text) => handleInputChange('advancePayment', text)}
        keyboardType="numeric"
      />
      <CustomButton
        width={120}
        height={45}
        color="#335C67"
        pressedColor="#214751"
        fontSize={18}
        fontColor="#E09F3E"
        title="Add Entry"
        action={onConfirmHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default AddScreen;
