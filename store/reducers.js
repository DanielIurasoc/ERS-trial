import {
  SET_DATE,
  SET_ALL_EMPLOYEES_LIST,
  SET_CLOCKED_EMPLOYEES_LIST,
  CLEAR_CLOCKED_EMPLOYEES_LIST,
} from './actions.js';

const initialState = {
  today: new Date(),
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
