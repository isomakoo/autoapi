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
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Modal, message, theme } from "antd";
import { useNavigate } from "react-router-dom";

function City() {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    switch (e.key) {
      case "1":
        navigate("/city");
        break;
      case "2":
        navigate("/cars");
        break;
      case "3":
        navigate("/brend");
        break;
      case "4":
        navigate("/catigories");
        break;
      case "5":
        navigate("/location");
        break;
      case "6":
        navigate("/model");
        break;
      default:
        break;
    }
  };

  const [list, setList] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Header, Sider, Content } = Layout;

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = () => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cities")
      .then((res) => res.json())
      .then((data) => setList(data?.data || []))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const logout = () => {
    navigate("/");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameEn, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [pic, setPic] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    addCategory()
      .then(() => {
        setIsModalOpen(false);
        setConfirmLoading(false);
      })
      .catch(() => {
        setConfirmLoading(false);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //POST
  const addCategory = () => {
    const formData = new FormData();
    formData.append("name", nameEn);
    formData.append("text", nameRu);
    formData.append("images", pic);

    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";

    return fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cities", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          fetchCities();
          message.success("Category added successfully");
        } else {
          console.error("Error adding category:", resp);
          message.error("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        message.error("Something went wrong");
      });
  };
  //EDIT
  const [ides, setides] = useState(null);
  const [idedit, setidedit] = useState(null);
  const [names, setnames] = useState("");
const [texts, settexts] = useState("");
const [images, setimages] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmLoadin, setConfirmLoadin] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModaledit = (item) => {
    setOpen(true);
    setidedit(item.id);
    setnames(item.name || ""); // Name-ni input maydoniga uzatish
    settexts(item.text || ""); // Text-ni input maydoniga uzatish
  };
  

  const handleeditOk = () => {
    setConfirmLoadin(true);
    editCategory(idedit)
      .then(() => {
        setOpen(false);
        setConfirmLoadin(false);
        message.success("Category updated successfully");
      })
      .catch(() => {
        setConfirmLoadin(false);
        message.error("Something went wrong");
      });
  };

  const editCategory = (idedit) => {
    const formData = new FormData();
    if (names) formData.append("name", names); 
    if (texts) formData.append("text", texts); 
    if (images) formData.append("images", images); 
  
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";
  
    return fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cities/${idedit}`, {
      method: "PUT", 
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          fetchCities(); 
          message.success("Category updated successfully");
        } else {
          console.error("Error updating category:", resp);
          message.error("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        message.error("Something went wrong");
      });
  };
  
  const handleCancelEdit = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  //DELET
  const [isModalOpendelet, setIsModalOpendelet] = useState(false);
  const showModaldelet = (item) => {
    setides(item.id);
    setIsModalOpendelet(true);
  };

  const handleOkdelet = () => {
    deleteCategorycity(ides)
      .then(() => {
        setIsModalOpendelet(false);
        fetchCities(); // O'chirilgandan keyin ro'yxatni yangilash
        message.success("Category deleted successfully");
      })
      .catch(() => {
        message.error("Something went wrong");
      });
  };

  const deleteCategorycity = (id) => {
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";

    return fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cities/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (!resp.success) {
          console.error("Error deleting category:", resp);
          throw new Error("Error deleting category");
        }
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        throw error;
      });
  };

  const handleCanceldelet = () => {
    setIsModalOpendelet(false);
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
            className="laout-menu"
            onClick={handleMenuClick}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <FaCity  />,
                label: "City",
              },
              {
                key: "2",
                icon: <IoCarSport  />,
                label: "Cars",
              },
              {
                key: "3",
                icon: <SiBrenntag  />,
                label: "Brend",
              },
              {
                key: "4",
                icon: (
                  <IoMdSettings  />
                ),
                label: "Settings",
              },
              {
                key: "5",
                icon: (
                  <FaMapLocationDot  />
                ),
                label: "Location",
              },
              {
                key: "6",
                icon: (
                  <MdOutlineChromeReaderMode
                    
                  />
                ),
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
              justifyContent: "space-between",
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
              margin: "24px 16px 0",
              overflow: "initial",
            }}
          >
            {" "}
            <Button type="primary" onClick={openModal}>
              Qushish
            </Button>
            <Modal
              title="Add Category"
              open={isModalOpen}
              confirmLoading={confirmLoading}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Enter Name (EN)</p>
              <input
                type="text"
                placeholder="Name"
                required
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
              />
              <br />
              <p>Enter Name (RU)</p>
              <input
                type="text"
                placeholder="Text"
                required
                value={nameRu}
                onChange={(e) => setNameRu(e.target.value)}
              />
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
            <div>
              <table id="customers">
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Name</th>
                    <th>Text</th>
                    <th>Rasmlar</th>
                    <th>Uzgartirishlar</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.text}</td>
                      <td>
                        <img
                          src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`}
                          style={{ width: "100px" }}
                          alt={`Image of ${item.name}`}
                        />
                      </td>
                      <td>
                        <Button
                          className="edit-btn"
                          type="primary"
                          onClick={() => showModaledit(item)}
                        >
                          Edit
                        </Button>
                        <Modal
                          title="Edit Category"
                          open={open}
                          onOk={handleeditOk}
                          confirmLoading={confirmLoadin}
                          onCancel={handleCancelEdit}
                        >
                          <p>Enter Name (EN)</p>
                          <input
                            type="text"
                            placeholder="Name"
                            value={names}
                            onChange={(e) => setnames(e.target.value)}
                          />
                          <br />
                          <p>Enter Name (RU)</p>
                          <input
                            type="text"
                            placeholder="Text"
                            value={texts}
                            onChange={(e) => settexts(e.target.value)}
                          />
                          <br />
                          <p>Upload Image</p>
                          <input
                            required
                            type="file"
                            accept="image/*"
                            onChange={(e) => setimages(e.target.files[0])}
                          />
                          <br />
                        </Modal>
                        <Button
                          className="delet-btn"
                          type="primary"
                          danger
                          onClick={() => showModaldelet(item)}
                        >
                          Delete
                        </Button>
                        <Modal
                          title="Confirm Delete"
                          open={isModalOpendelet}
                          onOk={handleOkdelet}
                          onCancel={handleCanceldelet}
                        >
                          <p>Kategoriyani o'chirmoqchimisiz?</p>
                        </Modal>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default City;
