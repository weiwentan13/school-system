import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  absence: [],
  error: null,
  loading: false
};

const getAbsenceStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getAbsenceSuccess = (state, action) => {
  return updateObject(state, {
    absence: action.absence,
    error: null,
    loading: false
  });
};

const getAbsenceFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const deleteAbsenceStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const deleteAbsenceSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const deleteAbsenceFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createAbsenceStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createAbsenceSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createAbsenceFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ABSENCE_START:
      return getAbsenceStart(state, action);
    case actionTypes.GET_ABSENCE_SUCCESS:
      return getAbsenceSuccess(state, action);
    case actionTypes.GET_ABSENCE_FAIL:
      return getAbsenceFail(state, action);
    case actionTypes.DELETE_ABSENCE_START:
      return deleteAbsenceStart(state, action);
    case actionTypes.DELETE_ABSENCE_SUCCESS:
      return deleteAbsenceSuccess(state, action);
    case actionTypes.DELETE_ABSENCE_FAIL:
      return deleteAbsenceFail(state, action);
    case actionTypes.CREATE_ABSENCE_START:
      return createAbsenceStart(state, action);
    case actionTypes.CREATE_ABSENCE_SUCCESS:
      return createAbsenceSuccess(state, action);
    case actionTypes.CREATE_ABSENCE_FAIL:
      return createAbsenceFail(state, action);
    default:
      return state;
  }
};

export default reducer;