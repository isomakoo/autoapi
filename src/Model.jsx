import "./Model.css";
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
  HomeOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Modal, theme, message, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";

function Model() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modoch, setmodoch] = useState(false);
  const [uch, setuch] = useState(false);
  const [editModal, setEditModal] = useState(false); // New state for edit modal
  const [pro, setpro] = useState([]);
  const [nameEn, setNameEn] = useState("");
  const [brandId, setBrandId] = useState(null);
  const [currentId, setCurrentId] = useState(null); // New state for current item ID
  const [idjon, setidjon] = useState(null); // Added state for delete

  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Header, Sider, Content } = Layout;

  useEffect(() => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models")
      .then((res) => res.json())
      .then((data) => {
        setList(data?.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
      .then((res) => res.json())
      .then((data) => setpro(data?.data || []))
      .catch((error) => {
        console.error("Error fetching brands:", error);
        message.error("Error fetching brands");
      });
  }, []);

  const handleMenuClick = (e) => {
    const routes = {
      1: "/city",
      2: "/cars",
      3: "/brend",
      4: "/categories",
      5: "/location",
      6: "/model",
    };
    navigate(routes[e.key]);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const modadd = () => {
    setmodoch(true);
  };

  const handleCancell = () => {
    setmodoch(false);
    setuch(false);
    setEditModal(false); // Close edit modal on cancel
    setNameEn("");
    setBrandId(null);
    setCurrentId(null);
  };

  const addbtbn = () => {
    const formData = new FormData();
    formData.append("name", nameEn);
    formData.append("brand_id", brandId);

    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          setList((prevList) => [...prevList, resp.data]);
          setmodoch(false);
          message.success("Model muvafaqiyatli qo'shildi");
        } else {
          message.error("Nimadir noto'g'ri ketdi");
        }
      })
      .catch((error) => {
        console.error("Ma'lumotni yuborishda xatolik:", error);
      });
  };

  const editbtbn = () => {
    const formData = new FormData();
    formData.append("name", nameEn);
    formData.append("brand_id", brandId);

    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${currentId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          setList((prevList) =>
            prevList.map((item) =>
              item.id === currentId ? resp.data : item
            )
          );
          setEditModal(false);
          message.success("Model muvafaqiyatli yangilandi");
        } else {
          message.error("Nimadir noto'g'ri ketdi");
        }
      })
      .catch((error) => {
        console.error("Yangilanishda xatolik:", error);
      });
  };

  const deletbtn = (item) => {
    setuch(true);
    setidjon(item.id);
  };

  const confirmDelete = () => {
    uchirbtn(idjon);
  };

  const uchirbtn = (id) => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          message.success("Muvafaqiyatli o'chirildi");
          setList((prevList) => prevList.filter((item) => item.id !== id));
          setuch(false);
        } else {
          message.error("O'chirishda xatolik yuz berdi");
        }
      })
      .catch((error) => {
        console.error("Ma'lumotlarni o'chirishda xatolik:", error);
      });
  };

  const openEditModal = (item) => {
    setNameEn(item.name);
    setBrandId(item.brand_id);
    setCurrentId(item.id);
    setEditModal(true);
  };

  return (
    <div>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
        <div className="demo-logo-vertical">
            <img src="https://admin-panel-team.netlify.app/favicon.svg" alt="Logo" />
          </div>
          <h1 className="home-title">
            AutozoomAdmin
          </h1>
          <Menu
            className="layout-menu"
            onClick={handleMenuClick}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <FaCity />,
                label: "City",
              },
              {
                key: "2",
                icon: <IoCarSport />,
                label: "Cars",
              },
              {
                key: "3",
                icon: <SiBrenntag />,
                label: "Brend",
              },
              {
                key: "4",
                icon: <IoMdSettings />,
                label: "Settings",
              },
              {
                key: "5",
                icon: <FaMapLocationDot />,
                label: "Location",
              },
              {
                key: "6",
                icon: <MdOutlineChromeReaderMode />,
                label: "Model",
              },
            ]}
          />
        </Sider>
        <Layout
         style={{ marginLeft: collapsed ? 80 : 200 }}
        >
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
              <Button
                type="primary"
                danger
                className="logout-btn"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
            }}
          >
            <Button type="primary" onClick={modadd}>
              Add
            </Button>
            <Modal open={modoch} onCancel={handleCancell} onOk={addbtbn}
            title='Kategoriya qushish'>
              <form>
                <Input
                  type="text"
                  required
                  placeholder="Name (En)"
                  value={nameEn}
                  style={{width: 200, margin: 10}}
                  onChange={(e) => setNameEn(e.target.value)}
                />
                <br />
                <Select
                  onChange={(value) => setBrandId(value)}
                  value={brandId}
                  placeholder="Select Brand"
                  style={{ width: 200, margin: 10 }}
                  required
                >
                  {pro && pro.length > 0 ? (
                    pro.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.title}
                      </Select.Option>
                    ))
                  ) : (
                    <Select.Option value="" disabled>No brands available</Select.Option>
                  )}
                </Select>
              </form>
            </Modal>
            <Modal
              open={editModal}
              onCancel={handleCancell}
              onOk={editbtbn}
              title="Kategoriyani Tahrirlash"
            >
              <form>
                <Input
                  type="text"
                  required
                  placeholder="Name (En)"
                  value={nameEn}
                  style={{width: 200, margin: 10}}
                  onChange={(e) => setNameEn(e.target.value)}
                />
                <br />
                <Select
                  onChange={(value) => setBrandId(value)}
                  value={brandId}
                  placeholder="Select Brand"
                  style={{ width: 200, margin: 10 }}
                  required
                >
                  {pro && pro.length > 0 ? (
                    pro.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.title}
                      </Select.Option>
                    ))
                  ) : (
                    <Select.Option value="" disabled>No brands available</Select.Option>
                  )}
                </Select>
              </form>
            </Modal>
            <div className="table-container">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error loading data</p>
              ) : (
                <table id="customers">
                  <thead>
                    <tr>
                      <th>Index</th>
                      <th>Name</th>
                      <th>Text</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((item, index) => (
                      <tr key={item.id || index}>
                        <td>{index + 1}</td>
                        <td>{item.brand_title}</td>
                        <td>{item.name}</td>
                        <td>
                          <Button
                            className="edit-btn"
                            type="primary"
                            style={{margin: 10}}
                            onClick={() => openEditModal(item)}
                          >
                            Edit
                          </Button>
                          <Button
                            className="delete-btn"
                            type="primary"
                            danger
                            onClick={() => deletbtn(item)}
                          >
                            Delete
                          </Button>
                          <Modal
                            open={uch}
                            onCancel={handleCancell}
                            onOk={confirmDelete}
                            title="Kategoriyani Uchirish"
                          >
                            <p>Kategoriyani uchirishni xohlayszmi</p>
                          </Modal>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Model;
