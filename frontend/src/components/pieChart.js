import { PieChart } from "react-minimal-pie-chart";
import React from "react";

const labelTemplate = (e) =>
  e.dataEntry.title + "\n" + e.dataEntry.percentage + "%";
const data = [
  { title: "Critical Thinking", value: 13, color: "#E38627" },
  { title: "Visual Thinking", value: 24, color: "#C13C37" },
  { title: "Verbal Intelligence", value: 13, color: "#6A2135" },
  { title: "Musical Intelligence", value: 18, color: "#E22331" },
  { title: "Kinesthetic Intelligence", value: 32, color: "#E56432" }
];

export const PieChartContainer = () => (
  <PieChart
    center={[50, 50]}
    data={data}
    lineWidth={65}
    radius={50}
    label={(data) => labelTemplate(data)}
    labelPosition={65}
    labelStyle={{
      fontSize: "8px",
      fontColor: "FFFFFA",
      fontWeight: "500"
    }}
  />
);
