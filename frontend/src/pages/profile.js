import React, { useEffect } from 'react';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Divider, Descriptions, Badge, Card, Typography, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import * as profileActions from "../store/actions/profile";
import * as assignmentActions from "../store/actions/assignments";
import { StudentAssignmentCard, PublishedAssignmentCard } from '../components/assignmentCard';

const { Text  } = Typography;

export default function Profile (props) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userDetail)

  useEffect(() => {
    props.isStudent ? dispatch(profileActions.getStudentDetail()) : dispatch(profileActions.getTeacherDetail());
  }, [dispatch, props.isStudent]);

  return (
    <>
      <Divider orientation="middle"><UnorderedListOutlined />Profile</Divider>
      {
        userData.user !== undefined ?
        <BaseProfile {...userData}>
        {
          props.isStudent ?
          <>
            <Descriptions.Item label={<Text strong>Class</Text>}>{userData.year}</Descriptions.Item>
            <Descriptions.Item label={<Text strong>Attendance</Text>}>169/215</Descriptions.Item>
            <Descriptions.Item label={<Text strong>Remark</Text>} span={3}>very good student</Descriptions.Item>
            <Descriptions.Item label={<Text strong>Recent Assignment</Text>} span={4}>
              <StudentAssignmentList />
            </Descriptions.Item>
          </>
          :
          <>
            <Descriptions.Item label={<Text strong>Class</Text>}>{userData.year_handled}</Descriptions.Item>
            <Descriptions.Item label={<Text strong>Published Assignment</Text>} span={4}>
              <TeacherAssignmentList />
            </Descriptions.Item>
          </>
        }
        </BaseProfile>
        :
        null
      }
    </>
  )
}

function BaseProfile (props) {
  return (
    <Descriptions layout="vertical" bordered column={4}>
      <Descriptions.Item label={<Text strong>ID</Text>}>{props.id}</Descriptions.Item>
      <Descriptions.Item label={<Text strong>Name</Text>}>{props.user.fullname}</Descriptions.Item>
      <Descriptions.Item label={<Text strong>Age</Text>}>{props.user.age}</Descriptions.Item>
      <Descriptions.Item label={<Text strong>Gender</Text>}>{props.user.gender}</Descriptions.Item>
      <Descriptions.Item label={<Text strong>Religion</Text>}>{props.user.religion}</Descriptions.Item>
      <Descriptions.Item label={<Text strong>Race</Text>}>{props.user.race}</Descriptions.Item>
      <Descriptions.Item label={<Text strong>Status</Text>}>
        <Badge status="processing" text={props.status} />
      </Descriptions.Item>
      <Descriptions.Item label={<Text strong>Email</Text>}>{props.user.email}</Descriptions.Item>
      <Descriptions.Item label={<Text strong>Date Joined</Text>}>{props.user.date_joined}</Descriptions.Item>
      <Descriptions.Item label={<Text strong>Contact Number</Text>}>{props.user.contact_number}</Descriptions.Item>
      <Descriptions.Item label={<Text strong>Address</Text>}>{props.user.address}</Descriptions.Item>
      {props.children}
    </Descriptions>
  )
}

function StudentAssignmentList () {
  const dispatch = useDispatch();
  const list = useSelector(state => state.assignment.assignmentList);

	useEffect(() => {
		dispatch(assignmentActions.getAssignmentList());
	}, [dispatch]);

  return (
    <Card>
      <Row gutter={[16, 16]}>
      {
        list.map(item => item.mark >= 0 ? <StudentAssignmentCard key={item.code} {...item} type="marked"/> : null)
      }
      </Row>
    </Card>
  )
}

function TeacherAssignmentList () {
  const dispatch = useDispatch();
  const list = useSelector(state => state.assignment.assignmentList);

	useEffect(() => {
		dispatch(assignmentActions.getAssignmentList());
	}, [dispatch]);

  return (
    <Card>
      <Row gutter={[16, 16]}>
      {
        list.map(item => item.status === 2 ? <PublishedAssignmentCard key={item.code} {...item}/> : null)
      }
      </Row>
    </Card>
  )
}