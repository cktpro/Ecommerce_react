import React, { memo, useEffect, useState, useCallback } from "react";
import {
  Space,
  Table,
  Form,
  Button,
  Popconfirm,
  Modal,
  message,
  Alert,
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

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
  const onEditFinish = useCallback(
    async (data) => {
      try {
        const res = await axiosClient.put(
          `/products/${selectedProduct.id}`,
          data
        );

        // onShowMessage('Thêm sản phẩm thành công');

        // setRefresh(refresh + 1);
        updateForm.resetFields();

        setEditModalVisible(false);
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
    },
    [selectedProduct]
  );

  const getProductData = useCallback(async () => {
    try {
      const res = await axiosClient.get("/products");
      setProducts(res.data.payload);
    } catch (error) {
      console.log(error);
    }
  }, []);
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
  useEffect(() => {
    getSuppliers();

    getCategories();
  }, [getCategories, getSuppliers]);
  useEffect(() => {
    getProductData();
  }, [getProductData]);
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discount",
      key: "discount",
      dataIndex: "discount",
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
              //   onConfirm={onDeleteProduct(record._id)}
              //   onConfirm={console.log(record.id)}
            >
              <Button danger type="dashed" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <ProductsForm
        suppliers={suppliers}
        categories={categories}
        formName="add-product-form"
        onFinish={onFinish}
      />
      <Table rowKey="id" columns={columns} dataSource={products} />;
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
