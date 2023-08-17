// import
import React, { memo, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Space,
  Table,
  Form,
  Button,
  Popconfirm,
  Modal,
  message,
  Alert,
  Row,
  Col,
  Pagination,
  Select,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { axiosClient } from "helper/axiosClient";
import ProductsForm from "./productsForm";
const MESSAGE_TYPE = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
};
function Products() {
  // variable
  const DEFAULT_LIMIT = 5;
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: DEFAULT_LIMIT,
  });
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState({
    category:undefined
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onSelectProduct = useCallback(
    (data) => () => {
      setEditModalVisible(true);

      setSelectedProduct(data);

      updateForm.setFieldsValue(data);
    },
    [updateForm]
  );
  const onShowToast = useCallback(
    ({
      message = "Thành công",
      description = "Thành công",
      type = MESSAGE_TYPE.SUCCESS,
    }) => {
      return (
        <Alert
          message={message}
          description={description}
          type={type}
          showIcon
        />
      );
    },
    []
  );

  const onShowMessage = useCallback(
    (content, type = MESSAGE_TYPE.SUCCESS) => {
      messageApi.open({
        type: type,
        content: content,
      });
    },
    [messageApi]
  );
  const onFinish = useCallback(async (values) => {
    try {
      const res = await axiosClient.post("/products", values);

      // onShowMessage('Thêm sản phẩm thành công');

      // setRefresh(refresh + 1);
      console.log("◀◀◀ Thêm sản phẩm thành công ▶▶▶");
      // CASE 1
      // const newItem = res.data.payload;

      // setProducts((preState) => ([
      //   ...preState,
      //   newItem,
      // ]))
    } catch (error) {
      if (error?.response?.data?.errors) {
        error.response.data.errors.map((e) => console.log("◀◀◀ e ▶▶▶", e));
      }
    }
  }, []);
  const onDeleteFinish = useCallback(
    (id) => async () => {
      try {
        const res = await axiosClient.patch(`/products/delete/${id}`);

        getProductData();
        // setRefresh(refresh + 1);

        // const newItem = res.data.payload;

        // setProducts((preState) => ([
        //   ...preState,
        //   newItem,
        // ]))
      } catch (error) {
        if (error?.response?.data?.errors) {
          error.response.data.errors.map((e) => console.log("◀◀◀ e ▶▶▶", e));
        }
      }
    },
    []
  );
  const onEditFinish = useCallback(
    async (data) => {
      try {
        const res = await axiosClient.put(
          `/products/${selectedProduct._id}`,
          data
        );

        getProductData();
        // setRefresh(refresh + 1);
        updateForm.resetFields();

        setEditModalVisible(false);
      } catch (error) {
        if (error?.response?.data?.errors) {
          error.response.data.errors.map((e) => console.log("◀◀◀ e ▶▶▶", e));
        }
      }
    },
    [selectedProduct, updateForm]
  );

  const getProductData = useCallback(async () => {
    try {
      const res = await axiosClient.get(
        `/products?page=${pagination.page}&pageSize=${pagination.pageSize}&category=${search.category}`
      );
      setProducts(res.data.payload);
      setPagination((prev) => ({
        ...prev,
        total: res.data.total,
      }));
    } catch (error) {
      console.log(error);
    }
  }, [pagination.page, pagination.pageSize]);
  const getSuppliers = useCallback(async () => {
    try {
      const res = await axiosClient.get("suppliers");
      setSuppliers(res.data.payload);
    } catch (err) {
      console.log("◀◀◀ err ▶▶▶", err);
    }
  }, []);
  const getCategories = useCallback(async () => {
    try {
      const res = await axiosClient.get("/category");
      setCategories(res.data.payload);
    } catch (err) {
      console.log("◀◀◀ err ▶▶▶", err);
    }
  }, []);
  const onChangePage = useCallback(
    (page, pageSize) => {
      setPagination((prev) => ({
        ...prev,
        page,
        pageSize,
      }));

      getProductData();
    },
    [getProductData]
  );

  useEffect(() => {
    getSuppliers();

    getCategories();
  }, [getCategories, getSuppliers]);
  useEffect(() => {
    getProductData();
  }, [getProductData]);
  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Name",
      key: "name",
      render: (text, record, index) => {
        return <Link to={`/product_details/${record._id}`}>{record.name}</Link>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record, index) => {
        return <span style={{ color: "gray" }}>${record.price}</span>;
      },
    },
    {
      title: "Discount",
      key: "discount",
      dataIndex: "discount",
    },
    {
      title: "Discounted Price",
      key: "discountedPrice",
      render: (text, record, index) => {
        return (
          <span style={{ color: "green", fontWeight: "700" }}>
            ${(record.price * (100 - record.discount)) / 100}
          </span>
        );
      },
    },

    {
      title: "Stock",
      key: "stock",
      dataIndex: "stock",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <Space>
            <Button
              type="dashed"
              icon={<EditOutlined />}
              onClick={onSelectProduct(record)}
            />

            <Popconfirm
              title="Are you sure to delete?"
              okText="Đồng ý"
              cancelText="Đóng"
              onConfirm={onDeleteFinish(record._id)}
              //   onConfirm={console.log(record.id)}
            >
              <Button danger type="dashed" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const handleChange = useCallback(
    (value) => {
      setSearch((prev) => ({
        ...prev,
        
      }));

      getProductData();
    },
    [getProductData]
  );
  return (
    // main
    <>
      <Row>
        <Col span={20}>
          <h1>Products</h1>
        </Col>
        <Col span={4} className="text-end">
          <Button
            type="primary"
            className="my-3"
            onClick={() => {
              setIsHidden((prev) => !prev);
            }}
          >
            {isHidden ? "Add Product" : "Close"}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Select
            defaultValue="Select"
            style={{
              width: 120,
            }}
            onChange={handleChange}
          >
            {categories.map((item)=>{
            return <option key={item._id} value={item._id}>{item.name}</option>
            })}
          </Select>
        </Col>
      </Row>
      <ProductsForm
        className={isHidden ? "d-none" : "d-block"}
        suppliers={suppliers}
        categories={categories}
        formName="add-product-form"
        onFinish={onFinish}
      />
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={products}
        pagination={false}
      />
      <Pagination
        defaultCurrent={pagination.page}
        total={pagination.total}
        pageSize={pagination.pageSize}
        onChange={onChangePage}
      />
      <Modal
        open={editModalVisible}
        centered
        title="Cập nhật thông tin"
        onCancel={() => {
          setEditModalVisible(false);
        }}
        cancelText="Đóng"
        okText="Lưu"
        onOk={() => {
          updateForm.submit();
        }}
      >
        <ProductsForm
          form={updateForm}
          suppliers={suppliers}
          categories={categories}
          onFinish={onEditFinish}
          formName="update-product"
          isHiddenSubmit
        />
      </Modal>
    </>
  );
}
export default memo(Products);
