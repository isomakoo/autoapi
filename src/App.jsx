import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { FaCity } from 'react-icons/fa';
import { IoCarSport } from 'react-icons/io5';
import { SiBrenntag } from 'react-icons/si';
import { IoMdSettings } from 'react-icons/io';
import { FaMapLocationDot } from 'react-icons/fa6';
import { MdOutlineChromeReaderMode } from 'react-icons/md';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Home from "./home";
import Location from "./Location";
import Cars from "./Cars";
import Brend from "./Brend";
import Model from "./Model";
import Login from "./Login";
import City from "./City";
import Catigories from "./Catigories";

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    const routes = {
      1: "/city",
      2: "/cars",
      3: "/brend",
      4: "/catigories",
      5: "/location",
      6: "/model",
    };
    navigate(routes[e.key]);
  };

  const logout = () => {
    // Logout logic here
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="logo" />
          <div className="demo-logo-vertical">
            <img
              src="https://admin-panel-team.netlify.app/favicon.svg"
              alt="Logo"
            />
          </div>
          <h1 className="home-title">AutozoomAdmin</h1>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={handleMenuClick}
          >
            <Menu.Item key="1" icon={<FaCity />}>
              Cities
            </Menu.Item>
            <Menu.Item key="2" icon={<IoCarSport />}>
              Cars
            </Menu.Item>
            <Menu.Item key="3" icon={<SiBrenntag />}>
              Brends
            </Menu.Item>
            <Menu.Item key="4" icon={<IoMdSettings />}>
              Categories
            </Menu.Item>
            <Menu.Item key="5" icon={<FaMapLocationDot />}>
              Locations
            </Menu.Item>
            <Menu.Item key="6" icon={<MdOutlineChromeReaderMode />}>
              Models
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="site-layout"
          style={{
            marginLeft: collapsed ? 80 : 200,
            transition: "margin-left 0.2s",
          }}
        >
          <Header
            style={{
              padding: 0,
              background: '#fff', // `colorBgContainer` o'rniga haqiqiy rangni ishlating
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: "16px",
              paddingRight: "16px",
              borderBottomLeftRadius: 10, // `borderRadiusLG` o'rniga haqiqiy qiymatni ishlating
              borderBottomRightRadius: 10, // `borderRadiusLG` o'rniga haqiqiy qiymatni ishlating
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <Button onClick={logout} type="primary" danger>
              Logout
            </Button>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: '#fff', // `colorBgContainer` o'rniga haqiqiy rangni ishlating
              borderRadius: 10, // `borderRadiusLG` o'rniga haqiqiy qiymatni ishlating
              minHeight: 280,
            }}
          >
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/location" element={<Location />} />
              <Route path="/brend" element={<Brend />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/model" element={<Model />} />
              <Route path="/city" element={<City />} />
              <Route path="/home" element={<City />} />
              <Route path="/catigories" element={<Catigories />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
