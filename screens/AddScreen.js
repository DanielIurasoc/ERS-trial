import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { SelectList } from 'react-native-dropdown-select-list';

import DefaultButton from '../components/CustomButton.js';
import CustomInputField from '../components/CustomInputField.js';
import CustomTextInputField from '../components/CustomTextInputField.js';

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

const AddScreen = (props) => {
  const [selected, setSelected] = useState('');
  // FORM DATA
  const [formState, setFormState] = useState({
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

    if (!formState.changed) {
      setFormState((prevUserData) => ({
        ...prevUserData,
        changed: true,
      }));
    }
  };

  const onConfirmHandler = () => {
    console.log(formState);
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Manual entry for </Text>

      {/* EMPLOYEE PICKER */}
      <SelectList
        setSelected={setSelected}
        data={employees}
        save="name"
        // fontFamily="poppins-regular"
        boxStyles={{
          width: 150,
          lineHeight: 40,
          borderColor: '#9E2A2B',
        }}
        inputStyles={{ fontSize: 14 }}
        defaultOption={{ key: '1', value: 'John Cena' }}
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

      <DefaultButton
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default AddScreen;
