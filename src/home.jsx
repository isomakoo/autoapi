import './Home.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined ,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

function Home() {
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
      navigate('/model');
    } else if (e.key === '6') {
      navigate('/location');
    }
  };

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Header, Sider, Content } = Layout;

  return (
    <div className='home-container'>
      <Layout className='home-layout'>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <h1 className='home-title'>Autozoom Admin</h1>
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
                icon: <UploadOutlined />,
                label: 'Model',
              },
              {
                key: '6',
                icon: <VideoCameraOutlined />,
                label: 'Location',
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
            <Button type='primary' danger className='logout-btn'>
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
            Content
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Home;
