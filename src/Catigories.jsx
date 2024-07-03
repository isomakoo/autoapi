import "./Catigories.css";
import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Modal, theme } from "antd";
import { useNavigate } from "react-router-dom";

function Catigories() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [idjon, setidjon]=useState(null)
  const { Header, Sider, Content } = Layout;
  const [list, setList] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [nameEn, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [pic, setPic] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
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
    setIsEditModalOpen(false);
  };

  const showDeleteModal = (id) => {
    setIsDeleteModalOpen(true);
    setidjon(item.id)
  };

  const confirmDelete = () => {
    uchirbtn(id)
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setNameEn("");
    setNameRu("");
    setPic(null);
    setEditItemId(null);
  };
  const uchirbtn=(id)=>{
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`,{
        method: "DELET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
          },
    } )
    .then((res)=>res.json)
    .then((resp)=> {
        if (resp.success) {
          toast.success("muvafaqatliy uchirildi")
          getList();
          handleCancel();
        } else {
          toast.error("Nimadir xato")
          console.error("Kategoriyani o'chirishda xato:", resp);
        }
      })
      .catch((error) => {
        console.error("Ma'lumotlarni o'chirishda xato:", error);
      });
  }
  const logout=()=>{
    navigate('/')
  }
  return (
    <div className="categories-container">
      <Layout className="home-layout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            onClick={buttonjon}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
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
                label: "Categories",
              },
              {
                key: "5",
                icon: <VideoCameraOutlined />,
                label: "Location",
              },
              {
                key: "6",
                icon: <UploadOutlined />,
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
                        className="editjon-btn"
                        type="primary"
                        onClick={() => showEditModal(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="primary"
                        danger
                        onClick={showDeleteModal}
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
            type="file"
            onChange={(e) => setPic(e.target.files[0])}
          />
          <br />
          <button type="submit">Save Changes</button>
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
