import axios from "axios";
import * as actionTypes from "./actionTypes";

const getStudentListStart = () => {
  return {
    type: actionTypes.GET_STUDENT_LIST_START
  };
};

const getStudentListSuccess = studentList => ({
  type: actionTypes.GET_STUDENT_LIST_SUCCESS,
  studentList
})

const getStudentListFail = error => {
  return {
    type: actionTypes.GET_STUDENT_LIST_FAIL,
    error: error
  };
};

export const getStudentList = (year) => {
  return dispatch => {
    dispatch(getStudentListStart());
	  const token = JSON.parse(localStorage.getItem('user')).token;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    let url = `http://127.0.0.1:8000/user/students/?year=${year}`;
    if (year === undefined){
      url = `http://127.0.0.1:8000/user/students/`;
    }

    axios
      .get(url)
      .then(response => {
        const studentList = response.data;
        dispatch(getStudentListSuccess(studentList));
      })
      .catch(error => {
        dispatch(getStudentListFail(error));
      });
  };
};

const getStudentDetailStart = () => {
  return {
    type: actionTypes.GET_STUDENT_DETAIL_START
  };
};

const getStudentDetailSuccess = studentDetail => ({
  type: actionTypes.GET_STUDENT_DETAIL_SUCCESS,
  studentDetail
})

const getStudentDetailFail = error => {
  return {
    type: actionTypes.GET_STUDENT_DETAIL_FAIL,
    error: error
  };
};

export const getStudentDetail = () => {
  return dispatch => {
    dispatch(getStudentDetailStart());
    const token = JSON.parse(localStorage.getItem('user')).token;
    const id = JSON.parse(localStorage.getItem('user')).id;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(`http://127.0.0.1:8000/user/students/${id}/`)
      .then(response => {
        const studentDetail = response.data;
        dispatch(getStudentDetailSuccess(studentDetail));
      })
      .catch(error => {
        dispatch(getStudentDetailFail(error));
      });
  };
};

const getTeacherDetailStart = () => {
  return {
    type: actionTypes.GET_TEACHER_DETAIL_START
  };
};

const getTeacherDetailSuccess = teacherDetail => ({
  type: actionTypes.GET_TEACHER_DETAIL_SUCCESS,
  teacherDetail
})

const getTeacherDetailFail = error => {
  return {
    type: actionTypes.GET_TEACHER_DETAIL_FAIL,
    error: error
  };
};

export const getTeacherDetail = () => {
  return dispatch => {
    dispatch(getTeacherDetailStart());
	  const token = JSON.parse(localStorage.getItem('user')).token;
    const id = JSON.parse(localStorage.getItem('user')).id;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(`http://127.0.0.1:8000/user/teachers/${id}/`)
      .then(response => {
        const teacherDetail = response.data;
        dispatch(getTeacherDetailSuccess(teacherDetail));
      })
      .catch(error => {
        dispatch(getTeacherDetailFail(error));
      });
  };
};

const updateAvatarStart = () => {
  return {
    type: actionTypes.UPDATE_AVATAR_START
  };
};

const updateAvatarSuccess = avatar => ({
  type: actionTypes.UPDATE_AVATAR_SUCCESS,
  avatar
})

const updateAvatarFail = error => {
  return {
    type: actionTypes.UPDATE_AVATAR_FAIL,
    error: error
  };
};

export const updateAvatar = (file) => {
  let formData = new FormData();

  return dispatch => {
    dispatch(updateAvatarStart());
	  const token = JSON.parse(localStorage.getItem('user')).token;
    const id = JSON.parse(localStorage.getItem('user')).userId;
    formData.append("avatar", file);
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${token}`
    };
    axios
      .put(`http://127.0.0.1:8000/user/avatars/${id}/`, formData)
      .then(response => {
        const avatar = response.data;
        dispatch(updateAvatarSuccess(avatar));
      })
      .catch(error => {
        dispatch(updateAvatarFail(error));
      });
  };
};

const getAvatarStart = () => {
  return {
    type: actionTypes.GET_AVATAR_START
  };
};

const getAvatarSuccess = avatar => ({
  type: actionTypes.GET_AVATAR_SUCCESS,
  avatar
})

const getAvatarFail = error => {
  return {
    type: actionTypes.GET_AVATAR_FAIL,
    error: error
  };
};

export const getAvatar = () => {

  return dispatch => {
    dispatch(getAvatarStart());
	  const token = JSON.parse(localStorage.getItem('user')).token;
    const id = JSON.parse(localStorage.getItem('user')).userId;

    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${token}`
    };
    axios
      .get(`http://127.0.0.1:8000/user/avatars/${id}/`)
      .then(response => {
        const avatar = response.data;
        dispatch(getAvatarSuccess(avatar));
      })
      .catch(error => {
        dispatch(getAvatarFail(error));
      });
  };
};