import React, { useState } from "react";
import './styles.css'
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { CaretRightOutlined } from "@ant-design/icons";
// import { useGetTeamMembersQuery } from "../../api/api-services";

import {
  Form,
  Button,
  Input,
  Modal,
  Col,
  Row,
  Switch,
  Select,
  Collapse,
  Typography,
} from "antd";

// Define an interface for the props
interface EditModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  onFinish: (values: any) => void;
  setTeamMemberImage: any;
  TeamMemberImage: any;
}
type FieldType = {
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  emailId?: string;
  phoneNumber?: string;
};

const AddMembers: React.FC<EditModalProps> = ({
  visible,
  onCancel,
  onFinish,
  setTeamMemberImage,
  TeamMemberImage,
}) => {
  //to get Formdata
  const [form] = Form.useForm();
  //to get Formdata

  const [isActive, setIsActive] = useState<any>(false);
  const [ImageShow, setImageShow] = useState<any>({
    UserImage: "",
  });

  const [value, setValue] = useState();

  const handleSwitchChange = (checked: any) => {
    // console.log(checked,"checked",EditId[0].isActive
    // )
    setIsActive(checked);
  };
  //for image show and change

  function handleChange(e: any) {
    console.log(e.target.files[0], "yui");
    setTeamMemberImage({
      UserImage: e.target.files[0],
    });
    setImageShow(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
      <Modal
        // title="Vertically centered modal dialog"
        centered
        visible={visible}
        //onOk={onFinish}
        width={1000}
        onCancel={onCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          form={form}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row>
            <Col span={8}>
              <Form.Item>
                <img src={ImageShow} alt="userImage" />

                <div>
                  <input
                    className="ellipsis"
                    accept="image/*"
                    type="file"
                    onChange={handleChange}
                  />
                </div>
                <span>Browse Image</span>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Row>
                <Col span={12}>
                  <Form.Item<FieldType>
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="FirstName" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<FieldType>
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your LastName!",
                      },
                    ]}
                  >
                    <Input placeholder="LastName" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item<FieldType>
                    name="emailId"
                    rules={[
                      {
                        required: true,
                        message: "Please input your EmailId!",
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<FieldType>
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },

                      // {
                      //     pattern: /^[0-9]*$/, // Use a regular expression to allow only numeric values
                      //     message: "Please enter a valid phone number (numeric only).",
                      //   },
                    ]}
                  >
                    <PhoneInput
                      international
                      defaultCountry="US"
                      value={value}
                      onChange={() => setValue}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="IsActive">
                    <Switch checked={isActive} onChange={handleSwitchChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="RoleId">
                    <Select>
                      <Select.Option value="265">Demo</Select.Option>
                      <Select.Option value="197">memo</Select.Option>
                      <Select.Option value="198">semo</Select.Option>
                      <Select.Option value="193">cemo</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Collapse
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                  >
                    <Collapse.Panel key={1} header="Password">
                      <Typography>jhrdgfhjkl</Typography>

                      <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input.Password />
                      </Form.Item>

                      <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Please confirm your password!",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error(
                                  "The new password that you entered do not match!"
                                )
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                    </Collapse.Panel>
                  </Collapse>
                </Col>
              </Row>
            </Col>
          </Row>
          <Form.Item>
            <Button key="cancle" type="primary" onClick={onCancel}>
              cancle
            </Button>
            ,
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              onClick={onFinish}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddMembers;
