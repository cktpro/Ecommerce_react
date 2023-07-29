import React from "react";
import Products from "components/products";

function ProductsPage(props) {
  return (
    <div className="container">
        <h1>Products</h1>
      <Products />
    </div>
  );
}

export default ProductsPage;
