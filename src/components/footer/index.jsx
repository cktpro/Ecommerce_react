import { Layout } from 'antd';
import React from 'react';
const {Footer} =Layout
function Footers(props) {
    return (
        <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    );
}

export default Footers;