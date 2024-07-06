import "./Catigories.css";
import React, { useState, useEffect } from "react";
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
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined ,
} from "@ant-design/icons";
import { Button, Layout, Menu, Modal, message, theme } from "antd";
import { useNavigate } from "react-router-dom";

function Catigories() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [idjon, setidjon] = useState(null);
  const { Header, Sider, Content } = Layout;
  const [list, setList] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [nameEn, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [pic, setPic] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [error, setError] = useState(null);
  const [addmodla, setaddmodal] = useState(false);
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";

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

  const showEditModal = (item) => {
    setIsEditModalOpen(true);
    setNameEn(item.name_en);
    setNameRu(item.name_ru);
    setEditItemId(item.id);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name_en", nameEn);
    formData.append("name_ru", nameRu);
    if (pic) {
      formData.append("images", pic);
    }
    fetch(
      `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${editItemId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          getList();
          handleCancel();
          toast.success("Kategoriya Muvafaqatliy Tahrirlandi");
        } else {
          console.error("Kategoriyani tahrirlashda xato:", resp);
          message.success("Kategoriya tahrirlanmadi");
        }
      })
      .catch((error) => {
        message.success("Kategoriya tahrirlandi");
        console.error("Ma'lumotlarni tahrirlashda xato:", error);
      });
  };

  const showDeleteModal = (id) => {
    setIsDeleteModalOpen(true);
    setidjon(id);
  };

  const confirmDelete = () => {
    if (idjon) {
      uchirbtn(idjon);
      message.success("Muvafaqatliy uchirildi");
    }
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setNameEn("");
    setNameRu("");
    setPic(null);
    setEditItemId(null);
  };

  const uchirbtn = (id) => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          message.success("muvafaqatliy uchirildi");
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
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
    addCategory();
  };
  const handleCancell = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const addCategory = (e) => {
    const formData = new FormData();
    formData.append("name_en", nameEn);
    formData.append("name_ru", nameRu);
    formData.append("images", pic);
    e.preventDefault();
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories`, {
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
    <div >
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
            onClick={buttonjon}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
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
        <Layout style={{
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
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancell}
            >
              <p>Enter Name (EN)</p>
              <input
                type="text"
                placeholder="Name (EN)"
                required
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
              />{" "}
              <br />
              <p>Enter Name (RU)</p>
              <input
                type="text"
                placeholder="Name (RU)"
                required
                value={nameRu}
                onChange={(e) => setNameRu(e.target.value)}
              />{" "}
              <br />
              <p>Upload Image</p>
              <input
                type="file"
                placeholder="Image"
                required
                accept="image/*"
                onChange={(e) => setPic(e.target.files[0])}
              />
              <br />
            </Modal>
            <table id="customers">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>English Name</th>
                  <th>Russian Name</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name_en}</td>
                    <td>{item.name_ru}</td>
                    <td>
                      <img
                        src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`}
                        style={{ width: "100px" }}
                        alt={`Image of ${item.name_en}`}
                      />
                    </td>
                    <td>
                      <Button
                        className="edit-btn"
                        type="primary"
                        onClick={() => showEditModal(item)}
                      >
                        Tahrirlash
                      </Button>
                      <Button
                        className="delet-btn"
                        type="primary"
                        danger
                        onClick={() => showDeleteModal(item.id)}
                      >
                        Uchirish
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Content>
        </Layout>
      </Layout>
      <Modal
        title="Edit Category"
        visible={isEditModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            required
            placeholder="English Name"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
          />
          <br />
          <input
            type="text"
            required
            placeholder="Russian Name"
            value={nameRu}
            onChange={(e) => setNameRu(e.target.value)}
          />
          <br />
          <input
            required
            type="file"
            onChange={(e) => setPic(e.target.files[0])}
          />
          <br />
          <button type="submit">Saqlash</button>
        </form>
      </Modal>
      <Modal
        title="Confirm Delete"
        visible={isDeleteModalOpen}
        onOk={confirmDelete}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this category?</p>
      </Modal>
    </div>
  );
}

export default Catigories;
