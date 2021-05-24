import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions/auth";
import { Form, Input, Button, Checkbox } from 'antd';
import { useHistory, Link } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const centerForm= {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}
const LoginForm = () => {
  let history = useHistory();
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const onFinish = (values) => {
    dispatch(actions.authLogin(values.username, values.password));
  };

  useEffect(() => {
    if(token !== null && token !== undefined) {
      history.push('/assignment');
    }
  }, [token, history]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      {...layout}
	    style={centerForm}
      name="login"
      initialValues={{ remember: true, password: "test12345" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button style={{marginRight: "15px"}} type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <Link to="signup">register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;