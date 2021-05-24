import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "Jan",
    cgpa: 3,
    gpa: 3.2
  },
  {
    name: "Feb",
    cgpa: 3.2,
    gpa: 3.3
  },
  {
    name: "Mar",
    cgpa: 3.3,
    gpa: 3.3
  },
  {
    name: "Apr",
    cgpa: 3.3,
    gpa: 3.5
  },
  {
    name: "May",
    cgpa: 3.35,
    gpa: 3.5
  },
  {
    name: "Jun",
    cgpa: 3.4,
    gpa: 3.36
  },
  {
    name: "Jul",
    cgpa: 3.37,
    gpa: 3.65
  },
  {
    name: "Aug",
    cgpa: 3.44,
    gpa: 3.87
  },
  {
    name: "Sep",
    cgpa: 3.54,
    gpa: 3.67
  },
  {
    name: "Oct",
    cgpa: 3.57,
    gpa: 3.65
  },
  {
    name: "Nov",
    cgpa: 3.6,
    gpa: 3.64
  },
  {
    name: "Dec",
    cgpa: 3.61,
    gpa: 3.53
  }
];

export const BarChartContainer = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="cgpa" fill="#8884d8" />
        <Bar dataKey="gpa" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};
