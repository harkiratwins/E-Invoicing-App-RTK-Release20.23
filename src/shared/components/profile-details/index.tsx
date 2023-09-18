import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Collapse, Typography } from "antd";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { CaretRightFilled } from "@ant-design/icons";
import PayableToForm from "../payable-to";
import { ApiProps } from "./type";

import {
  useProfileQuery,
  useGlobalcodeQuery,
  useUpdatebusinessMutation,
} from "../../../services/api-profiledeatils-slice";

const Option = Select.Option;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 11 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 11,
      offset: 8,
    },
  },
};

export default function ProfileDetailsForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [test, setTest] = useState<any>({});
  const [globaldata, setGloabaldata] = useState<any>([]);
  const [imagee, setImagee] = useState<any>({
    profileImage: "",
  });
  const [extra, setExtra] = useState<any>({
    profileImage: "",
    ProfileImageName: "",
    isImageUpdated: false,
    businessId: "",
    imageId: "",
    actionPerformedBy: "",
  });

  const [updateTeamMember] = useUpdatebusinessMutation();

  const { data, error, isLoading } = useProfileQuery({
    BusinessId: "89",
    BusinessLocationId: "1",
  });
  
  const { data: stage } = useGlobalcodeQuery({
    categoryName: "",
  });
  

  useEffect(() => {
    if (data) {
      console.log(test.profileImage, "imageeeeeee");
      setTest(data);
      console.log(test.profileImage, "kkkklljpoutf");
      form.setFieldsValue({
        businessId: 89,
        businessLocationId: 0,
        businessName: data.businessName,
        businessAddress: data.businessAddress,
        businessEmailAddress: data.businessEmailAddress,
        phoneNumber: data.phoneNumber,
        stateId: data.stateId,
        city: data.city,
        zipcode: data.zipcode,
        businessCategoryType: data.businessCategoryType,
        businessCategoryTypeId: data.businessCategoryTypeId,
       
        imageId: data.imageId,
      });

      setExtra({
        businessId: 89,
        imageId: data.imageId,
        actionPerformedBy: "harkiratkaurwins@gmail.com",
        isImageUpdated: true,
        merchantId: null,
        profileImage: data.profileImage,
        ProfileImageName: extra && extra.profileImageName,
      });
      console.log(extra.profileImageName, "imageeehhhhhhhhhhhhhheeee");
    }

    if (extra.profileImage) {
      if (typeof extra.profileImage === "object")
        return window.URL.createObjectURL(extra.profileImage);
      else
        return (
          "https://easyinvoiceimage.blob.core.windows.net/easyinvoiceimage/" +
          extra.profileImage
        );
    } else {
      return extra.profileImagename;
    }
  }, [data]);

  const UpdateBusiness = async () => {
    const valueData = form.getFieldsValue();

    const a = !Number.isNaN(Number(valueData.businessCategoryType))
      ? Number(valueData.businessCategoryType)
      : test.businessCategoryTypeId;

    const newObj = { ...valueData, businessCategoryType: a, ...extra };
    var formData: any = new FormData();

    Object.entries(newObj).forEach(([key, val]) => {
      formData.append(key, val);
    });
    try {
      const response = await updateTeamMember(formData);

      console.log("PUT Response:", response);
    } catch (error) {
      console.error("Error making PUT request:", error);
    }
  };

  useEffect(() => {
    if (stage) {
      const y: any =
        stage && stage.filter((x: any) => x.categoryName === "States");

      setGloabaldata(y);
    }
  }, [stage]);

  const [valuee, setValuee] = useState<any>();
  const [dataa, setData] = useState<ApiProps>({
    businessId: "",

    businessName: " ",
    businessAddress: " ",
    businessEmailAddress: "",
    phoneNumber: "",
    stateId: " ",
    city: "",
    zipcode: "",
    businessCategoryType: "",
    businessCategoryTypeId: "",
    profileImage: "",
    imageId: "",
    actionPerformedBy: "",
  });

  // var formData = commonFunctions.getFormData(newObj);
  const handleImageChange = (e: any) => {
    setExtra({
      // ...extra,
      profileImage: e.target.files[0],
      ProfileImageName: e.target.files[0].name,
      isImageUpdated: true,
    });
  };

  return (
    <>
      <div className="mainBlock">
        <Row>
          <Col span={20}>
            <h2 style={{ padding: 15 }}>Business Profile</h2>
          </Col>
          <Col style={{ padding: 15 }} span={4}>
            <Button
              style={{
                width: 70,
                height: 40,
                background: " #c6c8d6",
                marginTop: 14,
                marginLeft: 90,
              }}
              className="backButton"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Col>
        </Row>
        <div className="profilebClass">
          <Collapse
            accordion={true}
            defaultActiveKey={["1"]}
            ghost={true}
            expandIconPosition="right"
            expandIcon={({ isActive }) => {
              return <CaretRightFilled rotate={isActive ? 90 : 0} />;
            }}
          >
            <Collapse.Panel key="1" header={<h3>Profile Details</h3>}>
              <Typography.Text>
                <Form
                  className="profileBorder formClass"
                  {...formItemLayout}
                  form={form}
                  name="control-hooks"
                  scrollToFirstError
                >
                  <div className="profileClass">
                    <Row>
                      <Col span={4} style={{ marginTop: 50 }}>
                        <div className="imageClass">
                          <img
                            src={`https://easyinvoiceimage.blob.core.windows.net/easyinvoiceimage/${extra.profileImage} `}
                          />
                        </div>

                        <input
                          type="file"
                          style={{ marginLeft: 80 }}
                          title={
                            extra.profileImage !== null
                              ? `${extra.ProfileImageName}`
                              : "No file Choosen"
                          }
                          onChange={handleImageChange}
                          alt="User Image"
                          accept="image/*"
                        />
                      </Col>

                      <Col span={16}>
                        <Row>
                          <Col span={12}>
                            <Form.Item
                              name="businessName"
                              label=" "
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your business-name!",
                                  whitespace: true,
                                },
                              ]}
                            >
                              <Input
                                placeholder="enter name"
                                className="inputClass"
                              />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              name="businessAddress"
                              label=" "
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your Address!",
                                  whitespace: true,
                                },
                              ]}
                            >
                              <Input className="inputClass" />
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row>
                          <Col span={12}>
                            <Form.Item
                              name="businessEmailAddress"
                              label=" "
                              rules={[
                                {
                                  type: "email",
                                  message: "The input is not valid E-mail!",
                                },
                                {
                                  required: true,
                                  message: "Please input your E-mail!",
                                },
                              ]}
                            >
                              <Input className="inputClass" />
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item
                              name="phoneNumber"
                              className="inputClass"
                              label=" "
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your phone number!",
                                },
                              ]}
                            >
                              <PhoneInput
                                defaultCountry="US"
                                Value={valuee}
                                onChange={() => setValuee}
                              />
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row>
                          <Col span={12}>
                            <Form.Item
                              name="stateId"
                              label=" "
                              hasFeedback
                              rules={[
                                {
                                  required: true,
                                  message: "Please select your country!",
                                },
                              ]}
                            >
                              <Select className="inputClass">
                                {globaldata.map((x: any) => (
                                  <Select.Option
                                    key={x.globalCodeId}
                                    value={x.globalCodeId}
                                  >
                                    {x.codeName}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item
                              name="city"
                              label=" "
                              rules={[
                                {
                                  required: true,
                                  message: "The City field is empty!",
                                  whitespace: true,
                                },
                              ]}
                            >
                              <Input className="inputClass" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={12}>
                            <Form.Item
                              name="zipcode"
                              label=" "
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your Zip-code!",
                                  whitespace: true,
                                },
                              ]}
                            >
                              <Input className="inputClass" />
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item
                              name="businessCategoryType"
                              label=" "
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Please input your business-category!",
                                  whitespace: true,
                                },
                              ]}
                            >
                              <Select>
                                <Option value="60">Rental</Option>
                                <Option value="61">Retail</Option>
                                <Option value="62">Flat</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>

                        <Form.Item {...tailFormItemLayout}>
                          <Row>
                            <Button
                              type="primary"
                              htmlType="submit"
                              style={{
                                marginLeft: 660,
                                background: " #2485b1",
                              }}
                              onClick={UpdateBusiness}
                            >
                              Next
                            </Button>
                          </Row>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel key="2" header={<h3>Payable To</h3>}>
              <Typography.Text>
                <PayableToForm />
              </Typography.Text>
            </Collapse.Panel>
          </Collapse>
        </div>
      </div>
    </>
  );
}
