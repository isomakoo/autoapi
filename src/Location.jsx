import './Location.css'
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
function Location() {
    const navigate = useNavigate();

  const buttonjon= (e) => {
    if (e.key === '1') {
      navigate('/city');
    } else if (e.key === '2') {
      navigate('/cars');
    } else if (e.key === '3') {
      navigate('/brend');
    } else if (e.key === '4') {
      navigate('/catigories');
    } else if (e.key === '5') {
      navigate('/location');
    } else if (e.key === '6') {
      navigate('/model');
    }
  };
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { Header, Sider, Content } = Layout;
    const logout=()=>{
        navigate('/')
      }
    return (
      <div className='location-container'>
        <Layout className='home-loat'> 
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
        onClick={buttonjon}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            { 
              key: '1',
              icon: <UserOutlined />,
              label: 'City',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Cars',
            },
            {
                key: '3',
                icon: <VideoCameraOutlined />,
                label: 'Brend',
              },
              {
                key: '4',
                icon: <VideoCameraOutlined />,
                label: 'Catigories',
              },
              {
                key: '5',
                icon: <VideoCameraOutlined />,
                label: 'Location',
              },
            {
              key: '6',
              icon: <UploadOutlined />,
              label: 'Model',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Button type='primary'>
              Add
            </Button>
            <Button type='primary' danger className='logout-btn' onClick={logout}>
              Log out
            </Button>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 550,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Locationga Xush kelibsan
        </Content>
      </Layout>
    </Layout>
      </div>
    )
  }
  
  export default Location