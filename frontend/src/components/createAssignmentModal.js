import { DatePicker, TimePicker, Select, Slider, Form, Input, Switch } from 'antd';
import { useDispatch } from 'react-redux';
import * as actions from "../store/actions/assignments";
import React, { useState, useEffect } from 'react';
import moment from 'moment';

const { Option } = Select;

export default function CreateAssignmentModal(props) {
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [time, setTime] = useState(moment().format('HH:mm:ss'));
  const [status, setStatus] = useState(props.assignment !== undefined ? props.assignment.status : 'draft');
  const dispatch = useDispatch();
  const onFinish = (values) => {
    if(props.assignment !== undefined)
    {
      const assignment = {
        year: values.year,
        title: values.title,
        deadline: date + ' ' + time,
        questions: [],
        status: status
      };
      dispatch(actions.updateAssignment(props.assignment.code, assignment));
    }
    else
    {
      const assignment = {
        year: values.year,
        title: values.title,
        status: status,
        deadline: date + ' ' + time,
        questions: []
      };
      console.log(assignment);
      dispatch(actions.createAssignment(assignment));
    }
  };
  useEffect(() => {
    if(props.assignment !== undefined && props.assignment.deadline !== undefined)
    {
      setDate(props.assignment.deadline.split(" ")[0]);
      setTime(props.assignment.deadline.split(" ")[1]);
    }
  }, [props.assignment]);

  function onTimeChange(time, timeString) {
    setTime(timeString);
  }
  function onDateChange(date, dateString) {
    setDate(dateString);
  }
  function onStatusChange(values) {
    if(values)
    {
      setStatus('published');
    }
    else
    {
      setStatus('draft');
    }
  }
  return (
    <Form
      name="createAssignmentForm"
      onFinish={onFinish}
      form={props.form}
      initialValues={props.assignment}
    >
      {
        props.assignment !== undefined ?
        <Form.Item
          name="code"
          label="Code"
        >
          <Input placeholder="Please input the code" disabled={true}/>
        </Form.Item>
        :
        null
      }
      <Form.Item
        name="title"
        label="Title"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please input the assignment title',
          },
        ]}
      >
        <Input placeholder="Please input the assignment title" />
      </Form.Item>
      <Form.Item
        name="year"
        label="Year"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please select the year!',
          },
        ]}
      >
        <Select placeholder="Please select a year">
          <Option value="Grade 1">Grade 1</Option>
          <Option value="Grade 2">Grade 2</Option>
          <Option value="Grade 3">Grade 3</Option>
          <Option value="Grade 4">Grade 4</Option>
          <Option value="Grade 5">Grade 5</Option>
          <Option value="Grade 6">Grade 6</Option>
        </Select>
      </Form.Item>
      <Form.Item name="difficulty" label="Difficulty">
        <Slider
          marks={{
            20: 'Easy',
            50: 'Medium',
            80: 'Hard',
          }}
        />
      </Form.Item>
      {
        props.assignment !== undefined ?
        <Form.Item label="Status">
          <Switch checkedChildren="published" unCheckedChildren="draft" onChange={onStatusChange} defaultChecked={status === 'published' ? true : false}/>
        </Form.Item>
        :
        null
      }
      <Form.Item label="Deadline">
        <DatePicker onChange={onDateChange} defaultValue={moment()}/>
        <TimePicker onChange={onTimeChange} defaultValue={moment()}/>
      </Form.Item>
    </Form>
  );
}