import React, { useState } from 'react';
import { Descriptions, Modal, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import CreateAssignmentModal from '../components/createAssignmentModal';

const EditableDescriptions = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

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

  return (
    <>
      <Descriptions bordered>
        <Descriptions.Item label="Title" span={3}>{props.assignment.title} <EditOutlined onClick={showModal} /></Descriptions.Item>
        <Descriptions.Item label="Deadline">{props.assignment.deadline} <EditOutlined onClick={showModal} /></Descriptions.Item>
        <Descriptions.Item label="Year">{props.assignment.year} <EditOutlined onClick={showModal} /></Descriptions.Item>
        <Descriptions.Item label="submitted">{props.assignment.submitted}</Descriptions.Item>
        <Descriptions.Item label="Created at">{props.assignment.created_at}</Descriptions.Item>
        <Descriptions.Item label="status">{props.assignment.status} <EditOutlined onClick={showModal} /></Descriptions.Item>
        <Descriptions.Item label="Question count">{props.assignment.question_count} </Descriptions.Item>
      </Descriptions>
      <Modal
        title="Update Assignment"
        visible={visible}
        onCancel={handleCancel}
        onOk={handleOk}
        okText= 'Proceed'
      >
        <CreateAssignmentModal form={form} assignment={props.assignment}/>
      </Modal>
    </>
  )
}

export default EditableDescriptions;
