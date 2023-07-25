import React from "react";
import { Carousel, Row, Col } from "antd";

import "bootstrap/dist/css/bootstrap.css";
import "./carousel.scss";
const items = [
  {
    src: require("assets/images/main-banner-1.jpg"),
    alt: "banner1",
  },
  {
    src: require("assets/images/main-banner.jpg"),
    alt: "banner2",
  },
];
const item2 = [
  {
    src: require("assets/images/catbanner-01.jpg"),
    alt: "cat banner 1",
  },
  {
    src: require("assets/images/catbanner-02.jpg"),
    alt: "cat banner 2",
  },
  {
    src: require("assets/images/catbanner-03.jpg"),
    alt: "cat banner 3",
  },
  {
    src: require("assets/images/catbanner-04.jpg"),
    alt: "cat banner 4",
  },
];
function Carousels(props) {
  return (
    <section className="container-lg mt-3">
      <Row>
        <Col md={12} xs={24}>
          <Carousel className="carousel" autoplay>
            {items.map((item, idx) => {
              return (
                <div key={idx}>
                  <img src={item.src} alt="" />
                  <h6 className="text-img">Form 999$ for Iphone 14 Pro Max</h6>
                </div>
              );
            })}
            {/* <div>
              <img src={require("assets/images/main-banner-1.jpg")} alt="" />
              <h6 className="text-img">Form 999$ for Iphone 14 Pro Max</h6>
            </div>
            <div>
              <img src={require("assets/images/main-banner.jpg")} alt="" />
              <h6 className="text-img">Form 999$ for Iphone 14 Pro Max</h6>
            </div> */}
          </Carousel>
        </Col>
        <Col md={12} sm={24}>
          <div className="box-banner">
            {item2.map((item2, idx) => {
              return (
                <div className="banner" key={idx}>
                  <img
                    src={item2.src}
                    alt={item2.alt}
                  />
                  <h6 className="text-banner">Form 999$ for Iphone 14 Pro Max</h6>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    </section>
  );
}

export default Carousels;
