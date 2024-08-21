import "./Model.css";
import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Select, message, theme } from "antd";
import { useNavigate } from "react-router-dom";

function Model() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modoch, setModoch] = useState(false);
  const [uch, setUch] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [pro, setPro] = useState([]);
  const [nameEn, setNameEn] = useState("");
  const [brandId, setBrandId] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [idjon, setIdjon] = useState(null);

  const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";


  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

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
      .then((data) => setPro(data?.data || []))
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

  const modAdd = () => setModoch(true);

  const handleCancel = () => {
    setModoch(false);
    setUch(false);
    setEditModal(false);
    setNameEn("");
    setBrandId(null);
    setCurrentId(null);
  };

  const addBtn = () => {
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
          setModoch(false);
          message.success("Model muvafaqiyatli qo'shildi");
        } else {
          message.error("Nimadir noto'g'ri ketdi");
        }
      })
      .catch((error) => {
        console.error("Ma'lumotni yuborishda xatolik:", error);
      });
  };

  const editBtn = () => {
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

  const deleteBtn = (item) => {
    setUch(true);
    setIdjon(item.id);
  };

  const confirmDelete = () => {
    deleteItem(idjon);
  };

  const deleteItem = (id) => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          setList((prevList) => prevList.filter((item) => item.id !== id));
          message.success("Muvafaqiyatli o'chirildi");
          setUch(false);
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
      <Button type="primary" onClick={modAdd}>Add</Button>
      <Modal open={modoch} onCancel={handleCancel} onOk={addBtn} title="Model qo'shish">
        <form>
          <Input
            type="text"
            required
            placeholder="Name (En)"
            value={nameEn}
            style={{ width: 200, margin: 10 }}
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
            {pro.length > 0 ? (
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
        onCancel={handleCancel}
        onOk={editBtn}
        title="Modelni Tahrirlash"
      >
        <form>
          <Input
            type="text"
            required
            placeholder="Name (En)"
            value={nameEn}
            style={{ width: 200, margin: 10 }}
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
            {pro.length > 0 ? (
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
        open={uch}
        onCancel={handleCancel}
        onOk={confirmDelete}
        title="Modelni O'chirish"
      >
        <p>Modelni o'chirishni xohlaysizmi?</p>
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
                <th>Brand</th>
                <th>Name</th>
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
                      style={{ margin: 10 }}
                      onClick={() => openEditModal(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="delete-btn"
                      type="primary"
                      danger
                      onClick={() => deleteBtn(item)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Model;
