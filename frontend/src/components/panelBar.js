import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Collapse, Avatar, Row, Col } from "antd";
import * as studentActions from "../store/actions/profile";
import { useSelector, useDispatch } from 'react-redux';

const panelData = [1, 2, 3, 4, 5, 6]

const { Panel } = Collapse;

export const PanelBarContainer = (props) => {
  const studentList = useSelector(state => state.user.studentList);
  const dispatch = useDispatch();

  useEffect(() => {
		dispatch(studentActions.getStudentList());
	}, [dispatch]);

  return (
    <Collapse defaultActiveKey={[1]}>
      {
        panelData.map(grade => {
          return (
            <Panel header={"Grade " + grade} key={grade}>
              <>
                {studentList.map((item, index) => (
                  item.year === grade ?
                  <Row key={item.id}>
                    <Col span={18} push={6}>
                      <a onClick={() => props.setCurrent(item.id)}>{item.user.fullname}</a>
                      <p>{item.id}</p>
                    </Col>
                    <Col span={6} pull={18}>
                      <Avatar src={item.user.avatar !== null ? item.user.avatar : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} size={50}/>
                    </Col>
                  </Row>
                  :
                  null
                ))}
              </>
            </Panel>
          )
        })
      }
    </Collapse>
  )
};
