import "./Cars.css";
import React, { useEffect, useState } from "react";
import { IoCarSport } from "react-icons/io5";
import { FaCity } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineChromeReaderMode } from "react-icons/md";
import { SiBrenntag } from "react-icons/si";
import { Modal, Select, Button, message } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import Input from "antd/es/input/Input";

const { Option } = Select;

function Cars() {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    const paths = {
      1: "/city",
      2: "/cars",
      3: "/brend",
      4: "/catigories",
      5: "/location",
      6: "/model",
    };
    navigate(paths[e.key]);
  };

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Header, Sider, Content } = Layout;
  const [list, setList] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cars")
      .then((res) => res.json())
      .then((data) => setList(data?.data || []))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
// Get brands
  useEffect(() => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data?.data || []))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
//Get models
  useEffect(() => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models")
      .then((res) => res.json())
      .then((data) => setModels(data?.data || []))
      .catch((error) => {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch models");
      });
  }, []);
//Get cities
  useEffect(() => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cities")
      .then((res) => res.json())
      .then((data) => setCities(data?.data || []))
      .catch((error) => {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch cities");
      });
  }, []);
//get categories
  useEffect(() => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data?.data || []))
      .catch((error) => {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch categories");
      });
  }, []);
//get locations
const [locations, setLocations] = useState([]);
const [selectedLocationId, setSelectedLocationId] = useState(null);

useEffect(() => {
  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/locations")
    .then((res) => res.json())
    .then((data) => setLocations(data?.data || []))
    .catch((error) => {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch locations");
    });
}, []);

