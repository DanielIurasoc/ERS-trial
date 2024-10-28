import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Dimensions,
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';

import CustomHeader from '../components/CustomHeader.js';
import Colors from '../utils/colors.js';
import ClockingListItem from '../components/ClockingListItem.js';
import FilterItem from '../components/FilterItem.js';

const ClockingsScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const today = useSelector((state) => state.appData.today);
  const allClockings = useSelector((state) => state.appData.allClockings);
  const allEmployeesList = useSelector(
    (state) => state.appData.allEmployeesList
  );

  const refreshData = async () => {
    console.log('refreshing...');
    try {
      setIsRefreshing(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary4} barStyle={'light-content'} />
      <CustomHeader today={today} />
      <View
        style={styles.listOuterContainer}
        behavior="padding"
        enabled
        keyboardVerticalOffset={100}
      >
        <ScrollView
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContentContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <FilterItem name="Today" enabled />
          <FilterItem name="Last week" />
          <FilterItem name="Last month" />
          <FilterItem name="Last 3 months" />
        </ScrollView>

        <FlatList
          refreshing={isRefreshing}
          onRefresh={refreshData}
          data={allClockings}
          style={{ marginTop: 10 }}
          renderItem={(itemData) => (
            <ClockingListItem
              index={itemData.index + 1}
              name={
                allEmployeesList.find(
                  (emp) => emp.id === itemData.item.employeeId
                ).name
              }
              description={`${
                typeof itemData.item.date === 'string'
                  ? itemData.item.date.split('T')[0].replaceAll('-', '.')
                  : itemData.item.date
                      .toISOString()
                      .split('T')[0]
                      .replaceAll('-', '.')
              }, ${itemData.item.location}`}
              onPress={() => {
                props.navigation.navigate('Details', {
                  title: `Details for ${itemData.item.employeeId}`,
                });
              }}
            />
          )}
          keyExtractor={(item) => item.employeeId}
        />

        {/* <ScrollView>
          <View style={styles.listInnerContainer}>
            <ClockingListItem
              index={1}
              name="Markus Eddinborough"
              description="28.10.2024, Main Street 1"
              onPress={() => {
                props.navigation.navigate('Details', {
                  title: 'Details for clocking 1',
                });
              }}
            />
            <ClockingListItem
              index={1}
              name="Alexander McDonald"
              description="28.10.2024, Imperia Center Road 133"
              onPress={() => {
                props.navigation.navigate('Details', {
                  title: 'Details for clocking 2',
                });
              }}
            />
          </View>
        </ScrollView> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  filtersContainer: {
    maxHeight: 30,
    alignSelf: 'center',
    // width: Dimensions.get('window').width,
    // paddingHorizontal: Dimensions.get('window').width * 0.05,
  },

  filtersContentContainer: {
    paddingHorizontal: Dimensions.get('window').width * 0.05,
  },

  listOuterContainer: {
    width: Dimensions.get('window').width,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },

  listInnerContainer: {
    // flex: 1,
    paddingVertical: 10,
    width: Dimensions.get('window').width * 0.9,
  },
});

export default ClockingsScreen;
