import "./Brend.css";
import React, { useEffect, useState } from "react";
import { IoCarSport } from "react-icons/io5";
import { FaCity } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineChromeReaderMode } from "react-icons/md";
import { SiBrenntag } from "react-icons/si";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Input, Layout, Menu, Modal, message, Form, theme } from "antd";
import { useNavigate } from "react-router-dom";

function Brend() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { Header, Sider, Content } = Layout;
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState(null);
  const [selectedBrandId, setSelectedBrandId] = useState(null); // For delete functionality
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false); // For delete modal
  const [form] = Form.useForm(); // Form instance for validation

  const buttonjon = (e) => {
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

  const getList = () => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
      .then((res) => res.json())
      .then((data) => setList(data?.data || []))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    getList();
  }, []);

  const logout = () => {
    navigate("/");
  };

  const addbrend = () => {
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";
    const formData = new FormData();
    formData.append("title", title);
    formData.append("images", img);

    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          getList(); // Refresh the list
          handleCanceladd(); // Close the modal
          message.success("Brend muvaffaqiyatli qo'shildi");
        } else {
          console.error("Xatolik:", resp);
          message.error("Xatolik yuz berdi");
        }
      })
      .catch((error) => {
        console.log("Ma'lumotni yuborishda xatolik:", error);
        message.error("Server bilan bog'lanishda xatolik");
      });
  };

  const showModaladd = () => {
    setOpen(true);
  };

  const handleOkadd = () => {
    form
      .validateFields()
      .then(() => {
        setConfirmLoading(true);
        setTimeout(() => {
          addbrend();
          setOpen(false);
          setConfirmLoading(false);
          form.resetFields(); // Formni tozalash
        }, 2000);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCanceladd = () => {
    setOpen(false);
  };

  const showModalDelete = (id) => {
    setSelectedBrandId(id);
    setIsModalOpenDelete(true);
  };

  const handleBrandDelete = () => {
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/brands/${selectedBrandId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(res => res.json())
    .then(resp => {
      if (resp.success) {
        getList(); // Refresh the list
        message.success('Brend muvaffaqiyatli o\'chirildi');
      } else {
        console.log('Xatolik:', resp);
        message.error('Xatolik yuz berdi');
      }
    })
    .catch(error => {
      console.log('Ma\'lumotni o\'chirishda xatolik:', error);
      message.error('Server bilan bog\'lanishda xatolik');
    });
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  // EDIT Brend
  const [isModalOpenedit, setIsModalOpenedit] = useState(false);
  const [editid, seteditid] = useState(null);
  const [titleedit, setTitleedit] = useState("");
  const [imgedit, setimgedit] = useState(null);

  const showModaledit = (id) => {
    setIsModalOpenedit(true);
    seteditid(id);
  };

  const handleOkedit = () => {
    form
      .validateFields()
      .then(() => {
        editbrend();
        setIsModalOpenedit(false);
        form.resetFields(); // Formni tozalash
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCanceledit = () => {
    setIsModalOpenedit(false);
  };

  const editbrend = () => {
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";
    const formData = new FormData();
    formData.append("title", titleedit);
    if (imgedit) {
      formData.append("images", imgedit);
    }

    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/brands/${editid}`, {
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
          message.success("Brend muvaffaqiyatli tahrirlandi");
        } else {
          console.error("Brendni tahrirlashda xato:", resp);
          message.error("Brend tahrirlanmadi");
        }
      })
      .catch((error) => {
        console.error("Brendni tahrirlashda xatolik:", error);
        message.error("Server bilan bog'lanishda xatolik");
      });
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
            background: colorBgContainer,
          }}
        >
          <div className="demo-logo-vertical">
            <img src="https://admin-panel-team.netlify.app/favicon.svg" alt="Logo" />
          </div>
          <h1 className="home-title">
            AutozoomAdmin
          </h1>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["3"]}
            onClick={buttonjon}
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
                icon: <MdOutlineChromeReaderMode />,
                label: "Categories",
              },
              {
                key: "5",
                icon: <FaMapLocationDot />,
                label: "Location",
              },
              {
                key: "6",
                icon: <IoMdSettings />,
                label: "Model",
              },
            ]}
          />
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
          <Header
            className="site-layout-sub-header-background"
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <div className="trigger">
              {collapsed ? (
                <MenuUnfoldOutlined
                  className="trigger-icon"
                  onClick={() => setCollapsed(false)}
                />
              ) : (
                <MenuFoldOutlined
                  className="trigger-icon"
                  onClick={() => setCollapsed(true)}
                />
              )}
            </div>
            <Button
              type="primary"
              style={{
                margin: "0 16px",
                float: "right",
              }}
              onClick={logout}
            >
              Log out
            </Button>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Button type="primary" onClick={showModaladd}>
              Add
            </Button>
            <Modal
              title="Add Brand"
              open={open}
              onOk={handleOkadd}
              confirmLoading={confirmLoading}
              onCancel={handleCanceladd}
            >
              <Form
                form={form}
                layout="vertical"
                name="addBrandForm"
                initialValues={{ title: "", images: null }}
              >
                <Form.Item
                  name="title"
                  label="Name"
                  rules={[
                    { required: true, message: "Please input the name!" },
                  ]}
                >
                  <Input
                    placeholder="Name"
                    style={{ width: 200, margin: 10 }}
                  />
                </Form.Item>
                <Form.Item
                  name="images"
                  label="Image"
                  rules={[
                    { required: true, message: "Please upload an image!" },
                  ]}
                >
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Rasm kiriting"
                    onChange={(e) => setImg(e.target.files[0])}
                    style={{ width: 200, margin: 10 }}
                  />
                </Form.Item>
              </Form>
            </Modal>

            {/* Delete modal */}
            <Modal
              title="Delete Brand"
              open={isModalOpenDelete}
              onOk={handleBrandDelete}
              onCancel={handleCancelDelete}
            >
              <p>Brend kategoriyasini o'chirmoqchimisiz?</p>
            </Modal>

            {/* Edit modal */}
            <Modal
              title="Edit Brand"
              open={isModalOpenedit}
              onOk={handleOkedit}
              onCancel={handleCanceledit}
            >
              <Form
                form={form}
                layout="vertical"
                name="editBrandForm"
                initialValues={{ title: "", images: null }}
              >
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[
                    { required: true, message: "Please input the title!" },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Title"
                    style={{ width: 200, margin: 10 }}
                    onChange={(e) => setTitleedit(e.target.value)}
                  />
                </Form.Item>
                <Form.Item name="images" label="Image">
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Rasm kiriting"
                    onChange={(e) => setimgedit(e.target.files[0])}
                    style={{ width: 200, margin: 10 }}
                  />
                </Form.Item>
              </Form>
            </Modal>

            <table id="customers">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>
                      <img
                         src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`}
                        alt={item.title}
                        style={{ width: 100 }}
                      />
                    </td>
                    <td>
                      <Button
                        type="primary"
                        onClick={() => showModaledit(item.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => showModalDelete(item.id)}
                        style={{ marginLeft: 10 }}
                        danger
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

export default Brend;
