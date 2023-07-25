import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarsOutlined,
  CloseOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Input, Badge, Dropdown, Menu } from "antd";

import "./header.scss";
const { Search } = Input;
function Headers(props) {
  const [isShow, setIsShow] = useState(false);
  const navRef = useRef();
  const showNavBar = async () => {
    await navRef.current.classList.toggle("responsive_nav");
    await setIsShow((prev) => !prev);
  };
  const onSearch = (value) => console.log(value);


  return (
    <header className="app-header">
      <Button className="nav-btn-menu" onClick={showNavBar}>
        {!isShow ? <BarsOutlined /> : <CloseOutlined />}
      </Button>
      <h2>REACT-DEV</h2>
      <nav ref={navRef} className="nav-header">
        <Link to="/">Home</Link>
        {/* <Dropdown
        trigger="click"
        menu={{
          items
        }}
        placement="bottom"
      >
        <Button>Products</Button>
      </Dropdown> */}
        <Link to="/mywork">My Work</Link>
        <Link to="/blog"> Blog</Link>
        <Link to="about">About Me</Link>
        {/* <Menu triggerSubMenuAction="click"  className="nav-menu" theme="none" items={items} /> */}

        <Search
          style={{ width: "200px" }}
          placeholder="Bạn muốn tìm gì?"
          allowClear
          onSearch={onSearch}
          className="search"
        />
      </nav>

      <Link to="cart">
        <Badge count={1}>
          {/* <Avatar shape="square" icon={<ShoppingCartOutlined />} /> */}
          <Button>
            <ShoppingCartOutlined />
          </Button>
        </Badge>
      </Link>
    </header>
  );
}

export default Headers;
