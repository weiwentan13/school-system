import axios from "axios";
import * as actionTypes from "./actionTypes";

const getAssignmentListStart = () => {
  return {
    type: actionTypes.GET_ASSIGNMENT_LIST_START
  };
};

const getAssignmentListSuccess = assignmentList => ({
  type: actionTypes.GET_ASSIGNMENT_LIST_SUCCESS,
  assignmentList
})

const getAssignmentListFail = error => {
  return {
    type: actionTypes.GET_ASSIGNMENT_LIST_FAIL,
    error: error
  };
};

export const getAssignmentList = () => {
  return dispatch => {
    dispatch(getAssignmentListStart());
    const token = JSON.parse(localStorage.getItem('user')).token;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
	  axios
      .get('http://127.0.0.1:8000/api/assignments/')
      .then(response => {
        const assignmentList = response.data;
        dispatch(getAssignmentListSuccess(assignmentList));
      })
      .catch(error => {
        dispatch(getAssignmentListFail(error));
      });
  };
};

const getGradedAssignmentListStart = () => {
  return {
    type: actionTypes.GET_GRADED_ASSIGNMENT_LIST_START
  };
};

const getGradedAssignmentListSuccess = gradedAssignmentList => ({
  type: actionTypes.GET_GRADED_ASSIGNMENT_LIST_SUCCESS,
  gradedAssignmentList
})
const getGradedAssignmentListFail = error => {
  return {
    type: actionTypes.GET_GRADED_ASSIGNMENT_LIST_FAIL,
    error: error
  };
};

export const getGradedAssignmentList = (id) => {
  return dispatch => {
    dispatch(getGradedAssignmentListStart());
    const token = JSON.parse(localStorage.getItem('user')).token;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(`http://127.0.0.1:8000/api/graded-assignments/?id=${id}`)
      .then(response => {
        const gradedAssignmentList = response.data;
        dispatch(getGradedAssignmentListSuccess(gradedAssignmentList));
      })
      .catch(error => {
        dispatch(getGradedAssignmentListFail(error));
      });
  };
};

const createGradedAssignmentStart = () => {
  return {
    type: actionTypes.CREATE_GRADED_ASSIGNMENT_START
  };
};

const createGradedAssignmentSuccess = graded_assignment => ({
  type: actionTypes.CREATE_GRADED_ASSIGNMENT_SUCCESS,
  graded_assignment
})
const createGradedAssignmentFail = error => {
  return {
    type: actionTypes.CREATE_GRADED_ASSIGNMENT_FAIL,
    error: error
  };
};

export const createGradedAssignment = (graded_assignment) => {
  return dispatch => {
    dispatch(createGradedAssignmentStart());
    const token = JSON.parse(localStorage.getItem('user')).token;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
	  axios
      .post('http://127.0.0.1:8000/api/graded-assignments/', graded_assignment)
      .then(response => {
        const graded_assignment = response.data;
        dispatch(createGradedAssignmentSuccess(graded_assignment));
      })
      .catch(error => {
        dispatch(createGradedAssignmentFail(error));
      });
  };
};

const createAssignmentStart = () => {
  return {
    type: actionTypes.CREATE_ASSIGNMENT_START
  };
};

const createAssignmentSuccess = assignment => ({
  type: actionTypes.CREATE_ASSIGNMENT_SUCCESS,
  assignment
})
const createAssignmentFail = error => {
  return {
    type: actionTypes.CREATE_ASSIGNMENT_FAIL,
    error: error
  };
};

export const createAssignment = (assignment) => {
  return dispatch => {
    dispatch(createAssignmentStart());
    const token = JSON.parse(localStorage.getItem('user')).token;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
	  axios
      .post('http://127.0.0.1:8000/api/assignments/', assignment)
      .then(response => {
        const assignment = response.data;
        dispatch(createAssignmentSuccess(assignment));
      })
      .catch(error => {
        dispatch(createAssignmentFail(error));
      });
  };
};

const deleteAssignmentStart = () => {
  return {
    type: actionTypes.DELETE_ASSIGNMENT_START
  };
};

const deleteAssignmentSuccess = (code) => ({
  type: actionTypes.DELETE_ASSIGNMENT_SUCCESS,
  code
})

const deleteAssignmentFail = error => {
  return {
    type: actionTypes.DELETE_ASSIGNMENT_FAIL,
    error: error
  };
};

export const deleteAssignment = (code) => {
  return dispatch => {
    dispatch(deleteAssignmentStart());
    const token = JSON.parse(localStorage.getItem('user')).token;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
	  axios
      .delete(`http://127.0.0.1:8000/api/assignments/${code}/`)
      .then(response => {
        dispatch(deleteAssignmentSuccess(code));
      })
      .catch(error => {
        dispatch(deleteAssignmentFail(error));
      });
  };
};

const getAssignmentDetailStart = () => {
  return {
    type: actionTypes.GET_ASSIGNMENT_DETAIL_START
  };
};

const getAssignmentDetailSuccess = assignment => ({
  type: actionTypes.GET_ASSIGNMENT_DETAIL_SUCCESS,
  assignment
})
const getAssignmentDetailFail = error => {
  return {
    type: actionTypes.GET_ASSIGNMENT_DETAIL_FAIL,
    error: error
  };
};

export const getAssignmentDetail = (code) => {
  return dispatch => {
    dispatch(getAssignmentDetailStart());
    const token = JSON.parse(localStorage.getItem('user')).token;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
	  axios
      .get(`http://127.0.0.1:8000/api/assignments/${code}/`)
      .then(response => {
        const assignment = response.data;
        dispatch(getAssignmentDetailSuccess(assignment));
      })
      .catch(error => {
        dispatch(getAssignmentDetailFail(error));
      });
  };
};

const updateAssignmentStart = () => {
  return {
    type: actionTypes.UPDATE_ASSIGNMENT_START
  };
};

const updateAssignmentSuccess = (assignment) => ({
  type: actionTypes.UPDATE_ASSIGNMENT_SUCCESS,
  assignment
})

const updateAssignmentFail = error => {
  return {
    type: actionTypes.UPDATE_ASSIGNMENT_FAIL,
    error: error
  };
};

export const updateAssignment = (code, assignment) => {
  return dispatch => {
    dispatch(updateAssignmentStart());
    const token = JSON.parse(localStorage.getItem('user')).token;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
	  axios
      .patch(`http://127.0.0.1:8000/api/assignments/${code}/`, assignment)
      .then(response => {
		    const assignment = response.data;
        dispatch(updateAssignmentSuccess(assignment));
      })
      .catch(error => {
        dispatch(updateAssignmentFail(error));
      });
  };
};