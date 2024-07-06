import './Location.css'
import React, { useEffect, useState } from 'react';
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
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
function Location() {
    const navigate = useNavigate();

  const buttonjon= (e) => {
    if (e.key === '1') {
      navigate('/city');
    } else if (e.key === '2') {
      navigate('/cars');
    } else if (e.key === '3') {
      navigate('/brend');
    } else if (e.key === '4') {
      navigate('/catigories');
    } else if (e.key === '5') {
      navigate('/location');
    } else if (e.key === '6') {
      navigate('/model');
    }
  };
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { Header, Sider, Content } = Layout;
    const logout=()=>{
        navigate('/')
      }
      const [list,setlist]=useState();
      useEffect(()=>{
        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/locations`)
        .then((res)=>res.json())
        .then((data)=>setlist(data?.data))
        .catch((error) => console.error("Error fetching data:", error));
      });
    return (
      <div>
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
        <h1 className='home-title'>Autozoom Admin</h1>
        <Menu
        className="laout-menu"
        onClick={buttonjon}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
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
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
            <Button type='primary' danger className='logout-btn' onClick={logout}>
              Log out
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
           <Button type='primary'>
              Add
            </Button>
         <table id='customers'>
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
              {list && list.length>0?(
                  list.map((item, index)=>(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.text}</td>
                        <td>{item.name}</td>
                        <td>
                            <img src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`} width='100px' />
                        </td>
                        <td>
                            <Button className='edit-btn' type='primary'>Tahrirlash</Button>
                            <Button className='delet-btn' type='primary' danger>Uchirish</Button>
                        </td>
                    </tr>
                  ))
              ):(
                <tr>
                    <td>Nimadir Xato</td>
                </tr>
              )}
            </tbody>
         </table>
        </Content>
      </Layout>
    </Layout>
      </div>
    )
  }
  
  export default Location