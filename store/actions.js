import AsyncStorage from '@react-native-async-storage/async-storage';

export const SET_DATE = 'SET_DATE';
export const SET_ALL_EMPLOYEES_LIST = 'SET_ALL_EMPLOYEES_LIST';
export const SET_CLOCKED_EMPLOYEES_LIST = 'SET_CLOCKED_EMPLOYEES_LIST';
export const CLEAR_CLOCKED_EMPLOYEES_LIST = 'CLEAR_CLOCKED_EMPLOYEES_LIST';

export const setDate = (date) => {
  console.log('entered setDate');
  return {
    type: SET_DATE,
    payload: date,
  };
};

export const setAllEmployeesList = (list) => {
  console.log('entered setAllEmployeesList');
  return {
    type: SET_ALL_EMPLOYEES_LIST,
    payload: list,
  };
};

export const setClockedEmployeesList = (list) => {
  return {
    type: SET_CLOCKED_EMPLOYEES_LIST,
    payload: list,
  };
};

export const clearClockedEmployeesList = () => {
  return {
    type: CLEAR_CLOCKED_EMPLOYEES_LIST,
  };
};

const saveDataToStorage = async (userId, userToken) => {
  try {
    AsyncStorage.setItem(
      'employeesEntries',
      JSON.stringify({
        userToken,
        userId,
      })
    );
  } catch (e) {
    console.log(e.message);
  }
};
