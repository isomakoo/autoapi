import './Model.css';
import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

function Model() {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    const routes = {
      '1': '/city',
      '2': '/cars',
      '3': '/brend',
      '4': '/catigories',
      '5': '/location',
      '6': '/model',
    };
    navigate(routes[e.key]);
  };

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Header, Sider, Content } = Layout;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/models')
      .then((res) => res.json())
      .then((data) => {
        setList(data?.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className='model-container'>
      <Layout className='home-loat'>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className='demo-logo-vertical' />
          <h1 className='home-title'>Autozoom Admin</h1>
          <Menu
            onClick={handleMenuClick}
            theme='dark'
            mode='inline'
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <VideoCameraOutlined />,
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
              type='text'
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
            <Button type='primary' danger className='logout-btn' onClick={handleLogout}>
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
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error loading data</p>
            ) : (
              <table id='customers'>
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Name</th>
                    <th>Text</th>
                    <th>Uzgartirishlar</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{index + 1}</td>
                      <td>{item.brand_title}</td>
                      <td>{item.name}</td>
                      <td>
                        <Button className='edit-btn' type='primary'>
                            Tahrirlash
                        </Button>
                        <Button className='delet-btn' type='primary' danger>Uchirish</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Model;
