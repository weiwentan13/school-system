import { Card, Col, Row, Divider, Modal, Form, Badge } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { DraftAssignmentCard, PublishedAssignmentCard, StudentAssignmentCard } from '../components/assignmentCard';
import CreateAssignmentModal from '../components/createAssignmentModal';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from "../store/actions/assignments";

const CardStyles = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  borderRadius: '15px',
  height: '150px',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
};

const TeacherAssignmentList = (props) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleOk = () => {
    form.validateFields()
      .then(() => {
        form.submit();
        setVisible(false);
      })
      .catch(error => console.log(error))
  };
  const removeAssignment = (code) => {
    dispatch(actions.deleteAssignment(code));
  }
  return (
    <div>
      <Card title={<Badge count={props.assignmentList.filter(item => item.status === 1 || item.status === 'draft').length} showZero={true} offset={[15, 0]}>Draft</Badge>} bordered={false}>
        <Row gutter={[8, 8]}>
          {
            props.assignmentList.map(item => item.status === 1 || item.status === 'draft' ? <DraftAssignmentCard key={item.code} {...item} removeAssignment={removeAssignment} /> : null)
          }
          <Col span={6}>
            <Card style={CardStyles} hoverable={true} bordered={false} onClick={showModal}>
              Create new Assignment
            </Card>
            <Modal
              title="Create New Assignment"
              visible={visible}
              onCancel={handleCancel}
              onOk={handleOk}
              okText= 'Proceed'
            >
              <CreateAssignmentModal form={form}/>
            </Modal>
          </Col>
        </Row>
      </Card>
      <Card title={<Badge count={props.assignmentList.filter(item => item.status === 2 || item.status === 'published').length} showZero={true} offset={[15, 0]}>Published</Badge>} bordered={false} >
        <Row gutter={[8, 8]}>
          {
            props.assignmentList.map(item => item.status === 2 || item.status === 'published' ? <PublishedAssignmentCard key={item.code} {...item}/> : null)
          }
        </Row>
      </Card>
    </div>
  )
}

const StudentAssignmentList = (props) => {
  return (
    <div>
      <Card title={<Badge count={props.assignmentList.filter(item => item.mark < 0 && new Date() < new Date(item.deadline)).length} showZero={true} offset={[15, 0]}>To Do</Badge>} bordered={false}>
        <Row gutter={[16, 16]}>
          {
            props.assignmentList.map(item => item.mark < 0 && new Date() < new Date(item.deadline) ? <StudentAssignmentCard key={item.code} {...item} type="todo"/> : null)
          }
        </Row>
      </Card>
      <Card title={<Badge count={props.assignmentList.filter(item => item.mark >= 0).length} showZero={true} offset={[15, 0]}>Submitted</Badge>} bordered={false}>
        <Row gutter={[16, 16]}>
          {
            props.assignmentList.map(item => item.mark >= 0 ? <StudentAssignmentCard key={item.code} {...item} type="marked"/> : null)
          }
        </Row>
      </Card>
      <Card title={<Badge count={props.assignmentList.filter(item => item.mark < 0 && new Date() >= new Date(item.deadline)).length} showZero={true} offset={[15, 0]}>Falied To Submit</Badge>} bordered={false}>
        <Row gutter={[16, 16]}>
          {
            props.assignmentList.map(item => item.mark < 0 && new Date() >= new Date(item.deadline) ? <StudentAssignmentCard key={item.code} {...item} type="failed"/>: null)
          }
        </Row>
      </Card>
    </div>
  )
}

export default function AssignmentList (props) {
  const assignmentList = useSelector(state => state.assignment.assignmentList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getAssignmentList());
	}, [dispatch]);

  return (
    <>
    <Divider orientation="middle"><UnorderedListOutlined />Assignment List</Divider>
    {
      props.isStudent ?
      <StudentAssignmentList assignmentList={assignmentList}/>
      :
      <TeacherAssignmentList assignmentList={assignmentList}/>
    }
    </>
  );
}