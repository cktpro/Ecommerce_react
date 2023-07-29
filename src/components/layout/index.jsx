import React from "react";
import { Breadcrumb, Layout, theme, Row } from "antd";

import Footers from "components/footer";
import Headers from "components/header";
import { Outlet } from "react-router-dom";
import Carousels from "components/carousel";
import Products from "components/products";
const { Content } = Layout;
function Layouts(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      {/* Header */}
      <Headers />
      <Carousels/>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
          <Outlet />
        
      </Content>
      <Footers />
    </Layout>
  );
}

export default Layouts;
