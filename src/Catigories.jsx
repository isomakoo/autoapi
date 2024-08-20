import "./Catigories.css";
import React, { useState, useEffect } from "react";
import { IoCarSport } from "react-icons/io5";
import { FaCity } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineChromeReaderMode } from "react-icons/md";
import { SiBrenntag } from "react-icons/si";
import { MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Modal, message, theme, Form, Input, Upload } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function Catigories() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();
  const [idjon, setIdjon] = useState(null);
  const [list, setList] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [error, setError] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [form] = Form.useForm();
  const [images, setImages] = useState(null);

  const accessToken = "your-access-token";

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
      .then((res) => res.json())
      .then((data) => setList(data?.data || []))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      });
  };

  const buttonJon = (e) => {
    switch (e.key) {
      case "1": navigate("/city"); break;
      case "2": navigate("/cars"); break;
      case "3": navigate("/brend"); break;
      case "4": navigate("/catigories"); break;
      case "5": navigate("/location"); break;
      case "6": navigate("/model"); break;
      default: break;
    }
  };

  const showEditModal = (item) => {
    setIsEditModalOpen(true);
    form.setFieldsValue({
      name_en: item.name_en,
      name_ru: item.name_ru,
    });
    setEditItemId(item.id);
  };

  const handleEditSubmit = (values) => {
    const formData = new FormData();
    formData.append("name_en", values.name_en);
    formData.append("name_ru", values.name_ru);
    if (images) {
      formData.append("images", images);
    }
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";

    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${editItemId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          getList();
          handleCancel();
          message.success("Kategoriya muvaffaqiyatli tahrirlandi");
        } else {
          console.error("Kategoriyani tahrirlashda xato:", resp);
          message.error("Kategoriya tahrirlanmadi");
        }
      })
      .catch((error) => {
        console.error("Ma'lumotlarni tahrirlashda xato:", error);
        message.error("Kategoriya tahrirlanmadi");
      });
  };

  const showDeleteModal = (id) => {
    setIsDeleteModalOpen(true);
    setIdjon(id);
  };

  const confirmDelete = () => {
    if (idjon) {
      uchirbtn(idjon);
    }
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setAddModal(false);
    form.resetFields();
    setImages(null);
    setEditItemId(null);
  };

  const uchirbtn = (id) => {
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";

    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          message.success("Muvaffaqiyatli o'chirildi");
          getList();
          handleCancel();
        } else {
          message.error("Nimadir xato");
          console.error("Kategoriyani o'chirishda xato:", resp);
        }
      })
      .catch((error) => {
        console.error("Ma'lumotlarni o'chirishda xato:", error);
      });
  };

  const logout = () => {
    navigate("/");
  };

  const showModal = () => {
    setAddModal(true);
  };

  const handleAddCategory = (values) => {
    const formData = new FormData();
    formData.append("name_en", values.name_en);
    formData.append("name_ru", values.name_ru);
    if (images) {
      formData.append("images", images);
    }
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";

    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          getList();
          handleCancel();
          message.success("Category added successfully");
        } else {
          console.error("Error adding category:", resp);
          message.error("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
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
          <div className="demo-logo-vertical">
            <img src="https://admin-panel-team.netlify.app/favicon.svg" alt="Logo" />
          </div>
          <h1 className="home-title">AutozoomAdmin</h1>
          <Menu
            className="layout-menu"
            onClick={buttonJon}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={[
              { key: "1", icon: <FaCity />, label: "Cities" },
              { key: "2", icon: <IoCarSport />, label: "Cars" },
              { key: "3", icon: <SiBrenntag />, label: "Brends" },
              { key: "4", icon: <IoMdSettings />, label: "Catigories" },
              { key: "5", icon: <FaMapLocationDot />, label: "Locations" },
              { key: "6", icon: <MdOutlineChromeReaderMode />, label: "Models" },
            ]}
          />
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
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
                style={{ fontSize: "16px", width: 64, height: 64 }}
              />
              <Button
                type="primary"
                danger
                className="logout-btn"
                onClick={logout}
              >
                Chiqish
              </Button>
            </div>
          </Header>
          <Content
            style={{
              margin: '24px 16px 0',
              overflow: 'initial',
            }}
          >
            <Button type="primary" onClick={showModal}>
              Qushish
            </Button>
            <Modal
              title="Add Category"
              open={addModal}
              onCancel={handleCancel}
              footer={null}
            >
              <Form
                layout="vertical"
                onFinish={handleAddCategory}
                form={form}
              >
                <Form.Item
                  name="name_en"
                  label="Enter Name (EN)"
                  rules={[{ required: true, message: "Please input Name (EN)!" }]}
                >
                  <Input placeholder="Name (EN)" />
                </Form.Item>
                <Form.Item
                  name="name_ru"
                  label="Enter Name (RU)"
                  rules={[{ required: true, message: "Please input Name (RU)!" }]}
                >
                  <Input placeholder="Name (RU)" />
                </Form.Item>
                <Form.Item label="Image">
                  <Upload
                    customRequest={({ file, onSuccess }) => {
                      setImages(file);
                      onSuccess();
                    }}
                    listType="picture-card"
                    showUploadList={false}
                  >
                    {images ? (
                      <img
                        src={URL.createObjectURL(images)}
                        alt="Uploaded"
                        style={{ width: '100%' }}
                      />
                    ) : (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
            <Modal
              title="Edit Category"
              open={isEditModalOpen}
              onCancel={handleCancel}
              footer={null}
            >
              <Form
                layout="vertical"
                onFinish={handleEditSubmit}
                form={form}
              >
                <Form.Item
                  name="name_en"
                  label="Enter Name (EN)"
                  rules={[{ required: true, message: "Please input Name (EN)!" }]}
                >
                  <Input placeholder="Name (EN)" />
                </Form.Item>
                <Form.Item
                  name="name_ru"
                  label="Enter Name (RU)"
                  rules={[{ required: true, message: "Please input Name (RU)!" }]}
                >
                  <Input placeholder="Name (RU)" />
                </Form.Item>
                <Form.Item label="Image">
                  <Upload
                    customRequest={({ file, onSuccess }) => {
                      setImages(file);
                      onSuccess();
                    }}
                    listType="picture-card"
                    showUploadList={false}
                  >
                    {images ? (
                      <img
                        src={URL.createObjectURL(images)}
                        alt="Uploaded"
                        style={{ width: '100%' }}
                      />
                    ) : (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Edit
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
            <Modal
              title="Confirm Deletion"
              open={isDeleteModalOpen}
              onOk={confirmDelete}
              onCancel={handleCancel}
            >
              <p>Are you sure you want to delete this category?</p>
            </Modal>
            {error && <p>{error}</p>}
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name (EN)</th>
                  <th>Name (RU)</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.name_en}</td>
                    <td>{item.name_ru}</td>
                    <td>
                      {item.image_src && (
                        <img
                          src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`}
                          alt="Image"
                          style={{ width: '120px', height: '80px' }}
                        />
                      )}
                    </td>
                    <td>
                      <Button
                        type="primary"
                        style={{margin: 10}}
                        onClick={() => showEditModal(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="primary"
                        danger
                        onClick={() => showDeleteModal(item.id)}
                      >
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

export default Catigories;
