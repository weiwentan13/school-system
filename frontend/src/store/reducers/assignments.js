import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  assignmentList: [],
  gradedAssignmentList: [],
  assignment: {},
  graded_assignment: {},
  error: null,
  loading1: false,
  loading2: false
};

const getAssignmentListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading1: true
  });
};

const getAssignmentListSuccess = (state, action) => {
  return updateObject(state, {
    assignmentList: action.assignmentList,
    error: null,
    loading1: false
  });
};

const getAssignmentListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading1: false
  });
};

const getGradedAssignmentListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading2: true
  });
};

const getGradedAssignmentListSuccess = (state, action) => {
  return updateObject(state, {
    gradedAssignmentList: action.gradedAssignmentList,
    error: null,
    loading2: false
  });
};

const getGradedAssignmentListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading2: false
  });
};

const createGradedAssignmentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createGradedAssignmentSuccess = (state, action) => {
  return updateObject(state, {
    graded_assignment: action.graded_assignment,
    error: null,
    loading: false
  });
};

const createGradedAssignmentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createAssignmentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createAssignmentSuccess = (state, action) => {
  return updateObject(state, {
    assignmentList: state.assignmentList.concat([action.assignment]),
    assignment: action.assignment,
    error: null,
    loading: false
  });
};

const createAssignmentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getAssignmentDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getAssignmentDetailSuccess = (state, action) => {
  return updateObject(state, {
    assignment: action.assignment,
    error: null,
    loading: false
  });
};

const getAssignmentDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const deleteAssignmentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const deleteAssignmentSuccess = (state, action) => {
  return updateObject(state, {
    assignmentList: state.assignmentList.filter(item=>item.code !== action.code),
    error: null,
    loading: false
  });
};

const deleteAssignmentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const updateAssignmentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const updateAssignmentSuccess = (state, action) => {
  return updateObject(state, {
	assignment: action.assignment,
    error: null,
    loading: false
  });
};

const updateAssignmentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ASSIGNMENT_LIST_START:
      return getAssignmentListStart(state, action);
    case actionTypes.GET_ASSIGNMENT_LIST_SUCCESS:
      return getAssignmentListSuccess(state, action);
    case actionTypes.GET_ASSIGNMENT_LIST_FAIL:
      return getAssignmentListFail(state, action);
    case actionTypes.GET_GRADED_ASSIGNMENT_LIST_START:
      return getGradedAssignmentListStart(state, action);
    case actionTypes.GET_GRADED_ASSIGNMENT_LIST_SUCCESS:
      return getGradedAssignmentListSuccess(state, action);
    case actionTypes.GET_GRADED_ASSIGNMENT_LIST_FAIL:
      return getGradedAssignmentListFail(state, action);
    case actionTypes.CREATE_ASSIGNMENT_START:
      return createAssignmentStart(state, action);
    case actionTypes.CREATE_ASSIGNMENT_SUCCESS:
      return createAssignmentSuccess(state, action);
    case actionTypes.CREATE_ASSIGNMENT_FAIL:
      return createAssignmentFail(state, action);
    case actionTypes.GET_ASSIGNMENT_DETAIL_START:
      return getAssignmentDetailStart(state, action);
    case actionTypes.GET_ASSIGNMENT_DETAIL_SUCCESS:
      return getAssignmentDetailSuccess(state, action);
    case actionTypes.GET_ASSIGNMENT_DETAIL_FAIL:
      return getAssignmentDetailFail(state, action);
    case actionTypes.DELETE_ASSIGNMENT_START:
      return deleteAssignmentStart(state, action);
    case actionTypes.DELETE_ASSIGNMENT_SUCCESS:
      return deleteAssignmentSuccess(state, action);
    case actionTypes.DELETE_ASSIGNMENT_FAIL:
      return deleteAssignmentFail(state, action);
	  case actionTypes.UPDATE_ASSIGNMENT_START:
      return updateAssignmentStart(state, action);
    case actionTypes.UPDATE_ASSIGNMENT_SUCCESS:
      return updateAssignmentSuccess(state, action);
    case actionTypes.UPDATE_ASSIGNMENT_FAIL:
      return updateAssignmentFail(state, action);
    case actionTypes.CREATE_GRADED_ASSIGNMENT_START:
      return createGradedAssignmentStart(state, action);
    case actionTypes.CREATE_GRADED_ASSIGNMENT_SUCCESS:
      return createGradedAssignmentSuccess(state, action);
    case actionTypes.CREATE_GRADED_ASSIGNMENT_FAIL:
      return createGradedAssignmentFail(state, action);
    default:
      return state;
  }
};

export default reducer;