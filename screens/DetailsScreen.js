import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../utils/colors';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import DetailsCard from '../components/DetailsCard';
import DetailsEditCard from '../components/DetailsEditCard';
import CustomButton from '../components/CustomButton';

import * as appDataActions from '../store/actions.js';

const DetailsScreen = (props) => {
  const { employeeId, date } = props.route.params;

  const [editEnabled, setEditEnabled] = useState(false);
  const [formState, setFormState] = useState({
    location: '',
    locationChanged: false,
    hoursWorked: '0',
    hoursWorkedChanged: false,
    advancePayment: '0',
    advancePaymentChanged: false,
    description: '',
    descriptionChanged: false,
  });

  const allEmployeesList = useSelector(
    (state) => state.appData.allEmployeesList
  );
  const allClockingsList = useSelector((state) => state.appData.allClockings);

  const selectedItem = allClockingsList.find(
    (clocking) => clocking.employeeId === employeeId && clocking.date === date
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setFormState((prevUserData) => ({
      ...prevUserData,
      location: selectedItem.location,
      hoursWorked: selectedItem.hoursWorked.toString(),
      advancePayment: selectedItem.advancePayment.toString(),
      description: selectedItem.description,
    }));
  }, [selectedItem]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={{
            width: 60,
            height: 30,
            paddingHorizontal: 10,
          }}
          onPress={() => {
            if (editEnabled) {
              onConfirmHandler();
            }
            setEditEnabled((prev) => !prev);
          }}
        >
          {({ pressed }) => (
            <MaterialCommunityIcon
              name={editEnabled ? 'book-check' : 'book-edit-outline'}
              size={30}
              color={pressed ? Colors.light2 : Colors.light1}
            />
          )}
        </Pressable>
      ),
    });
  }, [editEnabled]);

  const handleInputChange = (field, text) => {
    let validatedText;

    if (field === 'advancePayment') {
      // remove all characters that are not digits
      validatedText = text.replace(/[^0-9]/g, '');
    } else if (field === 'hoursWorked') {
      // remove all characters that are not digits
      validatedText = text.replace(/[^0-9.]/g, '');

      // make sure that only one period is entered
      const parts = validatedText.split('.');
      if (parts.length > 2) {
        validatedText = parts[0] + '.' + parts.slice(1).join('');
      }
    } else {
      validatedText = text;
    }

    // check for changes from user input
    const flag1 = field === 'location' && text !== selectedItem.location;
    const flag2 =
      field === 'hoursWorked' &&
      validatedText !== selectedItem.hoursWorked.toString();
    const flag3 =
      field === 'advancePayment' &&
      validatedText !== selectedItem.advancePayment;
    const flag4 = field === 'description' && text !== selectedItem.description;

    setFormState((prevUserData) => ({
      ...prevUserData,
      [field]: validatedText,
      locationChanged: flag1,
      hoursWorkedChanged: flag2,
      advancePaymentChanged: flag3,
      descriptionChanged: flag4,
    }));
  };

  const resetFormState = () => {
    setFormState(() => ({
      location: selectedItem.location,
      locationChanged: false,
      hoursWorked: selectedItem.hoursWorked.toString(),
      hoursWorkedChanged: false,
      advancePayment: selectedItem.advancePayment.toString(),
      advancePaymentChanged: false,
      description: selectedItem.description,
      descriptionChanged: false,
    }));
  };

  const onConfirmHandler = () => {
    setFormState((prevState) => {
      // create a new clocking object with updated fields
      const updatedClocking = {
        employeeId: selectedItem.employeeId,
        date: selectedItem.date,
        hoursWorked: prevState.hoursWorked,
        location: prevState.location,
        description: prevState.description,
        advancePayment: prevState.advancePayment,
      };

      dispatch(appDataActions.updateClocking(updatedClocking));

      return prevState;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {editEnabled ? 'Edit details' : 'Details below'}
        </Text>
      </View>
      {editEnabled ? (
        <DetailsEditCard
          label="Location: "
          placeholder={
            selectedItem.location === '' ? 'No location available.' : null
          }
          value={formState.location}
          action={(text) => {
            handleInputChange('location', text);
          }}
          onEndEditing={() => {}}
          defaultColor={
            formState.locationChanged ? Colors.primary3 : Colors.green3
          }
          pressedColor={
            formState.locationChanged ? Colors.primary4 : Colors.green4
          }
          vertical={false}
        />
      ) : (
        <DetailsCard
          label="Location: "
          content={
            selectedItem.location === ''
              ? 'No location available.'
              : selectedItem.location
          }
          borderColor={Colors.maroon}
          vertical={false}
        />
      )}
      <View style={styles.cardsContainer}>
        <DetailsCard
          label="Employee name"
          content={allEmployeesList.find((emp) => emp.id === employeeId).name}
          borderColor={editEnabled ? Colors.dark : Colors.blue3}
          vertical
        />
        <DetailsCard
          label={
            typeof date === 'string'
              ? new Date(date).toLocaleDateString('en-US', { weekday: 'long' })
              : date.toLocaleDateString('en-US', { weekday: 'long' })
          }
          content={
            typeof date === 'string'
              ? date.split('T')[0].split('-').reverse().join('.')
              : date.toISOString().split('T')[0].split('-').reverse().join('.')
          }
          borderColor={editEnabled ? Colors.dark : Colors.green3}
          vertical
        />
        {editEnabled ? (
          <DetailsEditCard
            label="Worked hours"
            placeholder=""
            value={formState.hoursWorked}
            action={(text) => {
              handleInputChange('hoursWorked', text);
            }}
            onEndEditing={() => {}}
            defaultColor={
              formState.hoursWorkedChanged ? Colors.primary3 : Colors.green3
            }
            pressedColor={
              formState.hoursWorkedChanged ? Colors.primary4 : Colors.green4
            }
            vertical
            keyboardType="numeric"
          />
        ) : (
          <DetailsCard
            label="Worked hours"
            content={`${String(Math.floor(selectedItem.hoursWorked)).padStart(
              2,
              '0'
            )}:${String(
              Math.round((selectedItem.hoursWorked % 1) * 60)
            ).padStart(2, '0')}`}
            borderColor={Colors.green3}
            vertical
          />
        )}
        {editEnabled ? (
          <DetailsEditCard
            label="Advance Payment"
            placeholder=""
            value={formState.advancePayment}
            action={(text) => {
              handleInputChange('advancePayment', text);
            }}
            onEndEditing={() => {}}
            defaultColor={
              formState.advancePaymentChanged ? Colors.primary3 : Colors.green3
            }
            pressedColor={
              formState.advancePaymentChanged ? Colors.primary4 : Colors.green4
            }
            vertical
            keyboardType="numeric"
          />
        ) : (
          <DetailsCard
            label="Advance payment"
            content={`${selectedItem.advancePayment}€`}
            borderColor={Colors.primary3}
            vertical
          />
        )}
      </View>
      {editEnabled ? (
        <DetailsEditCard
          label="Description"
          placeholder={
            selectedItem.description === '' ? 'No description available.' : ''
          }
          value={formState.description}
          action={(text) => {
            handleInputChange('description', text);
          }}
          onEndEditing={() => {}}
          defaultColor={
            formState.descriptionChanged ? Colors.primary3 : Colors.green3
          }
          pressedColor={
            formState.descriptionChanged ? Colors.primary4 : Colors.green4
          }
          vertical
        />
      ) : (
        <DetailsCard
          label="Description"
          content={
            selectedItem.description === ''
              ? 'No description available.'
              : selectedItem.description
          }
          borderColor={Colors.maroon}
          vertical
        />
      )}
      {editEnabled && (
        <View style={styles.editButtonsContainer}>
          <CustomButton
            width={120}
            height={45}
            title="Delete"
            fontSize={18}
            fontColor={Colors.light1} //"#E09F3E"
            color={Colors.primary3}
            pressedColor={Colors.primary4}
            action={() => {
              // show alert to confirm
              Alert.alert(
                'Delete clocking',
                'Are you sure? This action is irreversible, and the entered data will be lost!',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {
                    text: 'Yes, delete it',
                    onPress: () => {
                      // exit edit mode
                      // setEditEnabled((prev) => !prev);

                      // delete clocking
                      dispatch(appDataActions.deleteClocking(employeeId, date));

                      // navigate back to clockings screen
                      props.navigation.goBack();
                    },
                    style: 'destructive',
                  },
                ]
              );
            }}
          />
          <CustomButton
            width={120}
            height={45}
            title="Cancel"
            fontSize={18}
            fontColor={Colors.light1} //"#E09F3E"
            color={Colors.blue4}
            pressedColor={Colors.blue5}
            action={() => {
              // clear the form state
              resetFormState();

              // exit edit mode
              setEditEnabled((prev) => !prev);
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: 50,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  titleContainer: {
    paddingTop: 30,
    paddingBottom: 20,
  },

  title: {
    fontFamily: 'poppins-600',
    fontSize: 24,
  },

  cardsContainer: {
    // flex: 0.4,
    height: 195,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // paddingVertical: 10,
  },

  editButtonsContainer: {
    width: '100%',
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default DetailsScreen;
