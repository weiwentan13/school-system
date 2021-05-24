import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  studentList: [],
  userDetail: {},
  avatar: null,
  error: null,
  loading: false
};

const getStudentListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getStudentListSuccess = (state, action) => {
  return updateObject(state, {
    studentList: action.studentList,
    error: null,
    loading: false
  });
};

const getStudentListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getStudentDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getStudentDetailSuccess = (state, action) => {
  return updateObject(state, {
    userDetail: action.studentDetail,
    error: null,
    loading: false
  });
};

const getStudentDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getTeacherDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getTeacherDetailSuccess = (state, action) => {
  return updateObject(state, {
    userDetail: action.teacherDetail,
    error: null,
    loading: false
  });
};

const getTeacherDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const updateAvatarStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const updateAvatarSuccess = (state, action) => {
  return updateObject(state, {
    avatar: action.avatar,
    error: null,
    loading: false
  });
};

const updateAvatarFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getAvatarStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getAvatarSuccess = (state, action) => {
  return updateObject(state, {
    avatar: action.avatar,
    error: null,
    loading: false
  });
};

const getAvatarFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_STUDENT_LIST_START:
      return getStudentListStart(state, action);
    case actionTypes.GET_STUDENT_LIST_SUCCESS:
      return getStudentListSuccess(state, action);
    case actionTypes.GET_STUDENT_LIST_FAIL:
      return getStudentListFail(state, action);
    case actionTypes.GET_STUDENT_DETAIL_START:
      return getStudentDetailStart(state, action);
    case actionTypes.GET_STUDENT_DETAIL_SUCCESS:
      return getStudentDetailSuccess(state, action);
    case actionTypes.GET_STUDENT_DETAIL_FAIL:
      return getStudentDetailFail(state, action);
    case actionTypes.UPDATE_AVATAR_START:
      return updateAvatarStart(state, action);
    case actionTypes.UPDATE_AVATAR_SUCCESS:
      return updateAvatarSuccess(state, action);
    case actionTypes.UPDATE_AVATAR_FAIL:
      return updateAvatarFail(state, action);
    case actionTypes.GET_AVATAR_START:
      return getAvatarStart(state, action);
    case actionTypes.GET_AVATAR_SUCCESS:
      return getAvatarSuccess(state, action);
    case actionTypes.GET_AVATAR_FAIL:
      return getAvatarFail(state, action);
    case actionTypes.GET_TEACHER_DETAIL_START:
      return getTeacherDetailStart(state, action);
    case actionTypes.GET_TEACHER_DETAIL_SUCCESS:
      return getTeacherDetailSuccess(state, action);
    case actionTypes.GET_TEACHER_DETAIL_FAIL:
      return getTeacherDetailFail(state, action);
    default:
      return state;
  }
};

export default reducer;