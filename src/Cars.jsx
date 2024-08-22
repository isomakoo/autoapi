import "./Cars.css";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Select,
  Button,
  message,
  Input,
  Layout,
  Table,
  Checkbox,
} from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { Header, Sider, Content } = Layout;

function Cars() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [list, setList] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formValues, setFormValues] = useState({
    year: "",
    color: "",
    seconds: "",
    images: [],
    image: null,
    maxSpeed: "",
    motor: "",
    mechanics: "",
    driveSide: "",
    cylinderType: "",
    limitPreday: "",
    deposit: "",
    premiumProtectionPrice: "",
    priceInAED: "",
    priceInAEDOtd: "",
    priceInUSD: "",
    priceInUSDOtd: "",
    motors: "",
    rasm: null,
    transmission: "",
    radio: false,
  });

  useEffect(() => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cars")
      .then((res) => res.json())
      .then((data) => setList(data?.data || []))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data?.data || []))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models")
      .then((res) => res.json())
      .then((data) => setModels(data?.data || []))
      .catch((error) => {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch models");
      });
  }, []);

  useEffect(() => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cities")
      .then((res) => res.json())
      .then((data) => setCities(data?.data || []))
      .catch((error) => {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch cities");
      });
  }, []);

  useEffect(() => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data?.data || []))
      .catch((error) => {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch categories");
      });
  }, []);

  useEffect(() => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data?.data || []))
      .catch((error) => {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch locations");
      });
  }, []);

  const showModal = (car = null) => {
    setIsEditMode(!!car);
    setEditingCar(car);
    setFormValues(
      car
        ? {
            ...car,
            image: null,
            images: [],
            rasm: null,
          }
        : {
            year: "",
            color: "",
            seconds: "",
            images: [],
            image: null,
            maxSpeed: "",
            motor: "",
            mechanics: "",
            driveSide: "",
            cylinderType: "",
            limitPreday: "",
            deposit: "",
            premiumProtectionPrice: "",
            priceInAED: "",
            priceInAEDOtd: "",
            priceInUSD: "",
            priceInUSDOtd: "",
            motors: "",
            rasm: null,
            transmission: "",
            radio: false,
          }
    );
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const formData = new FormData();
    formData.append("brand_id", selectedBrandId || "");
    formData.append("model_id", selectedModelId || "");
    formData.append("city_id", selectedCityId || "");
    formData.append("location_id", selectedLocationId || ""); // Ensure this is a valid UUID
    formData.append("category_id", selectedCategoryId || "");
    formData.append("year", parseInt(formValues.year, 10) || "");
    formData.append("color", formValues.color || "");
    formData.append("seconds", parseFloat(formValues.seconds) || "");
    formData.append("max_speed", parseFloat(formValues.maxSpeed) || "");
    formData.append("max_people", parseFloat(formValues.motor) || "");
    formData.append("petrol", formValues.mechanics || "");
    formData.append("drive_side", formValues.driveSide || "");
    formData.append("transmission", formValues.transmission || ""); // Ensure this is not empty
    formData.append("motor", formValues.cylinderType || "");
    formData.append("limitperday", parseFloat(formValues.limitPreday) || "");
    formData.append("deposit", parseFloat(formValues.deposit) || "");
    formData.append(
      "premium_protection",
      parseFloat(formValues.premiumProtectionPrice) || ""
    );
    formData.append("price_in_aed", parseFloat(formValues.priceInAED) || "");
    formData.append(
      "price_in_aed_sale",
      parseFloat(formValues.priceInAEDOtd) || ""
    );
    formData.append("price_in_usd", parseFloat(formValues.priceInUSD) || "");
    formData.append(
      "price_in_usd_sale",
      parseFloat(formValues.priceInUSDOtd) || ""
    );

    if (formValues.image) {
      formData.append("images", formValues.image);
    }

    if (formValues.rasm) {
      formData.append("images", formValues.rasm);
    }

    if (formValues.images.length > 0) {
      formValues.images.forEach((file) => {
        formData.append("cover", file);
      });
    }

    formData.append("inclusive", formValues.radio ? "true" : "false");

    try {
      const accessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";

      const url = isEditMode
        ? `https://autoapi.dezinfeksiyatashkent.uz/api/cars/${editingCar.id}`
        : "https://autoapi.dezinfeksiyatashkent.uz/api/cars";
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        message.success(
          isEditMode ? "Car updated successfully" : "Car added successfully"
        );
        setIsModalOpen(false);
        // Refresh the car list after successful operation
        const response = await fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cars");
        const data = await response.json();
        setList(data?.data || []);
      } else {
        const errorText = await response.text();
        message.error(`Server Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(`An error occurred: ${error.message}`);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: files[0] }));
  };

  const handleMultipleFileChange = (e) => {
    const { files } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      images: Array.from(files),
    }));
  };

  const handleDelete = (car) => {
    Modal.confirm({
      title: "Are you sure you want to delete this car?",
      content: `Car ID: ${car.id}`,
      okText: "Delete",
      okType: "danger",
      onOk: async () => {
        try {
          const accessToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";
    
          const response = await fetch(
            `https://autoapi.dezinfeksiyatashkent.uz/api/cars/${car.id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (response.ok) {
            message.success("Car deleted successfully");
            setList((prevList) =>
              prevList.filter((item) => item.id !== car.id)
            );
          } else {
            const errorText = await response.text();
            message.error(`Server Error: ${errorText}`);
          }
        } catch (error) {
          console.error("Error:", error);
          message.error(`An error occurred: ${error.message}`);
        }
      },
    });
  };

  const columns = [
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (text) => text.title, // brand.titles ni chiqaradi
    },  
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      render: (text) => text.name,
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => text.name_en,
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button onClick={() => showModal(record) } type="primary" style={{margin: 10}}>Edit</Button>
          <Button onClick={() => handleDelete(record)} type="primary" danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
           <Button type="primary" onClick={() => showModal()}>
          Add New Car
        </Button>
          <Table columns={columns} dataSource={list} rowKey="id" />
          <Modal
          className="custom-modal"
            title={isEditMode ? "Edit Car" : "Add New Car"}
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={isEditMode ? "Update" : "Add"}
          >
            <Input
            style={{width:200, margin: 10}}
              name="year"
              value={formValues.year}
              onChange={handleInputChange}
              placeholder="Year"
            />
            <Input
              style={{width:200, margin: 10}}
              name="color"
              value={formValues.color}
              onChange={handleInputChange}
              placeholder="Color"
            />
            <Input
             style={{width:200, margin: 10}}
              name="seconds"
              value={formValues.seconds}
              onChange={handleInputChange}
              placeholder="Seconds"
            />
            <Input
             style={{width:200, margin: 10}}
              name="maxSpeed"
              value={formValues.maxSpeed}
              onChange={handleInputChange}
              placeholder="Max Speed"
            />
            <Input
             style={{width:200, margin: 10}}
              name="motor"
              value={formValues.motor}
              onChange={handleInputChange}
              placeholder="Motor"
            />
            <Input
             style={{width:200, margin: 10}}
              name="transmission"
              value={formValues.transmission}
              onChange={handleInputChange}
              placeholder="Transmission"
            />

            <Input
             style={{width:200, margin: 10}}
              name="mechanics"
              value={formValues.mechanics}
              onChange={handleInputChange}
              placeholder="Mechanics"
            />
            <Input
             style={{width:200, margin: 10}}
              name="driveSide"
              value={formValues.driveSide}
              onChange={handleInputChange}
              placeholder="Drive Side"
            />
            <Input
             style={{width:200, margin: 10}}
              name="cylinderType"
              value={formValues.cylinderType}
              onChange={handleInputChange}
              placeholder="Cylinder Type"
            />
            <Input
             style={{width:200, margin: 10}}
              name="limitPreday"
              value={formValues.limitPreday}
              onChange={handleInputChange}
              placeholder="Limit per Day"
            />
            <Input
             style={{width:200, margin: 10}}
              name="deposit"
              value={formValues.deposit}
              onChange={handleInputChange}
              placeholder="Deposit"
            />
            <Input
             style={{width:200, margin: 10}}
              name="premiumProtectionPrice"
              value={formValues.premiumProtectionPrice}
              onChange={handleInputChange}
              placeholder="Premium Protection Price"
            />
            <Input
             style={{width:200, margin: 10}}
              name="priceInAED"
              value={formValues.priceInAED}
              onChange={handleInputChange}
              placeholder="Price in AED"
            />
            <Input
             style={{width:200, margin: 10}}
              name="priceInAEDOtd"
              value={formValues.priceInAEDOtd}
              onChange={handleInputChange}
              placeholder="Price in AED (Sale)"
            />
            <Input
             style={{width:200, margin: 10}}
              name="priceInUSD"
              value={formValues.priceInUSD}
              onChange={handleInputChange}
              placeholder="Price in USD"
            />
            <Input
             style={{width:200, margin: 10}}
              name="priceInUSDOtd"
              value={formValues.priceInUSDOtd}
              onChange={handleInputChange}
              placeholder="Price in USD (Sale)"
            />
            <Input
             style={{width:200, margin: 10}}
              name="motors"
              value={formValues.motors}
              onChange={handleInputChange}
              placeholder="Motors"
            />
            <Input type="file" name="image" onChange={handleFileChange}  style={{width:200, margin: 10}}/>
            <Input type="file" name="rasm" onChange={handleFileChange}  style={{width:200, margin: 10}} />
            <Input
             style={{width:200, margin: 10}}
              type="file"
              name="images"
              multiple
              onChange={handleMultipleFileChange}
            />
            <Select
             style={{width:200, margin: 10}}
              value={selectedBrandId}
              onChange={(value) => setSelectedBrandId(value)}
              placeholder="Select Brand"
            >
              {brands.map((brand) => (
                <Option key={brand.id} value={brand.id}>
                  {brand.title}
                </Option>
              ))}
            </Select>
            <Select
             style={{width:200, margin: 10}}
              value={selectedModelId}
              onChange={(value) => setSelectedModelId(value)}
              placeholder="Select Model"
            >
              {models.map((model) => (
                <Option key={model.id} value={model.id}>
                  {model.name}
                </Option>
              ))}
            </Select>
            <Select
             style={{width:200, margin: 10}}
              value={selectedCityId}
              onChange={(value) => setSelectedCityId(value)}
              placeholder="Select City"
            >
              {cities.map((city) => (
                <Option key={city.id} value={city.id}>
                  {city.name}
                </Option>
              ))}
            </Select>
            <Select
             style={{width:200, margin: 10}}
              value={selectedCategoryId}
              onChange={(value) => setSelectedCategoryId(value)}
              placeholder="Select Category"
            >
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name_en}
                </Option>
              ))}
            </Select>
            <Select
             style={{width:200, margin: 10}}
              value={selectedLocationId}
              onChange={(value) => setSelectedLocationId(value)}
              placeholder="Select Location"
            >
              {locations.map((location) => (
                <Option key={location.id} value={location.id}>
                  {location.name}
                </Option>
              ))}
            </Select>
            <Select
             style={{width:200, margin: 10}}
              value={selectedLocationId}
              onChange={(value) => setSelectedLocationId(value)}
              placeholder="Select Location"
            >
              {locations.map((location) => (
                <Option key={location.id} value={location.id}>
                  {location.name}
                </Option>
              ))}
            </Select>

            <Checkbox
             style={{width:200, margin: 10}}
              checked={formValues.radio}
              onChange={(e) =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  radio: e.target.checked,
                }))
              }
            >
              Include
            </Checkbox>
          </Modal>
        </Content>
  );
}

export default Cars;
