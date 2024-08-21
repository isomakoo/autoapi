import "./Brend.css";
import React, { useEffect, useState } from "react";
import { IoCarSport } from "react-icons/io5";
import { FaCity } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineChromeReaderMode } from "react-icons/md";
import { SiBrenntag } from "react-icons/si";
import { MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Layout, Menu, Modal, message, Form, Upload, Table, theme } from "antd";
import { useNavigate } from "react-router-dom";

const { Dragger } = Upload;

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
  const [title, setTitle] = useState("");
  const [img, setImg] = useState(null);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [form] = Form.useForm();


  const getList = async () => {
    try {
      const response = await fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands");
      const data = await response.json();
      setList(data?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const logout = () => navigate("/");

  const addbrend = async () => {
    try {
      const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";

      const formData = new FormData();
      formData.append("title", title);
      if (img) formData.append("images", img);

      const response = await fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands", {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      });

      const resp = await response.json();
      if (resp.success) {
        getList();
        handleCanceladd();
        message.success("Brend muvaffaqiyatli qo'shildi");
      } else {
        message.error("Xatolik yuz berdi");
      }
    } catch (error) {
      message.error("Server bilan bog'lanishda xatolik");
    }
  };

  const showModaladd = () => setOpen(true);

  const handleOkadd = () => {
    form
      .validateFields()
      .then(() => {
        setConfirmLoading(true);
        addbrend();
        setConfirmLoading(false);
        form.resetFields();
      })
      .catch((info) => console.log("Validate Failed:", info));
  };

  const handleCanceladd = () => setOpen(false);

  const showModalDelete = (id) => {
    setSelectedBrandId(id);
    setIsModalOpenDelete(true);
  };

  const handleBrandDelete = async () => {
    try {
      const accessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";

      const response = await fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/brands/${selectedBrandId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const resp = await response.json();
      if (resp.success) {
        getList();
        setIsModalOpenDelete(false)
        message.success('Brend muvaffaqiyatli o\'chirildi');
      } else {
        message.error('Xatolik yuz berdi');
      }
    } catch (error) {
      message.error('Server bilan bog\'lanishda xatolik');
    }
  };

  const handleCancelDelete = () => setIsModalOpenDelete(false);

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
        form.resetFields();
      })
      .catch((info) => console.log("Validate Failed:", info));
  };

  const handleCanceledit = () => setIsModalOpenedit(false);

  const editbrend = async () => {
    try {
      const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";

      const formData = new FormData();
      formData.append("title", titleedit);
      if (imgedit) formData.append("images", imgedit);

      const response = await fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/brands/${editid}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      });

      const resp = await response.json();
      if (resp.success) {
        getList();
        message.success("Brend muvaffaqiyatli tahrirlandi");
      } else {
        message.error("Brendni tahrirlashda xato");
      }
    } catch (error) {
      message.error("Brendni tahrirlashda xato");
    }
  };

  const columns = [
    {
      title: 'Brend Nomi',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Brend Rasmi',
      dataIndex: 'image_src',
      key: 'image_src',
      render: (image_src) => <img src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${image_src}`} alt="brand" style={{ width: 100, height: 100 }} />,
    },
    {
      title: 'Amallar',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            onClick={() => showModaledit(record.id)}
            style={{ marginRight: 8 }}
          >
            Tahrirlash
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => showModalDelete(record.id)}
          >
            O'chirish
          </Button>
        </span>
      ),
    },
  ];


  return (
                <>
        <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginLeft: 16 }}
            onClick={showModaladd}
          >
            Brend Qo'shish
          </Button>
          <Table
            columns={columns}
            dataSource={list}
            rowKey={(record) => record.id}
            pagination={{ pageSize: 10 }}
          />

      {/* Add Modal */}
      <Modal
        title="Brend Qo'shish"
        open={open}
        confirmLoading={confirmLoading}
        onOk={handleOkadd}
        onCancel={handleCanceladd}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="title"
            label="Brend Nomi"
            rules={[{ required: true, message: 'Brend nomini kiriting!' }]}
          >
            <Input onChange={(e) => setTitle(e.target.value)} />
          </Form.Item>
          <Form.Item
            name="image"
            label="Rasm"
          >
            <Dragger
              name="files"
              multiple={false}
              onChange={(e) => setImg(e.file.originFileObj)}
              showUploadList={false}
            >
              <p className="ant-upload-drag-icon">
                <PlusOutlined />
              </p>
              <p className="ant-upload-text">Rasm tanlang</p>
            </Dragger>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Brendni Tahrirlash"
        open={isModalOpenedit}
        onOk={handleOkedit}
        onCancel={handleCanceledit}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="title"
            label="Brend Nomi"
            rules={[{ required: true, message: 'Brend nomini kiriting!' }]}
          >
            <Input
              defaultValue={titleedit}
              onChange={(e) => setTitleedit(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="image"
            label="Rasm"
          >
            <Dragger
              name="files"
              multiple={false}
              onChange={(e) => setimgedit(e.file.originFileObj)}
              showUploadList={false}
            >
              <p className="ant-upload-drag-icon">
                <PlusOutlined />
              </p>
              <p className="ant-upload-text">Rasm tanlang</p>
            </Dragger>
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        title="O'chirish"
        open={isModalOpenDelete}
        onOk={handleBrandDelete}
        onCancel={handleCancelDelete}
      >
        <p>Brendni o'chirmoqchimisiz?</p>
      </Modal>
    </>
  );
}

export default Brend;
