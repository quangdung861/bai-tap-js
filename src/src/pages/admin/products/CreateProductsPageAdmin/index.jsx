import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Space,
  Card,
  Form,
  Input,
  Row,
  Col,
  InputNumber,
  Tooltip,
  Switch,
  Select,
  Upload,
  Spin,
} from "antd";
import {
  LeftOutlined,
  InfoCircleTwoTone,
  PlusCircleTwoTone,
  PlusOutlined,
  MinusCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import ReactQuill from "react-quill";
import slug from "slug";
import { ROUTES } from "../../../../constants/routes";
import {
  getCategoryListAction,
  createProductAction,
} from "../../../../redux/admin/actions";
import { convertImageToBase64 } from "../../../../utils/file";

import * as S from "./styles";
const CreateProductPageAdmin = () => {
  const { Option } = Select;
  const antIcon = <LoadingOutlined style={{ fontSize: 80 }} spin />;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createProductForm] = Form.useForm();

  const { categoryList } = useSelector((state) => state.categoryAdminReducer);
  const { createProduct } = useSelector((state) => state.productAdminReducer);

  useEffect(() => {
    dispatch(getCategoryListAction());
  }, []);

  const selectCategories = () => {
    return categoryList.data.map((item, index) => {
      return (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      );
    });
  };

  const handleCreateProduct = async (values) => {
    const { options, images, ...productValues } = values;
    const newImages = [];
    for (let i = 0; i < images.length; i++) {
      const imgBase64 = await convertImageToBase64(images[i].originFileObj);
      await newImages.push({
        name: images[i].name,
        type: images[i].type,
        thumbUrl: images[i].thumbUrl,
        url: imgBase64,
      });
    }

    await dispatch(
      createProductAction({
        values: {
          ...productValues,
          slug: slug(productValues.name),
          status: values.status ? "Đang giao dịch" : "Ngưng giao dịch",
        },
        options: options,
        images: newImages,
        callback: {
          resetCreateForm: () => createProductForm.resetFields(),
          redirectProductList: () => navigate(ROUTES.ADMIN.PRODUCT_LIST),
        },
      })
    );
  };

  return (
    <S.MainContainer>
      <Spin indicator={antIcon} spinning={createProduct.loading}>
        <div className="header">
          <Space>
            <span
              className="page-back"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(ROUTES.ADMIN.PRODUCT_LIST)}
            >
              <LeftOutlined />
              Quay lại danh sách sản phẩm
            </span>
          </Space>
          <Space>
            <Button onClick={() => navigate(ROUTES.ADMIN.PRODUCT_LIST)}>
              <span className="span-button">Thoát</span>
            </Button>
            <Button type="primary" onClick={() => createProductForm.submit()}>
              <span className="span-button">Lưu</span>
            </Button>
          </Space>
        </div>

        {/* Content */}
        <S.MainContent>
          <Form
            name="createProductForm"
            form={createProductForm}
            layout="vertical"
            onFinish={(values) => handleCreateProduct(values)}
            initialValues={{ status: true }}
          >
            <div className="card-list">
              <div className="card-list-left">
                <Card className="card-item" title="Thông tin chung">
                  <Form.Item
                    label="Tên sản phẩm"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa nhập tên sản phẩm",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập tên sản phẩm" />
                  </Form.Item>
                </Card>

                <Card
                  className="card-item"
                  title="Giá sản phẩm"
                  extra={
                    <Link
                      style={{
                        fontWeight: 500,
                      }}
                    >
                      <PlusCircleTwoTone
                        style={{ fontSize: 18, paddingRight: 5 }}
                      />
                      Thêm chính sách giá
                    </Link>
                  }
                >
                  <Row gutter={20}>
                    <Col span={12}>
                      <Form.Item
                        label="Giá bán lẻ"
                        name="price"
                        rules={[
                          {
                            required: true,
                            message: "Bạn chưa nhập giá bán",
                          },
                        ]}
                        tooltip={{
                          title: "Giá bán cho các khách hàng mua lẻ",
                          icon: (
                            <InfoCircleTwoTone
                              style={{ margin: "0px 5px 8px" }}
                            />
                          ),
                        }}
                      >
                        <InputNumber
                          style={{
                            width: "100%",
                          }}
                          controls={false}
                          placeholder="Nhập giá bán lẻ"
                          formatter={(value) =>
                            value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Giá bán nhập"
                        name="priceImport"
                        tooltip={{
                          title: "Giá gốc bạn nhập vào",
                          icon: (
                            <InfoCircleTwoTone
                              style={{ margin: "0px 5px 8px" }}
                            />
                          ),
                        }}
                      >
                        <InputNumber
                          style={{
                            width: "100%",
                            textAlign: "right",
                          }}
                          controls={false}
                          formatter={(value) =>
                            value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={20}>
                    <Col span={12}>
                      <Form.Item
                        label="Giá sau giảm giá"
                        name="discountPrice"
                        rules={[
                          {
                            required: true,
                            message: "Bạn chưa nhập giá sau giảm giá",
                          },
                        ]}
                        tooltip={{
                          title: "Giá bán sau giảm giá cho các khách hàng mua lẻ",
                          icon: (
                            <InfoCircleTwoTone
                              style={{ margin: "0px 5px 8px" }}
                            />
                          ),
                        }}
                      >
                        <InputNumber
                          style={{
                            width: "100%",
                          }}
                          controls={false}
                          placeholder="Nhập giá sau giảm giá"
                          formatter={(value) =>
                            value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

                <Card className="card-item" title="Nội dung">
                  <Row>
                    <Col span={24}>
                      <Form.Item name="content">
                        <ReactQuill
                          theme="snow"
                          onChange={(value) =>
                            createProductForm.setFieldValue("content", value)
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

                <Card title="Ảnh sản phẩm" className="card-item">
                  <Form.Item
                    name="images"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                      if (Array.isArray(e)) {
                        return e;
                      }
                      return e?.fileList;
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa tải lên ảnh sản phẩm",
                      },
                    ]}
                  >
                    <Upload
                      listType="picture-card"
                      beforeUpload={Upload.LIST_IGNORE}
                    >
                      <div>
                        <PlusOutlined />
                        <div
                          style={{
                            marginTop: 8,
                          }}
                        >
                          Upload
                        </div>
                      </div>
                    </Upload>
                  </Form.Item>
                </Card>

                <Card
                  title={
                    <Space
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent: "start",
                      }}
                    >
                      <Space>
                        Thuộc tính
                        <Tooltip title="Tạo các thuộc tính để phân biệt các phiên bản khác nhau của sản phẩm. Ví dụ: Kích thước, Màu sắc, Chất liệu,...">
                          <InfoCircleTwoTone style={{ fontSize: 14 }} />
                        </Tooltip>
                      </Space>
                      <span style={{ fontWeight: 400, fontSize: 14 }}>
                        Thêm mới thuộc tính giúp sản phẩm có nhiều lựa chọn, như
                        kích cỡ hay màu sắc
                      </span>
                    </Space>
                  }
                >
                  <Row gutter={20}>
                    <Col span={24}>
                      <Form.List name="options">
                        {(fields, callback) => (
                          <>
                            {fields.map((field) => (
                              <Card
                                key={field.key}
                                size="small"
                                style={{ marginBottom: 16 }}
                              >
                                <Form.Item
                                  {...field}
                                  label="Size"
                                  name={[field.name, "name"]}
                                >
                                  <Input />
                                </Form.Item>
                                <Form.Item
                                  {...field}
                                  label="Giá cộng thêm"
                                  name={[field.name, "bonusPrice"]}
                                >
                                  <InputNumber
                                    formatter={(value) =>
                                      value.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ","
                                      )
                                    }
                                    parser={(value) =>
                                      value.replace(/\$\s?|(,*)/g, "")
                                    }
                                    style={{ width: 200 }}
                                  />
                                </Form.Item>
                                <Button
                                  ghost
                                  danger
                                  onClick={() => callback.remove(field.name)}
                                >
                                  Delete
                                </Button>
                              </Card>
                            ))}
                            <Button
                              type="dashed"
                              block
                              icon={<PlusOutlined />}
                              onClick={() => callback.add()}
                            >
                              Add option
                            </Button>
                          </>
                        )}
                      </Form.List>
                    </Col>
                  </Row>
                </Card>
              </div>

              <div className="card-list-right">
                <Card className="card-item" title="Thông tin bổ sung">
                  <Form.Item
                    label="Loại sản phẩm"
                    name="categoryId"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa nhập loại sản phẩm",
                      },
                    ]}
                  >
                    <Select loading={categoryList.loading}>
                      {selectCategories()}
                    </Select>
                  </Form.Item>
                </Card>

                <div className="box-hashtag">
                  <Space>
                    <div style={{ fontWeight: 500 }}>Gắn nhãn</div>
                    <Tooltip title="Gắn nhãn sản phẩm, để trống nếu sản phẩm không có nhãn">
                      <InfoCircleTwoTone style={{ fontSize: 14 }} />
                    </Tooltip>
                  </Space>

                  <div
                    style={{
                      marginTop: "16px",
                    }}
                  >
                    <Form.Item name="hashtagOne" label="Hashtag">
                      <Input style={{ width: "100%" }} />
                    </Form.Item>
                  </div>
                  <div
                    style={{
                      marginTop: "16px",
                    }}
                  >
                    <Form.Item name="hashtagTwo" label="Hashtag 2">
                      <Input style={{ width: "100%" }} />
                    </Form.Item>
                  </div>
                </div>

                <div className="box-status">
                  <Space>
                    <div style={{ fontWeight: 500 }}>Trạng thái</div>
                    <Tooltip title="Cho phép tìm kiếm sản phẩm và tạo đơn hàng">
                      <InfoCircleTwoTone style={{ fontSize: 14 }} />
                    </Tooltip>
                  </Space>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>Cho phép bán</span>
                    <Form.Item name="status" valuePropName="checked">
                      <Switch
                        style={{ marginTop: "22px" }}
                        onChange={(value) => null}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>

            <Form.Item style={{ textAlign: "end" }}>
              <Space>
                <Button>
                  <span
                    className="span-button"
                    onClick={() => navigate(ROUTES.ADMIN.PRODUCT_LIST)}
                  >
                    Thoát
                  </span>
                </Button>
                <Button type="primary" htmlType="submit">
                  <span className="span-button">Lưu</span>
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </S.MainContent>
      </Spin>
    </S.MainContainer>
  );
};

export default CreateProductPageAdmin;
