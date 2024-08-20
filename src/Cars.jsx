import "./Cars.css";
import React, { useEffect, useState } from "react";
import { IoCarSport } from "react-icons/io5";
import { FaCity } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineChromeReaderMode } from "react-icons/md";
import { SiBrenntag } from "react-icons/si";
import { Modal, Select, Button, message, Input, Layout, Menu, theme, Table } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

function Cars() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();
  const { Header, Sider, Content } = Layout;
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
  const [formValues, setFormValues] = useState({
    year: '',
    color: '',
    seconds: '',
    images: [],
    image: null,
    maxSpeed: '',
    motor: '',
    mechanics: '',
    driveSide: '',
    cylinderType: '',
    limitPreday: '',
    deposit: '',
    premiumProtectionPrice: '',
    priceInAED: '',
    priceInAEDOtd: '',
    priceInUSD: '',
    priceInUSDOtd: '',
    motors: '',
    rasm: null,
    transmission: '', // Qo'shilgan
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

  const handleMenuClick = (e) => {
    const paths = {
      1: "/city",
      2: "/cars",
      3: "/brend",
      4: "/categories",
      5: "/location",
      6: "/model",
    };
    navigate(paths[e.key]);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOkadd = async () => {
    const formData = new FormData();

    // Add data to FormData object
    formData.append('brand_id', selectedBrandId);
    formData.append('model_id', selectedModelId);
    formData.append('city_id', selectedCityId);
    formData.append('location_id', selectedLocationId);
    formData.append('category_id', selectedCategoryId);
    formData.append('year', parseInt(formValues.year, 10) || ''); // Ensure it's an integer
    formData.append('color', formValues.color);
    formData.append('seconds', parseFloat(formValues.seconds) || ''); // Ensure it's a number
    formData.append('max_speed', parseFloat(formValues.maxSpeed) || ''); // Ensure it's a number
    formData.append('max_people', parseFloat(formValues.motor) || ''); // Ensure it's a number
    formData.append('petrol', formValues.mechanics);
    formData.append('drive_side', formValues.driveSide);
    formData.append('transmission', formValues.transmission);
    formData.append('motor', formValues.cylinderType);
    formData.append('limitperday', parseFloat(formValues.limitPreday) || ''); // Ensure it's a number
    formData.append('deposit', parseFloat(formValues.deposit) || ''); // Ensure it's a number
    formData.append('premium_protection', parseFloat(formValues.premiumProtectionPrice) || ''); // Ensure it's a number
    formData.append('price_in_aed', parseFloat(formValues.priceInAED) || ''); // Ensure it's a number
    formData.append('price_in_aed_sale', parseFloat(formValues.priceInAEDOtd) || ''); // Ensure it's a number
    formData.append('price_in_usd', parseFloat(formValues.priceInUSD) || ''); // Ensure it's a number
    formData.append('price_in_usd_sale', parseFloat(formValues.priceInUSDOtd) || ''); // Ensure it's a number

    if (formValues.image) {
      formData.append('images', formValues.image);
    }

    if (formValues.rasm) {
      formData.append('images', formValues.rasm);
    }

    if (formValues.images.length > 0) {
      formValues.images.forEach((file) => {
        formData.append('cover', file);
      });
    }

    formData.append('inclusive', formValues.radio ? 'true' : 'false');

    try {
      const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";


      const response = await fetch('https://autoapi.dezinfeksiyatashkent.uz/api/cars', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        message.success('Data submitted successfully');
        setIsModalOpen(false);
      } else {
        const errorText = await response.text();
        message.error(`Server Error: ${errorText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      message.error(`An error occurred: ${error.message}`);
    }
  };

  const handleCanceladd = () => {
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
    setFormValues((prevValues) => ({ ...prevValues, images: Array.from(files) }));
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} alt="car" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    // Add other columns as needed
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['2']}
          onClick={handleMenuClick}
        >
          <Menu.Item key="1" icon={<FaCity />}>
            Cities
          </Menu.Item>
          <Menu.Item key="2" icon={<IoCarSport />}>
            Cars
          </Menu.Item>
          <Menu.Item key="3" icon={<SiBrenntag />}>
            Brands
          </Menu.Item>
          <Menu.Item key="4" icon={<MdOutlineChromeReaderMode />}>
            Categories
          </Menu.Item>
          <Menu.Item key="5" icon={<FaMapLocationDot />}>
            Locations
          </Menu.Item>
          <Menu.Item key="6" icon={<IoMdSettings />}>
            Models
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="trigger" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </Header>
        <Content style={{ margin: '16px' }}>
          <Button type="primary" onClick={showModal}>
            Add New Car
          </Button>
          <Table columns={columns} dataSource={list} rowKey="id" />
        </Content>
      </Layout>
      <Modal
        title="Add New Car"
        open={isModalOpen}
        onOk={handleOkadd}
        onCancel={handleCanceladd}
      >
        <div>
          <label>Brand</label>
          <Select
            onChange={(value) => setSelectedBrandId(value)}
            placeholder="Select Brand"
          >
            {brands.map((brand) => (
              <Option key={brand.id} value={brand.id}>
                {brand.name}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <label>Model</label>
          <Select
            onChange={(value) => setSelectedModelId(value)}
            placeholder="Select Model"
          >
            {models.map((model) => (
              <Option key={model.id} value={model.id}>
                {model.name}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <label>City</label>
          <Select
            onChange={(value) => setSelectedCityId(value)}
            placeholder="Select City"
          >
            {cities.map((city) => (
              <Option key={city.id} value={city.id}>
                {city.name}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <label>Location</label>
          <Select
            onChange={(value) => setSelectedLocationId(value)}
            placeholder="Select Location"
          >
            {locations.map((location) => (
              <Option key={location.id} value={location.id}>
                {location.name}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <label>Category</label>
          <Select
            onChange={(value) => setSelectedCategoryId(value)}
            placeholder="Select Category"
          >
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <label>Year</label>
          <Input
            name="year"
            value={formValues.year}
            onChange={handleInputChange}
            placeholder="Year"
          />
        </div>
        <div>
          <label>Color</label>
          <Input
            name="color"
            value={formValues.color}
            onChange={handleInputChange}
            placeholder="Color"
          />
        </div>
        <div>
          <label>Seconds</label>
          <Input
            name="seconds"
            value={formValues.seconds}
            onChange={handleInputChange}
            placeholder="Seconds"
          />
        </div>
        <div>
          <label>Max Speed</label>
          <Input
            name="maxSpeed"
            value={formValues.maxSpeed}
            onChange={handleInputChange}
            placeholder="Max Speed"
          />
        </div>
        <div>
          <label>Motor</label>
          <Input
            name="motor"
            value={formValues.motor}
            onChange={handleInputChange}
            placeholder="Motor"
          />
        </div>
        <div>
          <label>Mechanics</label>
          <Input
            name="mechanics"
            value={formValues.mechanics}
            onChange={handleInputChange}
            placeholder="Mechanics"
          />
        </div>
        <div>
          <label>Drive Side</label>
          <Input
            name="driveSide"
            value={formValues.driveSide}
            onChange={handleInputChange}
            placeholder="Drive Side"
          />
        </div>
        <div>
          <label>Transmission</label>
          <Input
            name="transmission"
            value={formValues.transmission}
            onChange={handleInputChange}
            placeholder="Transmission"
          />
        </div>
        <div>
          <label>Cylinder Type</label>
          <Input
            name="cylinderType"
            value={formValues.cylinderType}
            onChange={handleInputChange}
            placeholder="Cylinder Type"
          />
        </div>
        <div>
          <label>Limit Per Day</label>
          <Input
            name="limitPreday"
            value={formValues.limitPreday}
            onChange={handleInputChange}
            placeholder="Limit Per Day"
          />
        </div>
        <div>
          <label>Deposit</label>
          <Input
            name="deposit"
            value={formValues.deposit}
            onChange={handleInputChange}
            placeholder="Deposit"
          />
        </div>
        <div>
          <label>Premium Protection Price</label>
          <Input
            name="premiumProtectionPrice"
            value={formValues.premiumProtectionPrice}
            onChange={handleInputChange}
            placeholder="Premium Protection Price"
          />
        </div>
        <div>
          <label>Price in AED</label>
          <Input
            name="priceInAED"
            value={formValues.priceInAED}
            onChange={handleInputChange}
            placeholder="Price in AED"
          />
        </div>
        <div>
          <label>Price in AED Sale</label>
          <Input
            name="priceInAEDOtd"
            value={formValues.priceInAEDOtd}
            onChange={handleInputChange}
            placeholder="Price in AED Sale"
          />
        </div>
        <div>
          <label>Price in USD</label>
          <Input
            name="priceInUSD"
            value={formValues.priceInUSD}
            onChange={handleInputChange}
            placeholder="Price in USD"
          />
        </div>
        <div>
          <label>Price in USD Sale</label>
          <Input
            name="priceInUSDOtd"
            value={formValues.priceInUSDOtd}
            onChange={handleInputChange}
            placeholder="Price in USD Sale"
          />
        </div>
        <div>
          <label>Image</label>
          <Input
            type="file"
            name="image"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label>Additional Images</label>
          <Input
            type="file"
            multiple
            name="images"
            onChange={handleMultipleFileChange}
          />
        </div>
        <div>
          <label>Radio</label>
          <Input
            type="checkbox"
            name="radio"
            checked={formValues.radio}
            onChange={(e) => setFormValues((prevValues) => ({ ...prevValues, radio: e.target.checked }))}
          />
        </div>
      </Modal>
    </Layout>
  );
}

export default Cars;
