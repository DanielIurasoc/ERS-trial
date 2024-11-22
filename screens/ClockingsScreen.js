import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as appDataActions from '../store/actions.js';

import CustomHeader from '../components/CustomHeader.js';
import Colors from '../utils/colors.js';
import ClockingListItem from '../components/ClockingListItem.js';
import FilterItem from '../components/FilterItem.js';

const ClockingsScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('today');
  const [listData, setListData] = useState([]);

  const today = useSelector((state) => state.appData.today);
  const allClockings = useSelector((state) => state.appData.allClockings);
  const allEmployeesList = useSelector(
    (state) => state.appData.allEmployeesList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    switch (activeFilter) {
      case 'today':
        setListData(
          allClockings.filter(
            (clocking) =>
              clocking.date.split('T')[0].split('-')[2] ===
                today.getDate().toString() &&
              clocking.date.split('T')[0].split('-')[1] ===
                (today.getMonth() + 1).toString()
          )
        );
        break;
      case 'lastWeek':
        setListData(
          allClockings.filter(
            (clocking) =>
              Math.abs(new Date(clocking.date) - today) / 1000 / 24 / 60 / 60 <
              7
          )
        );
        break;
      case 'lastMonth':
        setListData(
          allClockings.filter(
            (clocking) =>
              clocking.date.split('T')[0].split('-')[1] ===
              (today.getMonth() + 1).toString()
          )
        );
        break;
      case 'last3Months':
        if (today.getMonth() + 1 >= 3) {
          setListData(
            allClockings.filter(
              (clocking) =>
                Math.abs(
                  parseInt(clocking.date.split('T')[0].split('-')[1]) -
                    parseInt((today.getMonth() + 1).toString())
                ) < 3
            )
          );
        }
        break;
      case 'all':
      default:
        setListData(allClockings);
    }
  }, [activeFilter, allClockings]);

  const refreshData = async () => {
    try {
      setIsRefreshing(true);

      try {
        // read existing data
        const value = await AsyncStorage.getItem('allClockings');

        // if data exists, parse it, otherwise init with empty array
        const parsedArray = value ? JSON.parse(value) : [];

        const areEqual =
          parsedArray.length === allClockings.length &&
          parsedArray.every(
            (obj, index) =>
              obj.employeeId === allClockings[index].employeeId &&
              obj.date.split('T')[0] ===
                allClockings[index].date.split('T')[0] &&
              obj.hoursWorked === allClockings[index].hoursWorked &&
              obj.description === allClockings[index].description &&
              obj.location === allClockings[index].location &&
              obj.advancePayment === allClockings[index].advancePayment
          );

        if (areEqual) {
          // add a delay of 1s
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } else {
          dispatch(appDataActions.setAllClockingsList(parsedArray));
        }
      } catch (error) {
        console.log(error);
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary4} barStyle={'light-content'} />
      <CustomHeader today={today} />
      <View style={styles.listOuterContainer}>
        <ScrollView
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContentContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <FilterItem
            name="Today"
            onPress={() => {
              setActiveFilter('today');
            }}
            enabled={activeFilter === 'today'}
          />
          <FilterItem
            name="Last week"
            onPress={() => {
              setActiveFilter('lastWeek');
            }}
            enabled={activeFilter === 'lastWeek'}
          />
          <FilterItem
            name="Last month"
            onPress={() => {
              setActiveFilter('lastMonth');
            }}
            enabled={activeFilter === 'lastMonth'}
          />
          <FilterItem
            name="Last 3 months"
            onPress={() => {
              setActiveFilter('last3Months');
            }}
            enabled={activeFilter === 'last3Months'}
          />
          <FilterItem
            name="Show all"
            onPress={() => {
              setActiveFilter('all');
            }}
            enabled={activeFilter === 'all'}
          />
        </ScrollView>

        <FlatList
          refreshing={isRefreshing}
          onRefresh={refreshData}
          data={listData}
          style={{ paddingTop: 0 }}
          renderItem={(itemData) => (
            <ClockingListItem
              index={itemData.index + 1}
              name={
                allEmployeesList.find(
                  (emp) => emp.id === itemData.item.employeeId
                )?.name
              }
              description={`${
                typeof itemData.item.date === 'string'
                  ? itemData.item.date
                      .split('T')[0]
                      .split('-')
                      .reverse()
                      .join('.')
                  : itemData.item.date
                      .toISOString()
                      .split('T')[0]
                      .split('-')
                      .reverse()
                      .join('.')
              }, ${itemData.item.location}`}
              onPress={() => {
                props.navigation.navigate('Details', {
                  title: `${
                    allEmployeesList.find(
                      (emp) => emp.id === itemData.item.employeeId
                    )?.name
                  }, ${
                    typeof itemData.item.date === 'string'
                      ? itemData.item.date
                          .split('T')[0]
                          .split('-')
                          .reverse()
                          .join('.')
                      : itemData.item.date
                          .toISOString()
                          .split('T')[0]
                          .split('-')
                          .reverse()
                          .join('.')
                  }`,
                  employeeId: itemData.item.employeeId,
                  date: itemData.item.date,
                });
              }}
            />
          )}
          keyExtractor={(item) => item.employeeId + item.date}
        />
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
    height: 44,
    maxHeight: 44,
    paddingBottom: 14,
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
    width: Dimensions.get('window').width * 0.8,
  },
});

export default ClockingsScreen;
