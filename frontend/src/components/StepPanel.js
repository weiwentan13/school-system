import React, { useState } from "react";
import { Button, Steps, Form } from "antd";
import { Link } from "react-router-dom";
import './temp.css';

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const StepPanel = (props) => {
  const [activeStep, setActiveStep] = useState(0);

  function next() {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
  }

  function prev() {
    const prevStep = activeStep - 1;
    setActiveStep(prevStep);
  }

  return (
    <>
      <Steps current={activeStep} style={{ width: 400 }}>
        {props.steps.map((item) => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>
      {props.steps.map((item) => (
        <div
          key={item.title}
          className={`steps-content ${
            item.step !== activeStep + 1 && "hidden"
          }`}
        >
          {item.content}
        </div>
      ))}
      <div className="steps-action">
	  <Form.Item {...tailLayout}>
        {activeStep < props.steps.length - 1 && (
          <Button style={{ margin: "0 8px" }} type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {activeStep === props.steps.length - 1 && (
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        )}
        {activeStep > 0 && (
			<Button style={{ margin: "0 8px" }} type="primary" onClick={() => prev()}>
			  Previous
			</Button>
        )}
		<Link to="login">login now!</Link>
		</Form.Item>
      </div>
    </>
  );
};
