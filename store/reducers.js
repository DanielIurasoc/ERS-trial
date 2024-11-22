import {
  SET_DATE,
  SET_ALL_EMPLOYEES_LIST,
  SET_ALL_CLOCKINGS_LIST,
} from './actions.js';

const initialState = {
  today: new Date(),
  allEmployeesList: [],
  allClockings: [],
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
    case SET_ALL_CLOCKINGS_LIST:
      return {
        ...state,
        allClockings: action.payload,
      };
    default:
      return state;
  }
};
