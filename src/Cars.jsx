import "./Cars.css";
import React, { useEffect, useState } from "react";
import { IoCarSport } from "react-icons/io5";
import { FaCity } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineChromeReaderMode } from "react-icons/md";
import { SiBrenntag } from "react-icons/si";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";

function Cars() {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    const paths = {
      1: "/city",
      2: "/cars",
      3: "/brend",
      4: "/catigories",
      5: "/location",
      6: "/model",
    };
    navigate(paths[e.key]);
  };

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Header, Sider, Content } = Layout;
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cars")
      .then((res) => res.json())
      .then((data) => setList(data?.data || []))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const logout = () => {
    navigate("/l");
  };

  return (
    <div>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}>
          <div className="demo-logo-vertical" />
          <h1 className="home-title">Autozoom Admin</h1>
          <Menu
             className="laout-menu"
            onClick={handleMenuClick}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["2"]}
            items={[
              {
                key: "1",
                icon: <FaCity style={{ width: '25px', height: '25px' }} />,
                label: "City",
              },
              {
                key: "2",
                icon: <IoCarSport style={{ width: '25px', height: '25px' }}/>,
                label: "Cars",
              },
              {
                key: "3",
                icon: <SiBrenntag style={{ width: '25px', height: '25px' }} />,
                label: "Brend",
              },
              {
                key: "4",
                icon: <IoMdSettings style={{ width: '25px', height: '25px' }}/>,
                label: "Settings",
              },
              {
                key: "5",
                icon: <FaMapLocationDot style={{ width: '25px', height: '25px' }}/>,
                label: "Location",
              },
              {
                key: "6",
                icon: <MdOutlineChromeReaderMode style={{ width: '25px', height: '25px' }} />,
                label: "Model",
              },
            ]}
          />
        </Sider>
        <Layout   style={{
          marginLeft: 200,
        }}>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <div className="btnlar">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Button type="primary" danger className="logout-btn" onClick={logout}>
              Log out
            </Button>
            </div>
          </Header>
          <Content
           style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
          >
             <Button type="primary">Add</Button>
            <table id="customers">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Name</th>
                  <th>Year</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.brand.title}</td>
                    <td>{item.year}</td>
                    <td>
                      <img
                        src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.brand.image_src}`}
                        alt={item.name}
                        width="100"
                      />
                    </td>
                    <td>
                      <Button className="edit-btn" type="primary">
                        Edit
                      </Button>
                      <Button className="delete-btn" type="primary" danger>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Cars;