const handleLocationChange = (value) => {
  setSelectedLocationId(value);
  console.log("Selected Location ID:", value);
};

  const handleBrandChange = (value) => {
    setSelectedBrandId(value);
    console.log("Selected Brand ID:", value);
  };

  const handleModelChange = (value) => {
    setSelectedModelId(value);
    console.log("Selected Model ID:", value);
  };

  const handleCityChange = (value) => {
    setSelectedCityId(value);
    console.log("Selected City ID:", value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategoryId(value);
    console.log("Selected Category ID:", value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const logout = () => {
    navigate("/l");
  };
  //Post qilish
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
    radio: false,
  });

  const handleOkadd = async () => {
    const formData = new FormData();

    // Ma'lumotlarni FormData obyektiga qo'shamiz
    formData.append('brand_id', selectedBrandId); // Misol: 0d412be6-4bbc-48b5-8b51-e52bcae8640c
    formData.append('model_id', selectedModelId); // Misol: 0d412be6-4bbc-48b5-8b51-e52bcae8640c
    formData.append('city_id', selectedCityId); // Misol: 0d412be6-4bbc-48b5-8b51-e52bcae8640c
    formData.append('location_id', selectedLocationId); // Misol: 0d412be6-4bbc-48b5-8b51-e52bcae8640c
    formData.append('category_id', selectedCategoryId); // Misol: 0d412be6-4bbc-48b5-8b51-e52bcae8640c
    
    formData.append('year', formValues.year); // Misol: kldsvudbisnoisdn
    formData.append('color', formValues.color); // Misol: kldsvudbisnoisdn
    formData.append('seconds', formValues.seconds); // Misol: 4
    formData.append('max_speed', formValues.maxSpeed); // Misol: 120
    formData.append('max_people', formValues.motor); // Misol: 4
    formData.append('petrol', formValues.mechanics); // Misol: petrol
    formData.append('drive_side', formValues.driveSide); // Misol: right
    formData.append('motor', formValues.cylinderType); // Misol: 6
    formData.append('transmission', formValues.motors); // Misol: automatic
    formData.append('limitperday', formValues.limitPreday); // Misol: 50
    formData.append('deposit', formValues.deposit); // Misol: 500
    formData.append('premium_protection', formValues.premiumProtectionPrice); // Misol: 100
    formData.append('price_in_aed', formValues.priceInAED); // Misol: 2000
    formData.append('price_in_usd', formValues.priceInAEDOtd); // Misol: 540
    formData.append('price_in_aed_sale', formValues.priceInUSD); // Misol: 1800
    formData.append('price_in_usd_sale', formValues.priceInUSDOtd); // Misol: 500
    
    if (formValues.image) {
      formData.append('images', formValues.image); // cover image
    }
    
    if (formValues.rasm) {
      formData.append('images', formValues.rasm); // additional image
    }
    
    if (formValues.images.length > 0) {
      formValues.images.forEach((file, index) => {
        formData.append('cover', file); // cover images
      });
    }
    
    formData.append('inclusive', formValues.radio ? 'true' : 'false'); // Misol: 'true' yoki 'false'    

    try {
      // Debugging: Print formData entries to the console
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
  const accessToken=  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";

      const response = await fetch('https://autoapi.dezinfeksiyatashkent.uz/api/cars', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Make sure accessToken is defined and valid
        },
      });

      if (response.ok) {
        // Handle success
        message.success('Data submitted successfully');
        setIsModalOpen(false);
      } else {
        // Handle HTTP errors
        const errorText = await response.text(); // Get the error response body
        message.error(`Server Error: ${errorText}`);
      }
    } catch (error) {
      // Handle network or other errors
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
            defaultSelectedKeys={["3"]}
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
                icon: (
                  <IoMdSettings />
                ),
                label: "Settings",
              },
              {
                key: "5",
                icon: (
                  <FaMapLocationDot />
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
                Log out
              </Button>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
            }}
          >
            <Button type="primary" onClick={showModal}>
              Add
            </Button>
            <table id="customers">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Name</th>
                  <th>Year</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.brand.title}</td>
                    <td>{item.year}</td>
                    <td>
                      <img
                       src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`}
                        alt={item.brand.title}
                        width="100"
                      />
                    </td>
                    <td>
                      <Button className="edit-btn" type="primary" style={{margin: 10}}>
                        Edit
                      </Button>
                      <Button className="delete-btn" type="primary" danger>
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
      title="Basic Modal"
      open={isModalOpen}
      onOk={handleOkadd}
      onCancel={handleCanceladd}
    >
      <form>
        <Select
          placeholder="Select a brand"
          style={{ width: 200, margin: 10 }}
          onChange={(value) => setFormValues((prevValues) => ({ ...prevValues, brandId: value }))}
          value={formValues.brandId}
          required={brands.length > 0}
        >
          {brands.length > 0 ? (
            brands.map((brand) => (
              <Option key={brand._id} value={brand._id}>
                {brand.title}
              </Option>
            ))
          ) : (
            <Option disabled>No brands available</Option>
          )}
        </Select>
        <Select
          placeholder="Select a model"
          style={{ width: 200, margin: 10 }}
          onChange={(value) => setFormValues((prevValues) => ({ ...prevValues, modelId: value }))}
          value={formValues.modelId}
          required={models.length > 0}
        >
          {models.length > 0 ? (
            models.map((model) => (
              <Option key={model._id} value={model._id}>
                {model.name}
              </Option>
            ))
          ) : (
            <Option disabled>No models available</Option>
          )}
        </Select>
        <Select
          placeholder="Select a city"
          style={{ width: 200, margin: 10 }}
          onChange={(value) => setFormValues((prevValues) => ({ ...prevValues, cityId: value }))}
          value={formValues.cityId}
          required={cities.length > 0}
        >
          {cities.length > 0 ? (
            cities.map((city) => (
              <Option key={city._id} value={city._id}>
                {city.name}
              </Option>
            ))
          ) : (
            <Option disabled>No cities available</Option>
          )}
        </Select>
        <Select
          placeholder="Select a location"
          style={{ width: 200, margin: 20 }}
          onChange={(value) => setFormValues((prevValues) => ({ ...prevValues, locationId: value }))}
          value={formValues.locationId}
          required={locations.length > 0}
        >
          {locations.length > 0 ? (
            locations.map((location) => (
              <Option key={location._id} value={location._id}>
                {location.text}
              </Option>
            ))
          ) : (
            <Option disabled>No locations available</Option>
          )}
        </Select>
        <Input
          style={{ width: 200, margin: 10 }}
          type="text"
          name="year"
          required
          placeholder="Year"
          value={formValues.year}
          onChange={handleInputChange}
        />
        <Input
          style={{ width: 200, margin: 10 }}
          type="text"
          name="color"
          required
          placeholder="Color"
          value={formValues.color}
          onChange={handleInputChange}
        />
        <Input
          style={{ width: 200, margin: 10 }}
          type="number"
          name="seconds"
          placeholder="Seconds"
          required
          value={formValues.seconds}
          onChange={handleInputChange}
        />
        <Select
          placeholder="Select a category"
          style={{ width: 200, margin: 10 }}
          onChange={(value) => setFormValues((prevValues) => ({ ...prevValues, categoryId: value }))}
          value={formValues.categoryId}
          required={categories.length > 0}
        >
          {categories.length > 0 ? (
            categories.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.name_ru}
              </Option>
            ))
          ) : (
            <Option disabled>No categories available</Option>
          )}
        </Select>
        <Input
          style={{ width: 200, margin: 10 }}
          type="file"
          name="images"
          placeholder="Images"
          multiple
          onChange={handleMultipleFileChange}
          accept="image/*"
          required
        />
        <Input
          style={{ width: 200, margin: 10 }}
          type="file"
          name="image"
          placeholder="Image"
          onChange={handleFileChange}
          accept="image/*"
          required
        />
        <Input
          type="number"
          name="maxSpeed"
          placeholder="Max Speed"
          style={{ width: 200, margin: 10 }}
          value={formValues.maxSpeed}
          onChange={handleInputChange}
          required
        />
        <Select
          style={{ width: 200, margin: 10 }}
          name="motor"
          value={formValues.motor}
          onChange={(value) => setFormValues((prevValues) => ({ ...prevValues, motor: value }))}
          required
        >
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
          <Option value="5">5</Option>
          <Option value="6">6</Option>
          <Option value="7">7</Option>
          <Option value="auto">auto</Option>
        </Select>
        <Input
          type="number"
          name="motors"
          placeholder="Motors"
          style={{ width: 200, margin: 10 }}
          value={formValues.motors}
          onChange={handleInputChange}
          required
        />
        <Select
          style={{ width: 200, margin: 10 }}
          name="mechanics"
          value={formValues.mechanics}
          onChange={(value) => setFormValues((prevValues) => ({ ...prevValues, mechanics: value }))}
          required
        >
          <Option value="mechabics">mechabics</Option>
          <Option value="Automatic Box">Automatic Box</Option>
          <Option value="Mechanics and Automatic">Mechanics and Automatic</Option>
          <Option value="Electric">Electric</Option>
          <Option value="default">default</Option>
        </Select>
        <Input
          type="number"
          name="driveSide"
          placeholder="Drive Side"
          style={{ width: 200, margin: 10 }}
          value={formValues.driveSide}
          onChange={handleInputChange}
          required
        />
        <Select
          style={{ width: 200, margin: 10 }}
          name="cylinderType"
          value={formValues.cylinderType}
          onChange={(value) => setFormValues((prevValues) => ({ ...prevValues, cylinderType: value }))}
          required
        >
          <Option value="Gas cylinder">Gas cylinder</Option>
          <Option value="Gasoline tank">Gasoline tank</Option>
          <Option value="Methanic cylinder">Methanic cylinder</Option>
          <Option value="Electronic battery">Electronic battery</Option>
          <Option value="default">default</Option>
        </Select>
        <Input
          type="number"
          name="limitPreday"
          placeholder="Limit per day"
          style={{ width: 200, margin: 10 }}
          value={formValues.limitPreday}
          onChange={handleInputChange}
          required
        />
        <Input
          type="number"
          name="deposit"
          placeholder="Deposit"
          style={{ width: 200, margin: 10 }}
          value={formValues.deposit}
          onChange={handleInputChange}
          required
        />
        <Input
          type="text"
          name="premiumProtectionPrice"
          placeholder="Premium Protection Price"
          style={{ width: 200, margin: 10 }}
          value={formValues.premiumProtectionPrice}
          onChange={handleInputChange}
          required
        />
        <Input
          type="text"
          name="priceInAED"
          placeholder="Price in AED"
          style={{ width: 200, margin: 10 }}
          value={formValues.priceInAED}
          onChange={handleInputChange}
          required
        />
        <Input
          type="text"
          name="priceInAEDOtd"
          placeholder="Price in AED (Otd)"
          style={{ width: 200, margin: 10 }}
          value={formValues.priceInAEDOtd}
          onChange={handleInputChange}
          required
        />
        <Input
          type="text"
          name="priceInUSD"
          placeholder="Price in USD"
          style={{ width: 200, margin: 10 }}
          value={formValues.priceInUSD}
          onChange={handleInputChange}
          required
        />
        <Input
          type="text"
          name="priceInUSDOtd"
          placeholder="Price in USD (Otd)"
          style={{ width: 200, margin: 10 }}
          value={formValues.priceInUSDOtd}
          onChange={handleInputChange}
          required
        />
        <Input
          type="file"
          name="rasm"
          placeholder="Rasm"
          style={{ width: 200, margin: 10 }}
          onChange={handleFileChange}
          accept="image/*"
          required
        />
        <Input
          type="radio"
          name="radio"
          required
          style={{ width: 200, margin: 10 }}
          checked={formValues.radio}
          onChange={(e) => setFormValues((prevValues) => ({ ...prevValues, radio: e.target.checked }))}
        />
      </form>
    </Modal>
    </div>
  );
}

export default Cars;
