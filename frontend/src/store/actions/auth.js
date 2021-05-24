import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = user => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("user");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios.defaults.headers = {
      "Content-Type": "application/json"
    };
    axios
      .post("http://127.0.0.1:8000/rest-auth/login/", {
        username: username,
        password: password
      })
      .then(res => {
        const user = {
          token: res.data.key,
          username,
          userId: res.data.user,
          id: res.data.id,
          is_student: res.data.user_type.is_student,
          is_teacher: res.data.user_type.is_teacher,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000)
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (values) => {
  return dispatch => {
    dispatch(authStart());
    const user = {
      username: values.username,
      email: values.email,
      password1: values.password,
      password2: values.confirm,
      first_name: values.firstname,
      last_name: values.lastname,
      age: values.age,
      gender: values.gender,
      religion: values.religion,
      race: values.race,
      address: values.address,
      contact_number: values.contactnumber,
      is_student: values.type,
      is_teacher: !values.type,
    };
    axios.defaults.headers = {
      "Content-Type": "application/json"
    };
    axios
      .post("http://127.0.0.1:8000/rest-auth/registration/", user)
      .then(res => {
        const user = {
          token: res.data.key,
          username: values.username,
          userId: res.data.user,
          id: res.data.id,
          is_student: values.type,
			    is_teacher: !values.type,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000)
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined || user === null) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};