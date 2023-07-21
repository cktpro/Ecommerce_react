import React, { useState } from "react";
import { BarsOutlined, ShoppingCartOutlined,SettingOutlined } from "@ant-design/icons";
import "./header.css";
import { Link } from "react-router-dom";
import { Badge, Avatar, Menu,Input,Space } from "antd";
const {Search}=Input
const onSearch = (value) => console.log('<<<<<< Search Value >>>>>>','\n',value);;
const Headers = () => {
  return (
    <header>
      <div className="navbar">
        <div className="nav-logo">
          <Link>
            <h1>REACT-DEV</h1>
          </Link>
        </div>
        <Space.Compact>
      <Search placeholder="Iphone 13 pro max" onSearch={onSearch} allowClear />
    </Space.Compact>
        <Menu
        className="nav-menu"
        items={[
          {
            key:"home",
            label:"Home",
            icon:<BarsOutlined/>
          },
          {
            key:"about",
            label:"About"
          },
          {
            key:"services",
            label:"Services"
          },
          {
            key:"contract",
            label:"Contract"
          }
          
        ]}
        />
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
            <ShoppingCartOutlined size="larger"/>
            </Badge>
          </Link>
        </div>
        <div className="toggle-btn">
          <BarsOutlined />
        </div>
      </div>
    </header>
  );
};
export default Headers;
