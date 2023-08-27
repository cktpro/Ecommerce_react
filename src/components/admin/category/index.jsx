// import
import React, { memo, useEffect, useState, useCallback } from "react";
import { createRoot } from 'react-dom/client';
import { Link } from "react-router-dom";
import {
  Space,Table,Form,Button,Popconfirm,Modal,message,Pagination,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { axiosClient } from "helper/axiosClient";
import CategoryForm from "./categoryForm";
const MESSAGE_TYPE = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
};
function Admin_Category() {
  // variable
  const DEFAULT_LIMIT = 5;
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: DEFAULT_LIMIT,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  const onSelectProduct = useCallback(
    (data) => () => {
      setEditModalVisible(true);

      setSelectedProduct(data);

      updateForm.setFieldsValue(data);
    },
    [updateForm]
  );

//   const onShowMessage = useCallback(
//     (content, type = MESSAGE_TYPE.SUCCESS) => {
//       messageApi.open({
//         type: type,
//         content: content,
//       });
//     },
//     [messageApi]
//   );
  const onFinish = useCallback(async (values) => {
    try {
      const res = await axiosClient.post("/category", values);

      

      setRefresh(refresh + 1);
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
        const res = await axiosClient.patch(`/category/delete/${id}`);

        getCategories();
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
          `/category/${selectedProduct._id}`,
          data
        );

        setRefresh(refresh + 1);
        updateForm.resetFields();

        setEditModalVisible(false);
        message.success('Cập nhật thành công');
      } catch (error) {
        if (error?.response?.data?.errors) {
            message.fail('Cập nhật thất bại');
          error.response.data.errors.map((e) => console.log("◀◀◀ e ▶▶▶", e));
        }
      }
    },
    [selectedProduct, updateForm,refresh]
  );
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

      getCategories();
    },
    [getCategories]
  );

  useEffect(() => {
    getCategories();
  }, [getCategories,refresh]);
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
  const handleChange = (value) => {
    console.log("◀◀◀ choose ▶▶▶", value);
  };
  const [inputValue, setInputValue] = useState(1);
  const onChange = (newValue) => {
    setInputValue(newValue);
  };
  return (
    // main
    <>
    <CategoryForm
    onFinish={onFinish}
    />
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={categories}
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
        <CategoryForm
          form={updateForm}
          onFinish={onEditFinish}
          formName="update-product"
          isHiddenSubmit
        />
      </Modal>
    </>
  );
}
export default memo(Admin_Category);
