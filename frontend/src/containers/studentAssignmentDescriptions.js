import React from 'react';
import { Descriptions } from 'antd';

const ReadOnlyDescriptions = (props) => {
  return (
    <Descriptions bordered>
      <Descriptions.Item label="Title">{props.assignment.title}</Descriptions.Item>
      <Descriptions.Item label="Deadline">{props.assignment.deadline}</Descriptions.Item>
      <Descriptions.Item label="Question Count">{props.assignment.question_count}</Descriptions.Item>
      <Descriptions.Item label="Teacher">{props.assignment.teacher}</Descriptions.Item>
      <Descriptions.Item label="Difficulty">60</Descriptions.Item>
      <Descriptions.Item label="Mark">{props.assignment.mark !== -1 ? props.assignment.mark : new Date() >= new Date(props.assignment.deadline) ? 0 : '-'}</Descriptions.Item>
    </Descriptions>
  )
}

export default ReadOnlyDescriptions;