import React, { useEffect } from 'react';
import TeacherAssignmentDetail from '../containers/teacherAssignmentDetail';
import StudentAssignmentDetail from '../containers/studentAssignmentDetail';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from "../store/actions/assignments";
import { useParams } from "react-router-dom";

const AssignmentDetail = (props) => {
  const dispatch = useDispatch();
  const assignment = useSelector(state => state.assignment.assignment);
  const { code } = useParams();

  useEffect(() => {
	  if(code !== null && code !== undefined)
    {
		  dispatch(actions.getAssignmentDetail(code));
    }
  }, [code, dispatch]);
  
  return (
    <>
      {
        props.isStudent ?
        <StudentAssignmentDetail assignment={assignment} />
        :
        <TeacherAssignmentDetail assignment={assignment}/>
      }
    </>
  )
}

export default AssignmentDetail;