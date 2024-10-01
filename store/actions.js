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
        // find the index of the last element and increase by 1
        let newIndex;
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

export const addClockedEmployee = (employeeId) => {
  // async needed for saving data, dispatch and getState are used for redux
  return async (dispatch, getState) => {
    // get current data from state.allEmployeesList
    const clockedEmployeesList = getState().appData.clockedEmployeesList;

    try {
      // check if the wanted employee is not already existing in the database
      if (!clockedEmployeesList.some((eid) => eid === employeeId)) {
        // append the new object to the list
        const updatedList = [...clockedEmployeesList, employeeId];

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

const writeToAsyncStorage = async (identifier, array) => {
  try {
    AsyncStorage.setItem(identifier, JSON.stringify(array));
  } catch (e) {
    console.log(e.message);
  }
};
