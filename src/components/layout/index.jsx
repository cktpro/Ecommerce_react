import React from "react";
import { Layout } from "antd";

import Footers from "components/footer";
import Headers from "components/header";
import { Outlet } from "react-router-dom";
const { Content } = Layout;
function Layouts(props) {
  return (
    <Layout className="layout">
      {/* Header */}
      <Headers />
     
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
