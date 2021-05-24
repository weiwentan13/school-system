import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Table, Divider, Button, Row, Col, DatePicker } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import moment from 'moment';
import * as attendanceActions from "../store/actions/attendances";
import * as studentActions from "../store/actions/profile";
import { Link, useParams } from 'react-router-dom';

const columns = [
  {
    title: 'Student ID',
    dataIndex: 'id',
    render: (id) => <Link to={`/students/${id}`}>{id}</Link>,
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.id > b.id,
  },
  {
    title: 'Name',
    dataIndex: ["user", "fullname"],
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.user.fullname < b.user.fullname,
  },
  {
    title: 'Gender',
    dataIndex: ["user", "gender"],
  },
  {
    title: 'Email',
    dataIndex: ["user", "email"],
  }
];

export default function Attendance () {
  const [editMode, setEditMode] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [savedSelectedRowKeys, setSavedSelectedRowKeys] = useState([]);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [allRowKeys, setAllRowKeys] = useState([]);
  const [pendingToSave, setPendingToSave] = useState([]);
  const [pendingToDelete, setPendingToDelete] = useState([]);
  const dispatch = useDispatch()
  const absence = useSelector(state => state.attendance.absence);
  const isLoadingAbsence = useSelector(state => state.attendance.loading);
  const studentList = useSelector(state => state.user.studentList);
  const isLoadingStudentList = useSelector(state => state.user.loading);
  const { year } = useParams();

  useEffect(() => {
		dispatch(studentActions.getStudentList(year));
	}, [year, dispatch]);

  useEffect(() => {
    setAllRowKeys(studentList.map(item => item.id));
  }, [studentList]);

  useEffect(() => {
    dispatch(attendanceActions.getAbsence(date, year));
  }, [date, year, dispatch]);
  
  useEffect(() => {
    if(Array.isArray(absence))
    {
      const a = allRowKeys.slice();
      if(a.length !== 0){
        absence.forEach((item) => {
          const index = a.indexOf(item.student);
          if (index > -1) {
            a.splice(index, 1);
          }
        });
        setSelectedRowKeys(a);
        setSavedSelectedRowKeys(a);
      }
    }
  }, [absence, allRowKeys]);

  useEffect(() => {
    if(pendingToSave.length !== 0)
    {
      const list = pendingToSave.map((item=>{
        const temp = {
          student: item,
          date: date
        };
        return temp;
      }))
      dispatch(attendanceActions.createAbsence(list));
    }
  }, [pendingToSave, date, dispatch]);

  useEffect(() => {
    if(pendingToDelete.length !== 0)
    {
      dispatch(attendanceActions.deleteAbsence(pendingToDelete, date));
    }
  }, [pendingToDelete, date, dispatch]);

  const onChange = value => {
    setSelectedRowKeys(value);
  };

  const getCheckboxProps = () => {
    return {
      disabled: !editMode
    };
  };

  const saveChanges = () => {
    setEditMode(!editMode);
    setPendingToDelete(selectedRowKeys.filter(x => !savedSelectedRowKeys.includes(x)));
    setPendingToSave(savedSelectedRowKeys.filter(x => !selectedRowKeys.includes(x)));
  }
  
  const onDateChange = (date, dateString) => {
    setDate(dateString);
  }

  const rowSelection = {
    type: 'checkbox',
    selectedRowKeys,
    onChange: onChange,
    getCheckboxProps: getCheckboxProps,
  };

  return (
    <div>
      <Divider orientation="middle"><UnorderedListOutlined /> Attendance List</Divider>
      <Row>
        <Col span={10}>
          {
            editMode ? 
            <Button style={{width:"15%", marginBottom:"10px"}} onClick={()=>saveChanges()} type="primary">Save</Button>
            :
            <Button style={{width:"15%", marginBottom:"10px"}} onClick={()=>setEditMode(!editMode)} type="primary">Edit</Button>
          }
        </Col>
        <Col span={3}>
          <DatePicker onChange={onDateChange} defaultValue={moment()}/>
        </Col>
        <Col span={4}>
          <h2 style={{textAlign: 'left'}}>{`${selectedRowKeys.length}/${allRowKeys.length}`}</h2>
        </Col>
      </Row>
      {
        isLoadingStudentList || isLoadingAbsence?
        null
        :
        <Table
          rowSelection={rowSelection}
          rowKey="id"
          columns={columns}
          dataSource={studentList}
        />
      }
    </div>
  );
};