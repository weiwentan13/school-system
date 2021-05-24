import { Card, Col, Modal, Statistic, Badge } from 'antd';
import { CloseOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

const { Countdown } = Statistic;

const CardStyles = {
  color: '#fff',
  textAlign: 'center',
  borderRadius: '15px',
  height: '150px',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
};

function showDeleteConfirm(code, title, removeAssignment) {
  Modal.confirm({
    title: 'Are you sure you want to delete this assignment?',
    icon: <ExclamationCircleOutlined />,
    content: code + ' ' + title,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      removeAssignment(code);
    },
  });
};

export const DraftAssignmentCard = (props) => {
	let history = useHistory();
  return (
    <Col span={6}>
      <Card style={{...CardStyles, background: "#0cf041"}}>
        <CloseOutlined 
          style={{position: 'absolute', top: '3px', right: '3px'}} 
          onClick={()=>showDeleteConfirm(props.code, props.title, props.removeAssignment)}
        />
        {props.code}
        <br />
        {props.title}
        <br />
        <EditOutlined onClick={()=>history.push(`/assignment/${props.code}`)}/>
      </Card>
    </Col>
  );
};

export const PublishedAssignmentCard = (props) => {
  let history = useHistory();
  return (
    <Col span={6}>
      <Badge.Ribbon text={props.submitted} color="red">
        <Card 
          style={{...CardStyles, background: '#9f17e3', overflow: "auto"}} 
          hoverable={true}
          onClick={()=>history.push(`/assignment/${props.code}`)}
        >
          
          {props.code}
          <br />
          {props.title}
        </Card>
      </Badge.Ribbon>
    </Col>
  );
};

export const StudentAssignmentCard = (props) => {
  let history = useHistory();
  const color = () => {
    switch (props.type) {
      case "failed":
        return "#ed0e0e";
      case "marked":
        return "#9f17e3";
      default:
        return "#0cf041";
    }
  }
  return (
    <Col span={6}>
      <Badge.Ribbon text={props.mark > 0 ? props.mark + '%' : props.type === "failed" ? 0 + "%" : null} color={props.type === "failed" ? "blue" : "red"}>
        <Card 
          hoverable={true} 
          style={{...CardStyles, background: color()}} 
          onClick={()=>history.push(`/assignment/${props.code}`)}
        >
          {props.code}
          <br />
          {props.title}
          <br />
          {props.teacher}
          <br />
          {(() => {
            switch(props.type) {
              case 'todo':
                return <Countdown value={new Date(props.deadline)} />;
              default:
                return;
            }
          })()}
        </Card>
      </Badge.Ribbon>
    </Col>
  );
}
