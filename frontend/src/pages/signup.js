import React, { useEffect } from 'react';
import { Form, Input, Radio, InputNumber, Divider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from "../store/actions/auth";
import { useHistory } from "react-router-dom";
import { StepPanel } from "../components/StepPanel";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const centerForm= {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

function RegistrationForm() {
	let history = useHistory();
	const dispatch = useDispatch();
	const token = useSelector(state => state.auth.token)
	  const onFinish = () => {
		const formData = registrationForm.getFieldsValue();
		dispatch(actions.authSignup(formData));
	  };

	  useEffect(() => {
      if(token!==null && token !== undefined) {
        history.push('/profile');
      }
	  }, [token, history]);

  const [registrationForm] = Form.useForm();

  const Step1Form = () => {
    return (
      <>
        <Divider />
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please input your username"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!"
            },
            {
              required: true,
              message: "Please input your E-mail!"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!"
            }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!"
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="firstname"
          label="First name"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Last name"
          rules={[
            {
              required: true,
              message: "Please input your last name!",
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>
      </>
    );
  };

  const Step2Form = () => {
    return (
      <>
        <Divider />
        <Form.Item
          name="age"
          label="Age"
          rules={[
            {
              required: true,
              message: "Please input your age!"
            }
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="gender" label="Gender">
          <Radio.Group>
            <Radio value={1}>Male</Radio>
            <Radio value={2}>Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="race" label="Race">
          <Radio.Group>
            <Radio value={1}>Chinese</Radio>
            <Radio value={2}>Indian</Radio>
            <Radio value={3}>Malay</Radio>
            <Radio value={4}>Others</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="religion" label="Religion">
          <Radio.Group>
            <Radio value={1}>Christian</Radio>
            <Radio value={2}>Buddha</Radio>
            <Radio value={3}>Muslim</Radio>
            <Radio value={4}>Others</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="contactnumber"
          label="Contact Number"
          rules={[
            {
              required: true,
              message: "Please input your contact number!"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Type">
          <Radio.Group>
            <Radio value={true}>Student</Radio>
            <Radio value={false}>Teacher</Radio>
          </Radio.Group>
        </Form.Item>
      </>
    );
  };

  const steps = [
    {
      step: 1,
      title: "Step1",
      content: <Step1Form />
    },
    {
      step: 2,
      title: "Step2",
      content: <Step2Form />
    }
  ];

  return (
    <Form 
      {...layout} 
      name="register"
      style={centerForm} 
      form={registrationForm} 
      onFinish={onFinish}
      initialValues={{
        password: 'test12345',
        confirm: 'test12345',
        gender: 1,
        religion: 1,
        race: 1,
        type: true,
        contactnumber: "13213213",
        address: "1, Jalan Apple 6, Taman Apple",
        age: 15,
        firstname: "Apple",
        lastname: "Tan"
      }}
      scrollToFirstError
	  >
      <Divider orientation="middle">Sign Up</Divider>
      <StepPanel steps={steps} />
      <Divider />
    </Form>
  );
}

export default RegistrationForm;