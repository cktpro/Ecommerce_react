import React from 'react';
import { Breadcrumb, Layout, theme,Row} from 'antd';

import Footers from "components/footer";
import Headers from "components/header";
import { Outlet } from 'react-router-dom';
const {  Content, } = Layout;
function Layouts(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      {/* Header */}
      <Headers/>
      <Row>
      
      </Row>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          <Outlet/>
        </div>
      </Content>
      <Footers/>
    </Layout>
  );
}

export default Layouts;
