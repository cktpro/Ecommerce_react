import React from "react";
import { Breadcrumb, Layout, theme, Row } from "antd";

import Footers from "components/footer";
import Headers from "components/header";
import { Outlet } from "react-router-dom";
import Carousels from "components/carousel";
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
        
        
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          
          
          <Outlet />
        </div>
        
      </Content>
      <Footers />
    </Layout>
  );
}

export default Layouts;
