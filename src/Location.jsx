import "./Location.css";
import React, { useEffect, useState } from "react";
import { IoCarSport } from "react-icons/io5";
import { FaCity } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineChromeReaderMode } from "react-icons/md";
import { SiBrenntag } from "react-icons/si";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Layout,
  Menu,
  Modal,
  theme,
  Form,
  message,
  Upload,
} from "antd";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

function Location() {
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
    token: { colorBgContainer },
  } = theme.useToken();
  const { Header, Sider, Content } = Layout;

  const logout = () => {
    navigate("/");
  };

  const [list, setList] = useState([]);
  const [form] = Form.useForm();
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [confirmLoadingAdd, setConfirmLoadingAdd] = useState(false);
  const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/locations`)
      .then((res) => res.json())
      .then((data) => setList(data?.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const showModalAdd = () => {
    setOpenAdd(true);
  };

  const handleOkAdd = () => {
    form.validateFields()
      .then(values => {
        setConfirmLoadingAdd(true);
        const { name, text, image } = values;
        const accessToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";

        const formData = new FormData();
        formData.append("text", text);
        formData.append("name", name);

        if (image && image[0] && image[0].originFileObj) {
          formData.append("images", image[0].originFileObj);
        } else {
          message.error("Please upload an image.");
          setConfirmLoadingAdd(false);
          return;
        }

        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/locations`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        })
          .then((res) => {
            if (!res.ok) {
              return res.text().then((text) => {
                throw new Error(`HTTP error! status: ${res.status}, message: ${text}`);
              });
            }
            return res.json();
          })
          .then((resp) => {
            if (resp.success) {
              fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/locations`)
                .then((res) => res.json())
                .then((data) => setList(data?.data))
                .catch((error) => console.error("Error fetching data:", error));
              setOpenAdd(false);
              message.success("Brend muvaffaqiyatli qo'shildi");
            } else {
              message.error("Xatolik yuz berdi");
            }
          })
          .catch((error) => {
            console.error("Ma'lumotni yuborishda xatolik:", error);
            message.error("Server bilan bog'lanishda xatolik: " + error.message);
          })
          .finally(() => {
            setConfirmLoadingAdd(false);
          });
      })
      .catch(info => {
        console.log("Validation Failed:", info);
      });
  };

  const handleCancelAdd = () => {
    setOpenAdd(false);
  };

  const showModalEdit = (item) => {
    setCurrentItem(item);
    form.setFieldsValue({
      name: item.name,
      text: item.text,
    });
    setOpenEdit(true);
  };

  const handleOkEdit = () => {
    form.validateFields()
      .then(values => {
        setConfirmLoadingEdit(true);
        const { name, text, image } = values;
        const accessToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";

        const formData = new FormData();
        formData.append("text", text);
        formData.append("name", name);

        if (image && image[0] && image[0].originFileObj) {
          formData.append("images", image[0].originFileObj);
        }

        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/locations/${currentItem.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        })
          .then((res) => {
            if (!res.ok) {
              return res.text().then((text) => {
                throw new Error(`HTTP error! status: ${res.status}, message: ${text}`);
              });
            }
            return res.json();
          })
          .then((resp) => {
            if (resp.success) {
              fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/locations`)
                .then((res) => res.json())
                .then((data) => setList(data?.data))
                .catch((error) => console.error("Error fetching data:", error));
              setOpenEdit(false);
              message.success("Brend muvaffaqiyatli tahrirlandi");
            } else {
              message.error("Xatolik yuz berdi");
            }
          })
          .catch((error) => {
            console.error("Ma'lumotni yangilashda xatolik:", error);
            message.error("Server bilan bog'lanishda xatolik: " + error.message);
          })
          .finally(() => {
            setConfirmLoadingEdit(false);
          });
      })
      .catch(info => {
        console.log("Validation Failed:", info);
      });
  };

  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  const showConfirmDelete = (item) => {
    setItemToDelete(item);
    setOpenConfirmDelete(true);
  };

  const handleOkDelete = () => {
    if (itemToDelete) {
      const accessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";

      fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/locations/${itemToDelete.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.text().then((text) => {
              throw new Error(`HTTP error! status: ${res.status}, message: ${text}`);
            });
          }
          return res.json();
        })
        .then((resp) => {
          if (resp.success) {
            fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/locations`)
              .then((res) => res.json())
              .then((data) => setList(data?.data))
              .catch((error) => console.error("Error fetching data:", error));
            message.success("Brend muvaffaqiyatli o'chirildi");
          } else {
            message.error("Xatolik yuz berdi");
          }
          setOpenConfirmDelete(false);
          setItemToDelete(null);
        })
        .catch((error) => {
          console.error("Ma'lumotni o'chirishda xatolik:", error);
          message.error("Server bilan bog'lanishda xatolik: " + error.message);
          setOpenConfirmDelete(false);
          setItemToDelete(null);
        });
    } else {
      setOpenConfirmDelete(false);
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirmDelete(false);
    setItemToDelete(null);
  };

  return (
    <div>
     
            <Button type="primary" onClick={showModalAdd}>
              Add
            </Button>
            <Modal
              title="Add Location"
              open={openAdd}
              onOk={handleOkAdd}
              confirmLoading={confirmLoadingAdd}
              onCancel={handleCancelAdd}
            >
              <Form
                form={form}
                layout="vertical"
                initialValues={{ name: "", text: "", image: null }}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input the name!" },
                  ]}
                >
                  <Input type="text" placeholder="name" />
                </Form.Item>
                <Form.Item
                  label="Text"
                  name="text"
                  rules={[
                    { required: true, message: "Please input the text!" },
                  ]}
                >
                  <Input type="text" placeholder="text" />
                </Form.Item>
                <Form.Item
                  label="Image"
                  name="image"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e && e.fileList}
                  rules={[
                    { required: true, message: "Please upload an image!" },
                  ]}
                >
                  <Upload
                    name="image"
                    listType="picture"
                    maxCount={1}
                    beforeUpload={() => false} // Prevent automatic upload
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </Form>
            </Modal>
            <Modal
              title="Edit Location"
              open={openEdit}
              onOk={handleOkEdit}
              confirmLoading={confirmLoadingEdit}
              onCancel={handleCancelEdit}
            >
              <Form
                form={form}
                layout="vertical"
                initialValues={{ name: "", text: "", image: null }}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input the name!" },
                  ]}
                >
                  <Input type="text" placeholder="name" />
                </Form.Item>
                <Form.Item
                  label="Text"
                  name="text"
                  rules={[
                    { required: true, message: "Please input the text!" },
                  ]}
                >
                  <Input type="text" placeholder="text" />
                </Form.Item>
                <Form.Item
                  label="Image"
                  name="image"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e && e.fileList}
                >
                  <Upload
                    name="image"
                    listType="picture"
                    maxCount={1}
                    beforeUpload={() => false} // Prevent automatic upload
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </Form>
            </Modal>
            <Modal
              title="Kategoriyani uchirish"
              open={openConfirmDelete}
              onOk={handleOkDelete}
              onCancel={handleCancelDelete}
              okText="Delete"
              cancelText="Cancel"
            >
              <p>Kategoriyani nuchirishni xohlayszmi?</p>
            </Modal>
            <table id="customers">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Name</th>
                  <th>Text</th>
                  <th>Rasmi</th>
                  <th>Uzgartirishlar</th>
                </tr>
              </thead>
              <tbody>
                {list && list.length > 0 ? (
                  list.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.text}</td>
                      <td>
                        <img
                          src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`}
                          width="100px"
                          alt={item.name}
                        />
                      </td>
                      <td>
                        <Button
                          className="edit-btn"
                          type="primary"
                          style={{margin:10}}
                          onClick={() => showModalEdit(item)}
                        >
                          Tahrirlash
                        </Button>
                        <Button
                          className="delete-btn"
                          type="primary"
                          danger
                          onClick={() => showConfirmDelete(item)}
                        >
                          Uchirish
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Nimadir Xato</td>
                  </tr>
                )}
              </tbody>
            </table>
    </div>
  );
}

export default Location;
