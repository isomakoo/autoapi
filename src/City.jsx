import "./City.css";
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
  UploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Layout,
  Menu,
  Modal,
  message,
  theme,
  Form,
  Input,
  Upload,
  Table,
} from "antd";
import { useNavigate } from "react-router-dom";

function City() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [nameEn, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [pic, setPic] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);
  const [idedit, setIdedit] = useState(null);
  const [names, setNames] = useState("");
  const [texts, setTexts] = useState("");
  const [images, setImages] = useState(null);
  const [ides, setIdes] = useState(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Header, Sider, Content } = Layout;

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch(
        "https://autoapi.dezinfeksiyatashkent.uz/api/cities"
      );
      const data = await response.json();
      setList(data?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  const logout = () => navigate("/");

  const openModal = () => setIsModalOpen(true);

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", nameEn);
      formData.append("text", nameRu);
      if (pic) formData.append("images", pic);

      const accessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";

      const response = await fetch(
        "https://autoapi.dezinfeksiyatashkent.uz/api/cities",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (result.success) {
        message.success("City added successfully");
        fetchCities();
        setIsModalOpen(false);
      } else {
        message.error(
          `Error adding city: ${result.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      message.error(`Something went wrong: ${error.message}`);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => setIsModalOpen(false);

  const showModalEdit = (item) => {
    if (item) {
      setIsModalOpenEdit(true);
      setIdedit(item.id);
      setNames(item.name || "");
      setTexts(item.text || "");
      setImages(null); // Update with the selected image if needed
    } else {
      console.error("Item not found");
    }
  };

  const handleEditOk = async () => {
    setConfirmLoadingEdit(true);
    try {
      const formData = new FormData();
      formData.append("name", names);
      formData.append("text", texts);
      if (images) formData.append("image_src", images);
      const accessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";

      const response = await fetch(
        `https://autoapi.dezinfeksiyatashkent.uz/api/cities/${idedit}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (result.success) {
        message.success("City updated successfully");
        fetchCities();
        setIsModalOpenEdit(false);
      } else {
        message.error("Error updating city");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      message.error("Something went wrong");
    } finally {
      setConfirmLoadingEdit(false);
    }
  };

  const handleCancelEdit = () => setIsModalOpenEdit(false);

  const showModalDelete = (item) => {
    setIdes(item.id);
    setIsModalOpenDelete(true);
  };

  const handleDeleteOk = async () => {
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";

    try {
      const response = await fetch(
        `https://autoapi.dezinfeksiyatashkent.uz/api/cities/${ides}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Ensure space after Bearer
          },
        }
      );

      const result = await response.json();
      if (result.success) {
        message.success("City deleted successfully");
        fetchCities();
        setIsModalOpenDelete(false);
      } else {
        message.error(
          "Error deleting city: " + (result.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      message.error("Something went wrong: " + error.message);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancelDelete = () => setIsModalOpenDelete(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Text",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "Image",
      dataIndex: "image_src",
      key: "image_src",
      render: (image_src) => (
        <img
          src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${image_src}`}
          alt="City"
          style={{ width: "120px", height: "80px" }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            onClick={() => showModalEdit(record)}
            type="primary"
            style={{ margin: 10 }}
          >
            Edit
          </Button>
          <Button onClick={() => showModalDelete(record)} type="primary" danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
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
              <a href="#">Cities</a>
            </Menu.Item>
            <Menu.Item key="2" icon={<IoCarSport />}>
              <a href="#">Cars</a>
            </Menu.Item>
            <Menu.Item key="3" icon={<SiBrenntag />}>
              <a href="#">Brends</a>
            </Menu.Item>
            <Menu.Item key="4" icon={<IoMdSettings />}>
              <a href="#">Categories</a>
            </Menu.Item>
            <Menu.Item key="5" icon={<FaMapLocationDot />}>
              <a href="#">Locations</a>
            </Menu.Item>
            <Menu.Item key="6" icon={<MdOutlineChromeReaderMode />}>
              <a href="#">Models</a>
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
              background: colorBgContainer,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: "16px",
              paddingRight: "16px",
              borderBottomLeftRadius: borderRadiusLG,
              borderBottomRightRadius: borderRadiusLG,
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
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              minHeight: 280,
            }}
          >
            <Button
              onClick={openModal}
              type="primary"
              icon={<UploadOutlined />}
              style={{ marginBottom: 20 }}
            >
              Add City
            </Button>
            <Table columns={columns} dataSource={list} rowKey="id" />
          </Content>
        </Layout>
      </Layout>

      <Modal
        title="Add City"
        visible={isModalOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Name">
            <Input
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="Enter city name in English"
            />
          </Form.Item>
          <Form.Item label="Text">
            <Input
              value={nameRu}
              onChange={(e) => setNameRu(e.target.value)}
              placeholder="Enter city name in Russian"
            />
          </Form.Item>
          <Form.Item label="Image">
            <Upload
              customRequest={({ file, onSuccess }) => {
                setPic(file);
                onSuccess();
              }}
              listType="picture-card"
              showUploadList={false}
            >
              {pic ? (
                <img
                  src={URL.createObjectURL(pic)}
                  alt="Uploaded"
                  style={{ width: "100%" }}
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit City"
        visible={isModalOpenEdit}
        onOk={handleEditOk}
        confirmLoading={confirmLoadingEdit}
        onCancel={handleCancelEdit}
      >
        <Form>
          <Form.Item label="Name">
            <Input
              value={names}
              onChange={(e) => setNames(e.target.value)}
              placeholder="Enter city name in English"
            />
          </Form.Item>
          <Form.Item label="Text">
            <Input
              value={texts}
              onChange={(e) => setTexts(e.target.value)}
              placeholder="Enter city name in Russian"
            />
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
                  style={{ width: "100%" }}
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete City"
        visible={isModalOpenDelete}
        onOk={handleDeleteOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancelDelete}
      >
        <p>malumotlarni uchirmoqchimisz</p>
      </Modal>
    </div>
  );
}

export default City;
