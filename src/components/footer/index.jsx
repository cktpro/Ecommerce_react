import { Row, Col } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import './footer.scss'
function Footers(props) {
  return (
    <footer className="footer">
      <div className="container-xxl">
      <Row>
      <Col lg={6} xs={12}>
          <h4>Contract Us</h4>
          <p>Demo Store</p>
          <p>147/6 Lê Đình Lý</p>
          <p>Đà Nẵng</p>
          <p>
            <Link to="tel:0357081186">0357081186</Link>
          </p>
          <p>
            <Link to="mailto:kimtramcap@gmail.com">kimtramcap@gmail.com</Link>
          </p>
        </Col>
        <Col lg={6} xs={12}>
          <h4>Infomation</h4>
          <p>Privacy Policy</p>
          <p>Refund Policy</p>
          <p>Shipping Policy</p>
          <p>Terms of Service</p>
          <p>Blogs</p>
        </Col>
        <Col lg={6} xs={12}>
          <h4>Quick Links</h4>
          <p>
            <Link>Smart Phones</Link>
          </p>
          <p>
            <Link>Tablets</Link>
          </p>
          <p>
            <Link>Laptops</Link>
          </p>
          <p>
            <Link>Smart Watchs</Link>
          </p>
          <p>
            <Link>HeadPhones</Link>
          </p>
        </Col>
        <Col lg={6} xs={12}>
          <h4>Our App</h4>
          <p>
            Download our App and get extra  15% discount on your first Order
          </p>
          <div className="logo-footer">
          <img src={require('assets/images/gplay.png')} alt="gplay icon" />
          <img  src={require('assets/images/appstore.png')} alt="appstore icon" />
          </div>
        </Col>
      </Row>
      </div>
      
    </footer>
  );
}

export default Footers;
