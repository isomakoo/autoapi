import "./Brend.css";
import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";

function Brend() {
  const navigate = useNavigate();

  const buttonjon = (e) => {
    if (e.key === "1") {
      navigate("/city");
    } else if (e.key === "2") {
      navigate("/cars");
    } else if (e.key === "3") {
      navigate("/brend");
    } else if (e.key === "4") {
      navigate("/catigories");
    } else if (e.key === "5") {
      navigate("/location");
    } else if (e.key === "6") {
      navigate("/model");
    }
  };

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Header, Sider, Content } = Layout;
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/brands`)
      .then((res) => res.json())
      .then((data) => setList(data?.data || []))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const logout=()=>{
    navigate('/')
  }

  return (
    <div className="brend-container">
      <Layout className="home-layout"> 
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            onClick={buttonjon}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "City",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "Cars",
              },
              {
                key: "3",
                icon: <VideoCameraOutlined />,
                label: "Brend",
              },
              {
                key: "4",
                icon: <VideoCameraOutlined />,
                label: "Catigories",
              },
              {
                key: "5",
                icon: <UploadOutlined />,
                label: "Location",
              },
              {
                key: "6",
                icon: <VideoCameraOutlined />,
                label: "Model",
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
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Button type="primary">Add</Button>
            <Button type="primary" danger className="logout-btn" onClick={logout}>
              Log out
            </Button>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 550,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <table id="customers">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Name</th>
                  <th>Rasmi</th>
                  <th>Uzgartirishlar</th>
                </tr>
              </thead>
              <tbody>
                {list && list.length > 0 ? (
                  list.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>
                        <img src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`} width="120" />
                      </td>
                      <td>
                        <Button type="primary" className="edit-btn">Tahrirlash</Button>
                        <Button type="primary" className="delet-btn" danger>Uchirish</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No items found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Brend;
