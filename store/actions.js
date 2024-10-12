import AsyncStorage from '@react-native-async-storage/async-storage';

export const SET_DATE = 'SET_DATE';
export const SET_ALL_EMPLOYEES_LIST = 'SET_ALL_EMPLOYEES_LIST';
export const SET_CLOCKED_EMPLOYEES_LIST = 'SET_CLOCKED_EMPLOYEES_LIST';
export const CLEAR_CLOCKED_EMPLOYEES_LIST = 'CLEAR_CLOCKED_EMPLOYEES_LIST';

export const setDate = (date) => {
  return {
    type: SET_DATE,
    payload: date,
  };
};

export const updateTodayInAsyncStorage = (date) => {
  return async () => {
    await writeToAsyncStorage('today', date);
    // console.log('done, ' + date + ', ' + JSON.stringify(date));
  };
};

export const addEmployee = (employeeName) => {
  // async needed for saving data, dispatch and getState are used for redux
  return async (dispatch, getState) => {
    // get current data from state.allEmployeesList
    const allEmployeesList = getState().appData.allEmployeesList;

    try {
      // check if the wanted employee is not already existing in the database
      if (
        !allEmployeesList.some((employee) => employee.name === employeeName)
      ) {
        let newIndex;
        if (allEmployeesList.length !== 0) {
          // find the index of the last element and increase by 1
          const index =
            parseInt(
              allEmployeesList[allEmployeesList.length - 1].id.substring(3)
            ) + 1;

          // pad the lenght if needed (index is not at least 3 digits long)
          if (index < 100) {
            newIndex = 'eid' + index.toString().padStart(3, '0');
          } else {
            newIndex = 'eid' + index.toString();
          }
        } else {
          newIndex = 'eid001';
        }

        // create the new employee object with the id + name pair
        const newEmployee = {
          id: newIndex,
          name: employeeName,
        };

        // append the new object to the list
        const updatedList = [...allEmployeesList, newEmployee];

        // call writeToAsyncStorage
        await writeToAsyncStorage('allEmployeesList', updatedList);

        // dispatch the action
        dispatch({
          type: SET_ALL_EMPLOYEES_LIST,
          payload: updatedList,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteEmployee = (employeeId) => {
  // async needed for saving data, dispatch and getState are used for redux
  return async (dispatch, getState) => {
    // get current data from state.allEmployeesList
    const allEmployeesList = getState().appData.allEmployeesList;

    try {
      // check if the given employee id exists in the database
      if (allEmployeesList.some((employee) => employee.id === employeeId)) {
        // remove the element that contains the given id
        const updatedList = allEmployeesList.filter(
          (employee) => employee.id !== employeeId
        );

        // call writeToAsyncStorage
        await writeToAsyncStorage('allEmployeesList', updatedList);

        // dispatch action
        dispatch({
          type: SET_ALL_EMPLOYEES_LIST,
          payload: updatedList,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const setAllEmployeesList = (list) => {
  return {
    type: SET_ALL_EMPLOYEES_LIST,
    payload: list,
  };
};

export const addClockedEmployee = (clocking) => {
  // async needed for saving data, dispatch and getState are used for redux
  return async (dispatch, getState) => {
    // get current data from state.allEmployeesList
    const clockedEmployeesList = getState().appData.clockedEmployeesList;

    try {
      await addClockingEntryToAsyncStorage(clocking);
      // check if the wanted employee is not already existing in the database
      if (!clockedEmployeesList.some((eid) => eid === clocking.employeeId)) {
        // append the new object to the list
        const updatedList = [...clockedEmployeesList, clocking.employeeId];

        // call writeToAsyncStorage
        await writeToAsyncStorage('clockedEmployeesList', updatedList);

        // dispatch the action
        dispatch({
          type: SET_CLOCKED_EMPLOYEES_LIST,
          payload: updatedList,
        });
      }
    } catch (error) {
      console.error(error);
    }
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

export const clearClockingsFromAsyncStorage = async () => {
  try {
    await writeToAsyncStorage('clockings', []);
  } catch (error) {
    console.log(error);
  }
};

const addClockingEntryToAsyncStorage = async (clocking) => {
  try {
    // read existing data
    const value = await AsyncStorage.getItem('clockings');

    // if data exists, parse it, otherwise init with empty array
    const parsedArray = value ? JSON.parse(value) : [];

    let updatedList;

    // check if there is an object in the array with the same employeeId and date
    const existingEntry = parsedArray.find(
      (obj) =>
        obj.employeeId === clocking.employeeId &&
        obj.date.split('T')[0] === clocking.date.toISOString().split('T')[0]
    );
    if (existingEntry) {
      // delete the object from the array
      updatedList = parsedArray.filter(
        (obj) =>
          !(
            obj.employeeId === clocking.employeeId &&
            obj.date.split('T')[0] === clocking.date.toISOString().split('T')[0]
          )
      );
    } else {
      updatedList = parsedArray;
    }

    // concat the new clocking at the end
    updatedList = [...updatedList, clocking];

    AsyncStorage.setItem('clockings', JSON.stringify(updatedList));
  } catch (error) {
    console.log(error);
  }
};

const writeToAsyncStorage = async (identifier, array) => {
  try {
    AsyncStorage.setItem(identifier, JSON.stringify(array));
  } catch (e) {
    console.log(e.message);
  }
};
