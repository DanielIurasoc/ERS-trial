import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import DetailsCard from '../components/DetailsCard';
import Colors from '../utils/colors';

const DetailsScreen = (props) => {
  const { employeeId, date } = props.route.params;

  const allEmployeesList = useSelector(
    (state) => state.appData.allEmployeesList
  );
  const allClockingsList = useSelector((state) => state.appData.allClockings);

  const selectedItem = allClockingsList.find(
    (clocking) => clocking.employeeId === employeeId && clocking.date === date
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> Details below </Text>
      </View>
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
      <View style={styles.cardsContainer}>
        <DetailsCard
          label="Employee name"
          content={allEmployeesList.find((emp) => emp.id === employeeId).name}
          borderColor={Colors.blue3}
          vertical
        />
        <DetailsCard
          label="Monday"
          content={
            typeof date === 'string'
              ? date.split('T')[0].split('-').reverse().join('.')
              : date.toISOString().split('T')[0].split('-').reverse().join('.')
          }
          borderColor={Colors.green3}
          vertical
        />
        <DetailsCard
          label="Worked hours"
          // content={new Date(
          //   new Date(selectedItem.endTime) - new Date(selectedItem.startTime)
          // )
          //   .toISOString()
          //   .substr(11, 5)}
          content={`${String(Math.floor(selectedItem.hoursWorked)).padStart(
            2,
            '0'
          )}:${String(Math.round((selectedItem.hoursWorked % 1) * 60)).padStart(
            2,
            '0'
          )}`}
          borderColor={Colors.green3}
          vertical
        />
        <DetailsCard
          label="Advance payment"
          content={`${selectedItem.advancePayment}€`}
          borderColor={Colors.primary3}
          vertical
        />
      </View>
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
});

export default DetailsScreen;
