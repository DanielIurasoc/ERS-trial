import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Alert,
  Keyboard,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-native-date-picker';
import { SelectList } from 'react-native-dropdown-select-list';

import * as appDataActions from '../store/actions.js';
import CustomButton from '../components/CustomButton.js';
import CustomInputField from '../components/CustomInputField.js';
import CustomTextInputField from '../components/CustomTextInputField.js';
import Colors from '../utils/colors.js';
import CustomToggleButton from '../components/CustomToggleButton.js';
import { useFocusEffect } from '@react-navigation/native';

const AddScreen = (props) => {
  // ERROR DATA
  const [errorState, setErrorState] = useState({
    employeeId: false,
    changedEmployeeId: 0,
    location: false,
    changedLocation: 0,
    description: false,
    advancePayment: false,
  });

  // FORM DATA
  const [formState, setFormState] = useState({
    employeeId: '',
    date: new Date(),
    dateOpen: false,
    hoursWorked: 8,

    location: '',
    description: '',
    advancePayment: 0,
    changed: 0,
  });

  const {
    employeeId,
    date,
    dateOpen,
    hoursWorked,
    location,
    description,
    advancePayment,
  } = formState;

  const today = useSelector((state) => state.appData.today);
  const allEmployeesList = useSelector(
    (state) => state.appData.allEmployeesList
  );

  const dispatch = useDispatch();

  const locationInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const advancePaymentInputRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      resetForms();
      trackChange('changedEmployeeId');
    }, [])
  );

  useEffect(() => {
    // check if employee id field validity everytime there is a change, but not on screen load
    if (
      errorState.changedEmployeeId !== 0 &&
      (employeeId === 'default' || employeeId === '')
    ) {
      // set error for employee
      setError('employeeId');
    } else {
      // clear error for employee
      clearError('employeeId');
    }
  }, [errorState.changedEmployeeId]);

  // useEffect(() => {
  //   // check if start time field validity everytime there is a change, but not on screen load
  //   if (errorState.changedStartTime !== 0 && startTime === ' - ') {
  //     // set error for start time
  //     setError('startTime');
  //   } else {
  //     // clear error for start time
  //     clearError('startTime');
  //   }
  // }, [errorState.changedStartTime]);

  // useEffect(() => {
  //   // check if end time field validity everytime there is a change, but not on screen load
  //   if (errorState.changedEndTime !== 0 && endTime === ' - ') {
  //     // set error for end time
  //     setError('endTime');
  //   } else {
  //     // clear error for end time
  //     clearError('endTime');
  //   }
  // }, [errorState.changedEndTime]);

  // useEffect(() => {
  //   // check if locatton field validity everytime there is a change, but not on screen load
  //   if (errorState.changedLocation !== 0 && location === '') {
  //     // set error for location
  //     setError('location');
  //   } else {
  //     // clear error for location
  //     clearError('location');
  //   }
  // }, [errorState.changedLocation]);

  // method to update a specific field in the form state
  const updateDataField = (identifier, value) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [identifier]: value,
    }));

    // if field is not-functional (not for opening forms) track change
    if (!identifier.includes('Open') && !identifier.includes('employeeId')) {
      // create change identifier
      const changeIdentifier =
        'changed' + identifier.charAt(0).toUpperCase() + identifier.slice(1);
      trackChange(changeIdentifier);
    }
  };

  // TEXT INPUT HANDLER FOR PERSONAL DATA
  const handleInputChange = (field, text) => {
    setFormState((prevUserData) => ({
      ...prevUserData,
      [field]: text,
    }));
  };

  // track each change on fields
  const trackChange = (identifier) => {
    setErrorState((prevState) => {
      return {
        ...prevState,
        [identifier]: prevState[identifier] + 1,
      };
    });
  };

  // set error for wanted field
  const setError = (field) => {
    setErrorState((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  // clear error for wanted field
  const clearError = (field) => {
    setErrorState((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };

  // false -> invalid, true -> valid
  const checkFormValidity = () => {
    let valid = true;
    // check validity for the employee field
    if (employeeId === 'default' || employeeId === '') {
      // set error for employee
      setError('employeeId');
      valid = false;
    }

    // date is filled by default with current day, no need to check validity
    // if (date === ' - ') {
    //   setError('date');
    //   valid = false;
    // }

    // check the validity for the start time field
    // if (startTime === ' - ') {
    //   // set error for startTime
    //   setError('startTime');
    //   valid = false;
    // }

    // check validity for the end time field
    // if (endTime === ' - ') {
    //   // set error for endTime
    //   setError('endTime');
    //   valid = false;
    // }

    // check validity for location field
    // if (location === '') {
    //   // set error for location
    //   setError('location');
    //   valid = false;
    // }

    // description is optional, no need to check validity
    // if (description === '') {
    //   setMessage('Please enter a description!');
    //   setError('description');
    //   valid = false;
    // }

    // advance payment is filled by default with 0, no need to check validity
    // if (advancePayment === 0) {
    //   setMessage('Please enter an advanced payment sum!');
    //   setError('advancePayment');
    //   valid = false;
    // }

    return valid;
  };

  const onConfirmHandler = async () => {
    if (checkFormValidity()) {
      Keyboard.dismiss();

      // form is valid
      const clocking = {
        employeeId,
        date: date.toISOString(),
        hoursWorked: hoursWorked.toString(),
        location,
        description,
        advancePayment,
      };

      const response = await dispatch(appDataActions.addClocking(clocking));

      if (response) {
        // save the date if not already saved
        dispatch(appDataActions.updateTodayInAsyncStorage(today));

        // props.navigation.navigate('ListClockingsStack');
        resetForms();
        // selectListRef.setSelected('default');
      } else {
        Alert.alert(
          'Problem occured!',
          'A clocking with the same date already exists for this employee. You can edit/delete it from the main screen'
        );
      }
    } else {
      // form is not valid
    }
  };

  const resetForms = () => {
    setFormState({
      employeeId: '',
      date: new Date(),
      dateOpen: false,
      hoursWorked: 8,
      location: '',
      description: '',
      advancePayment: 0,
      changed: 0,
    });

    setErrorState({
      employeeId: false,
      changedEmployeeId: 0,
      location: false,
      changedLocation: 0,
      description: false,
      advancePayment: false,
    });
    trackChange('changedEmployeeId');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary4} barStyle={'light-content'} />
      <Text style={styles.title}> Manual entry for: </Text>

      <View style={styles.fieldContainer}>
        {/* EMPLOYEE PICKER */}
        <SelectList
          setSelected={(selected) => {
            updateDataField('employeeId', selected);
          }}
          data={[
            {
              key: 'default',
              value: 'Select the employee',
            },
            ...allEmployeesList.map((employee) => ({
              key: employee.id,
              value: employee.name,
            })),
          ]}
          save="key"
          boxStyles={styles.boxStyles}
          inputStyles={styles.inputStyles}
          placeholder="Select the employee!"
          // defaultOption={'default'}
          key={errorState.changedEmployeeId}
          dropdownStyles={{
            zIndex: 999,
            position: 'absolute',
            top: 60,
            width: Dimensions.get('window').width * 0.8, //'80%',
            lineHeight: 40,
            backgroundColor: Colors.light1, //'#fff',
            borderRadius: 20,
            borderColor: Colors.primary5, //'#9E2A2B',
          }}
          dropdownTextStyles={styles.dropdownTextStyles}
        />
        {errorState.employeeId && (
          <Text style={styles.errorText}>*please pick an employee!</Text>
        )}
      </View>

      {/* DATE PICKER */}
      <View style={styles.fieldContainer}>
        <CustomInputField
          label="Date"
          value={
            date !== ' - '
              ? date.toLocaleDateString('ro-RO')
              : new Date().toLocaleDateString('ro-RO')
          }
          iconName="calendar-clock-outline"
          action={() => {
            updateDataField('dateOpen', true);
          }}
        />
        {/* {errorState.employee && (
          <Text style={styles.errorText}>*please pick an employee!</Text>
        )} */}
      </View>
      <DatePicker
        modal
        mode="date"
        maximumDate={new Date()}
        open={dateOpen}
        date={date === ' - ' ? new Date() : date}
        onConfirm={(date) => {
          updateDataField('dateOpen', false);
          updateDataField('date', date);
        }}
        onCancel={() => {
          updateDataField('dateOpen', false);
        }}
      />

      <View style={styles.fieldContainer}>
        <CustomToggleButton
          onPress={(hours) => {
            updateDataField('hoursWorked', hours);
          }}
        />
      </View>

      {/* START TIME */}
      {/* <View style={styles.fieldContainer}>
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
        {errorState.startTime && (
          <Text style={styles.errorText}>*please pick a starting time!</Text>
        )}
      </View>
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
          date.setMinutes(Math.floor(date.getMinutes() / 5) * 5);
          updateDataField('startOpen', false);
          updateDataField('startTime', date);
        }}
        onCancel={() => {
          updateDataField('startOpen', false);
        }}
      /> */}

      {/* END TIMEE */}
      {/* <View style={styles.fieldContainer}>
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
        {errorState.endTime && (
          <Text style={styles.errorText}>*please pick en ending time!</Text>
        )}
      </View>
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
          date.setMinutes(Math.floor(date.getMinutes() / 5) * 5);
          updateDataField('endOpen', false);
          updateDataField('endTime', date);
        }}
        onCancel={() => {
          updateDataField('endOpen', false);
        }}
      /> */}

      {/* LOCATION INPUT */}
      <View style={styles.fieldContainer}>
        <CustomTextInputField
          ref={locationInputRef}
          label="Location"
          value={location}
          placeholder="enter here"
          iconName="map-marker-outline"
          action={(text) => handleInputChange('location', text)}
          returnKeyType="next"
          onSubmitEditing={() => {
            trackChange('changedLocation');
            descriptionInputRef.current?.focus();
          }}
        />
        {errorState.location && (
          <Text style={styles.errorText}>*please enter a location!</Text>
        )}
      </View>

      {/* DESCRIPTION INPUT */}
      <View style={styles.fieldContainer}>
        <CustomTextInputField
          ref={descriptionInputRef}
          label="Description"
          value={description}
          placeholder="enter if you want to"
          iconName="comment-text-outline"
          returnKeyType="next"
          action={(text) => handleInputChange('description', text)}
          onEndEditing={() => {
            advancePaymentInputRef.current?.focus();
          }}
        />
        {/* {errorState.employee && (
          <Text style={styles.errorText}>*please pick an employee!</Text>
        )} */}
      </View>

      {/* ADVANCE PAYMENT INPUT */}
      <View style={styles.fieldContainer}>
        <CustomTextInputField
          ref={advancePaymentInputRef}
          label="Advance payment"
          value={advancePayment}
          placeholder="leave empty for 0"
          iconName="cash-multiple"
          action={(text) => handleInputChange('advancePayment', text)}
          onEndEditing={() => {
            Keyboard.dismiss();
          }}
          keyboardType="numeric"
        />
        {/* {errorState.employee && (
          <Text style={styles.errorText}>*please pick an employee!</Text>
        )} */}
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          width={120}
          height={45}
          color={Colors.blue4} //"#335C67"
          pressedColor={Colors.blue5} //"#214751"
          fontSize={18}
          fontColor={Colors.light1} //"#E09F3E"
          title="Add Entry"
          action={onConfirmHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light1,
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
  },

  fieldContainer: {
    width: Dimensions.get('window').width * 0.8, //'80%',
    height: 85,
    // borderColor: '#000',
    // borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  errorText: {
    fontSize: 12,
    color: Colors.red, //'red',
    marginTop: -12,
    paddingLeft: 10,
  },

  boxStyles: {
    width: Dimensions.get('window').width * 0.8, //'80%',
    height: 58,
    lineHeight: 40,
    borderWidth: 3,
    borderRadius: 20,
    paddingVertical: 15,
    paddingLeft: 15,
    marginVertical: 10,
    borderColor: Colors.primary5, //'#9E2A2B',
  },

  inputStyles: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark, //'#000',
  },

  dropdownStyles: {
    zIndex: 999,
    position: 'absolute',
    top: 60,
    width: Dimensions.get('window').width * 0.8, //'80%',
    lineHeight: 40,
    backgroundColor: Colors.light1, //'#fff',
    borderRadius: 20,
    borderColor: Colors.primary5, //'#9E2A2B',
  },

  dropdownTextStyles: {
    fontSize: 16,
    color: Colors.dark, //'#000',
  },
});

export default AddScreen;
