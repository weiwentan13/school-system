import axios from "axios";
import * as actionTypes from "./actionTypes";

const getAbsenceStart = () => {
  return {
    type: actionTypes.GET_ABSENCE_START
  };
};

const getAbsenceSuccess = absence => ({
  type: actionTypes.GET_ABSENCE_SUCCESS,
  absence
})

const getAbsenceFail = error => {
  return {
    type: actionTypes.GET_ABSENCE_FAIL,
    error: error
  };
};

export const getAbsence = (date, year) => {
  return dispatch => {
    dispatch(getAbsenceStart());
	  const token = JSON.parse(localStorage.getItem('user')).token;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(`http://127.0.0.1:8000/user/absences/?date=${date}&year=${year}`)
      .then(response => {
        const absence = response.data;
        dispatch(getAbsenceSuccess(absence));
      })
      .catch(error => {
        dispatch(getAbsenceFail(error));
      });
  };
};

const deleteAbsenceStart = () => {
  return {
    type: actionTypes.GET_ABSENCE_START
  };
};

const deleteAbsenceSuccess = () => ({
  type: actionTypes.GET_ABSENCE_SUCCESS
})

const deleteAbsenceFail = error => {
  return {
    type: actionTypes.GET_ABSENCE_FAIL,
    error: error
  };
};

export const deleteAbsence = (id, date) => {
  return dispatch => {
    dispatch(deleteAbsenceStart());
	  const token = JSON.parse(localStorage.getItem('user')).token;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .delete(`http://127.0.0.1:8000/user/absences/multiple_delete/?date=${date}&id=${id}`)
      .then(() => {
        dispatch(deleteAbsenceSuccess());
      })
      .catch(error => {
        dispatch(deleteAbsenceFail(error));
      });
  };
};

const createAbsenceStart = () => {
  return {
    type: actionTypes.GET_ABSENCE_START
  };
};

const createAbsenceSuccess = () => ({
  type: actionTypes.GET_ABSENCE_SUCCESS
})

const createAbsenceFail = error => {
  return {
    type: actionTypes.GET_ABSENCE_FAIL,
    error: error
  };
};

export const createAbsence = (list) => {
  return dispatch => {
    dispatch(createAbsenceStart());
    const token = JSON.parse(localStorage.getItem('user')).token;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .post('http://127.0.0.1:8000/user/absences/multiple_create/', list)
      .then(() => {
        dispatch(createAbsenceSuccess());
      })
      .catch(error => {
        dispatch(createAbsenceFail(error));
      });
  };
};
