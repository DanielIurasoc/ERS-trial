import {
  SET_DATE,
  SET_ALL_EMPLOYEES_LIST,
  SET_CLOCKED_EMPLOYEES_LIST,
  ADD_CLOCKED_EMPLOYEE,
  CLEAR_CLOCKED_EMPLOYEES_LIST,
} from './actions.js';

const initialState = {
  today: null,
  allEmployeesList: [],
  clockedEmployeesList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE:
      return {
        ...state,
        today: action.payload,
      };
    case SET_ALL_EMPLOYEES_LIST:
      return {
        ...state,
        allEmployeesList: action.payload,
      };
    case ADD_CLOCKED_EMPLOYEE:
      if (!state.clockedEmployeesList.includes(action.payload)) {
        return {
          ...state,
          clockedEmployeesList: [...state.clockedEmployeesList, action.payload],
        };
      }
      return state;
    case SET_CLOCKED_EMPLOYEES_LIST:
      return {
        ...state,
        clockedEmployeesList: action.payload,
      };
    case CLEAR_CLOCKED_EMPLOYEES_LIST:
      return {
        ...state,
        clockedEmployeesList: [],
      };
    default:
      return state;
  }
};
