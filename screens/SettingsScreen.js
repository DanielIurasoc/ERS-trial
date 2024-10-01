import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SelectList } from 'react-native-dropdown-select-list';

import * as appDataActions from '../store/actions.js';
import SettingsCard from '../components/SettingsCard.js';
import CustomTextInputField from '../components/CustomTextInputField.js';

const SettingsScreen = (props) => {
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

  return (
    <View style={styles.container}>
      {/* ADD NEW EMPLOYEE */}
      <SettingsCard
        title="Add new employee"
        iconName="account-multiple-plus"
        confirmText="Add employee"
        onConfirm={onConfirmAddHandler}
        onCancel={onCancelAddHandler}
      >
        <CustomTextInputField
          label="Employee name"
          value={newEmployee.name}
          placeholder="enter here"
          iconName="account-plus-outline"
          action={(text) => handleInputChange(text)}
        />
      </SettingsCard>

      {/* DELETE AN EMPLOYEE */}
      <SettingsCard
        title="Delete an employee"
        iconName="account-multiple-remove"
        confirmText="Delete employee"
        onConfirm={onConfirmDeleteHandler}
        onCancel={onCancelDeleteHandler}
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
            borderColor: '#9E2A2B',
          }}
          inputStyles={{ fontSize: 18, fontWeight: '700', color: '#000' }}
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
      </SettingsCard>
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

  deleteEmployeeContainer: {
    height: 150,
    maxHeight: Dimensions.get('window').height * 0.4,
    width: '90%',
    borderRadius: 20,
    borderColor: '#000',
  },
});

export default SettingsScreen;
