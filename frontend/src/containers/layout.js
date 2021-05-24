import { Layout, Menu, Avatar, Upload, message } from 'antd';
import 'antd/dist/antd.css';
import { UserOutlined, LaptopOutlined, BarChartOutlined, CalendarOutlined, TeamOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../store/actions/auth";
import * as avatarActions from "../store/actions/profile";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const SideBarMenu = () => {
  const dispatch = useDispatch();
  const is_student = JSON.parse(localStorage.getItem('user')).is_student;
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['2']}
      style={{ height: '70%' }}
    >
      <Menu.Item key="1" icon={<UserOutlined />} title="Profile">
        <Link to='/profile'>Profile</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<LaptopOutlined />}>
        <Link to='/assignment'>Assignment</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<CalendarOutlined />} title="Schedule">
        Schedule
      </Menu.Item>
      {
        is_student ?
        null
        :
        <SubMenu key="4" icon={<TeamOutlined />} title="Attendance">
          <Menu.Item key="4-1"><Link to='/attendance/1'>Grade 1</Link></Menu.Item>
          <Menu.Item key="4-2"><Link to='/attendance/2'>Grade 2</Link></Menu.Item>
          <Menu.Item key="4-3"><Link to='/attendance/3'>Grade 3</Link></Menu.Item>
          <Menu.Item key="4-4"><Link to='/attendance/4'>Grade 4</Link></Menu.Item>
          <Menu.Item key="4-5"><Link to='/attendance/5'>Grade 5</Link></Menu.Item>
          <Menu.Item key="4-6"><Link to='/attendance/6'>Grade 6</Link></Menu.Item>
        </SubMenu>
      }
      <Menu.Item key="5" icon={<BarChartOutlined />} title="Statistics">
        <Link to='/statistics'>Statistics</Link>
      </Menu.Item>
      <Menu.Item key="6" icon={<PoweroffOutlined />} onClick={()=>dispatch(actions.logout())}>
        Logout
      </Menu.Item>
    </Menu>
  );
};

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const avatar = useSelector(state => state.user.avatar);
  const dispatch = useDispatch()
  const props = {
    maxCount: 1,
    showUploadList: false,
    beforeUpload: file => {
      if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
        message.error(`${file.name} is not a png/jpg file`);
      }
      else{
        dispatch(avatarActions.updateAvatar(file));
      }
      return false;
    }
  };

  useEffect(() => {
    dispatch(avatarActions.getAvatar());
  }, [dispatch]);

  return (
    <Sider 
      width={160} 
      collapsible 
      collapsed={collapsed} 
      onCollapse={()=>setCollapsed(!collapsed)}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        textAlign: 'center',
        left: 0,
        top: 0,
      }}
    >
      <Upload 
        {...props}
      >
        <Avatar 
          size={80} 
          src={avatar !== null ? avatar.avatar : ""}
          icon={<UserOutlined />}
          style={{
            marginLeft: 'auto',
            marginRight: 'auto', 
            marginTop: '15px', 
            marginBottom: '10px',
            cursor: 'pointer',
            display: 'block'
          }} 
        />
      </Upload>
      <SideBarMenu />
    </Sider>
  );
}

export default function HeaderContainer({children}) {
  return (
    <Layout>
      <SideBar />
      <Layout style={{ minHeight: '80vh', marginLeft: 150, marginTop: '0rem' }}>
        <Content 
          style={{ 
            padding: '0 24px', 
            minHeight: 200,
            background: 'white',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
