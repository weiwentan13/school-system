import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button } from "antd";
import "../index.css";
import "hammerjs";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "bootstrap-4-grid/css/grid.min.css";
import { PieChartContainer } from "../components/pieChart";
import { BarChartContainer } from "../components/barChart";
import { PanelBarContainer } from "../components/panelBar";
import { GridContainer } from "../components/grid.js";

const ConvertToPDF = (input) => {
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 0, 0);
    pdf.save("download.pdf");
  });
};

export default function Statistic () {
  const [current, setCurrent] = useState('');
  const appContainer = useRef(null);
  const handlePDFExport = () => {
    ConvertToPDF(ReactDOM.findDOMNode(appContainer.current));
  };

  useEffect(() => {
    console.log(current);
  }, [current]);

  return (
    <div className="bootstrap-wrapper">
      <div className="app-container container" ref={appContainer}>
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <h1>Sales | Q4 2018</h1>
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 buttons-right">
            <Button onClick={handlePDFExport}>Export to PDF</Button>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
            <PanelBarContainer setCurrent={setCurrent}/>
          </div>
          <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                <PieChartContainer />
              </div>
              <div className="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2">
                <div className="percentage-container">
                  <span className="percentage-number">94</span>
                  <span className="percentage-sign">%</span>
                  <p>AVERAGE SCORE</p>
                </div>
                <div className="percentage-container">
                  <span className="percentage-number">89</span>
                  <span className="percentage-sign">%</span>
                  <p>PERCENTILE</p>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <BarChartContainer />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <GridContainer current={current} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
