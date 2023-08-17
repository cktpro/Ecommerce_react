import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import './details.scss'
import {axiosClient} from 'helper/axiosClient'

function ProductDetail(props) {
    const params = useParams();
    const [loaded, setLoaded] = useState(false);
    const [product, setProduct] = useState({});
  const getProductData = async () => {
    try {
      const url = `/products/${params.id}`;

      const res = await axiosClient.get(url);
    
    setProduct(res.data.payload);
    setLoaded(true)
    } catch (err) {
      console.error("««««« err »»»»»", err);
    }
  };
  useEffect( () => {
     getProductData();
  }, []);
    return (
        <div className='container py-3'>
            <div className="product-box mx-auto">
      <div className="product-image">
        <img
          alt="example"
          src="https://picsum.photos/300"
        />
      </div>
      <div>
        <h4>{product.name}</h4>
        <div className="d-flex justify-content-center align-items-center my-3">
          <p className="old-price me-2">{product.price}</p>
          <p className="new-price me-2">
            {product.discountedPrice}
          </p>
          <p className="discount">{product.discount}%</p>
        </div>
        <table className="table">
          <tr>
            <th colSpan={2}>Thông tin chi tiết</th>
          </tr>
          <tr>
            <td className="left">Mô tả</td>
            <td className="right
            ">{product.description}</td>
          </tr>
          <tr>
            <td className="left">Số lượng còn lại</td>
            <td className="right">{product.stock}</td>
          </tr>
          <tr>
            <td className="left">Loại sản phẩm</td>
            {loaded?<td className="right">{product.category.name}</td>:''}
          </tr>
          <tr>
            <td className="left">Nhà cung cấp</td>
            {loaded?<td className="right">{product.supplier.name}</td>:''}
          </tr>
        </table>
      </div>
    </div>
        </div>
    );
}

export default ProductDetail;