import { Form, Button, Divider, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import ReadOnlyDescriptions from '../containers/studentAssignmentDescriptions';
import { StudentReadOnlyQuestion } from '../components/ReadOnlyQuestion';
import * as actions from '../store/actions/assignments';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const StudentAssignmentDetail = (props) => {
  const dispatch = useDispatch();
  const [initial, setInitial] = useState();
  const onFinish = (values) => {
    const answers = []
    for (const [key, value] of Object.entries(values)) {
      answers.push({question: key, answer: value});
    }
    const gradedAssignment = {
      answers: answers,
      assignment: props.assignment.code
    }
    dispatch(actions.createGradedAssignment(gradedAssignment));
  }
  const initialize = (list) => {
    const temp = {};
    list.forEach(item => 
      temp[item.question.toString()] = item.answer
    );
    setInitial(temp);
  }
  
  useEffect(() => {
    if (props.assignment.answers !== undefined){
      initialize(props.assignment.answers);
    }
  }, [props.assignment.answers]);

  return (
    <>
      <Divider orientation="middle">
        <Space>
          <Link to="/assignment"><ArrowLeftOutlined /></Link>{props.assignment.code}
        </Space>
      </Divider>
      <ReadOnlyDescriptions assignment={props.assignment} />
      {
        initial !== undefined ?
        <Form name={props.assignment.code} onFinish={onFinish} initialValues={initial}>
          {
            props.assignment.questions !== undefined ?
            props.assignment.questions.map((question) => (
              <StudentReadOnlyQuestion
                question={question}
                key={question.order}
                answer={props.assignment.answers.filter((item) => item.question === question.id)[0]}
              />
            ))
            :
            null
          }
          {
            props.assignment.mark === -1 && new Date() < new Date(props.assignment.deadline) ?
            <div style={{textAlign: 'center', marginTop: "15px"}}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </div>
            :
            null
          }
        </Form>
        :
        null
      }
    </>
  );
};

export default StudentAssignmentDetail;
