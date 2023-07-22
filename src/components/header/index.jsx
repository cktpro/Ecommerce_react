import React, { useState } from "react";
import {
  BarsOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import "./header.css";
import { Link } from "react-router-dom";
import { Badge, Avatar, Menu, Input, Space,Layout } from "antd";
const {Header}=Layout
const { Search } = Input;
const onSearch = (value) =>
  console.log("<<<<<< Search Value >>>>>>", "\n", value);
const items=[
  {
    key: "home",
    label: "Home",
    icon: <HomeOutlined  size="lager"/>,
  },
  {
    key: "products",
    label: "Products",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "smartphone",
        label: "Smart Phone",
      },
      {
        key: "tablet",
        label: "Tablet",
      },
      {
        key: "laptop",
        label: "Laptop",
      },
    ],
  },
  {
    key: "services",
    label: "Services",
  },
  {
    key: "contract",
    label: "Contract",
  },
]
const Headers = () => {
  const [isInline,setInline]=useState(false)
  return (
    <Header >
      <div className="navbar">
        <div className="nav-logo">
          <Link>
            <h1>REACT-DEV</h1>
          </Link>
        </div>
        <Space.Compact>
          <Search
            placeholder="Iphone 13 pro max"
            onSearch={onSearch}
            allowClear
          />
        </Space.Compact>
        <div className="nav-menu">
        <Menu
        overflowedIndicator={<BarsOutlined/>}
        mode={isInline?"inline":"horizontal"}
          theme="dark"
          triggerSubMenuAction="click"
          items={items}
        />
        </div>
        {/* <ul className="nav-link">
          <li>
            <Link>Home</Link>
          </li>
          <li>
            <Link>About</Link>
          </li>
          <li>
            <Link>Services</Link>
          </li>
          <li>
            <Link>Contract</Link>
          </li>
        </ul> */}
        <div className="customer">
          <Link className="action-btn">Login</Link>
          <Link className="action-btn">
            <Badge count={5} showZero>
              <ShoppingCartOutlined size="larger" />
            </Badge>
          </Link>
        </div>
        <div className="toggle-btn">
          <BarsOutlined  onClick={()=>setInline((prev)=>!prev)}/>
        </div>
      </div>
    </Header>
    
  );
};
export default Headers;
