import React from "react";
import { Carousel } from "antd";
import 'bootstrap/dist/css/bootstrap.css';
import './carousel.css'
function Carousels(props) {
  return (
    <div className="container">
        <Carousel className="carousel" autoplay>
      <div>
        <img src={require('assets/images/main-banner-1.jpg')} alt="" />
      </div>
      <div>
      <img src={require('assets/images/main-banner.jpg')} alt="" />
      </div>
    </Carousel>
    </div>
  );
}

export default Carousels;
