import { LineChart, Line } from "recharts";
import React, { useEffect } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from 'react-redux';
import * as actions from "../store/actions/assignments";

const { Column } = Table;

const gridData = [
  {
    id: 1,
    subject: "Chai",
    grade: "Grade 1",
    score: 78,
    history: [{ score: 67 }, { score: 70 }, { score: 75 }]
  },
  {
    id: 2,
    subject: "Chang",
    grade: "Grade 1",
    score: 78,
    history: [{ score: 74 }, { score: 79 }, { score: 87 }]
  },
  {
    id: 3,
    subject: "Aniseed Syrup",
    grade: "Grade 1",
    score: 78,
    history: [{ score: 67 }, { score: 54 }, { score: 44 }]
  },
  {
    id: 4,
    subject: "Chef Anton's Cajun Seasoning",
    grade: "Grade 1",
    score: 78,
    history: [{ score: 67 }, { score: 78 }, { score: 93 }]
  },
  {
    id: 5,
    subject: "Chef Anton's Gumbo Mix",
    grade: "Grade 1",
    score: 78,
    history: [{ score: 23 }, { score: 36 }, { score: 45 }]
  }
];

const SimpleLineChart = (data) => (
  <LineChart width={100} height={30} data={data}>
    <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
  </LineChart>
);

export const GridContainer = (props) => {
  const gradedAssignmentList = useSelector(state => state.assignment.gradedAssignmentList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getGradedAssignmentList(props.current));
	}, [dispatch, props.current]);

  return (
    <Table dataSource={gradedAssignmentList}>
      <Column title="Code" dataIndex="assignment" key="assignment" />
      <Column title="Subject" dataIndex="title" key="title" />
      <Column title="Grade" dataIndex="grade" key="grade" />
      <Column title="Mark" dataIndex="mark" key="mark" />
      {/* <Column
        title="History"
        dataIndex="history"
        key="history"
        render={(data) => SimpleLineChart(data)}
      /> */}
    </Table>
  );
}
