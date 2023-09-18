import React, { useState, useEffect } from "react";

import { useGetNotificationQuery } from "../../../../services/invoice-api";
import {
  PlusOutlined,
  BellOutlined,
  DownOutlined,
  SettingOutlined,
  LogoutOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Layout, Modal } from "antd";
import { Dropdown, Space } from "antd";
import { Form, Input } from "antd";
import type { MenuProps } from "antd";

import adminpic from "../../../../assets/images/adminpic.jpg";
import "./style.css";

const { Header } = Layout;

const Headerdashboard: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    form.resetFields();
    console.log("Received values of form: ", values);
  };

  // ************************GET API*****************************//
  const [test, setValue] = useState<any>({});

  const { data, isLoading, isError } = useGetNotificationQuery({
    UserId: "474",
    pageNo: " 1",
    pageSize: "100",
    SearchValue: "",
    SortColumn: "",
    SortOrder: "",
  });

  useEffect(() => {
    if (data) {
      const menuItems = data?.map((item: any, index: number) => {
        return {
          label: item.notification,
          key: index + 1,
        };
      });
      setValue(menuItems);
    }
  }, [data]);
  console.log(data, "turyjd");

  //*************************End GET API******************************//

  // const apiCallPASS=()=>{
  //   try {
  //     const response = await useUpdateChangePasswordMutation({
  //       id: record.userId, // Resource ID to update
  //       data: {
  //         isActive: checked, // Updated data
  //         // Add other updated data fields as needed
  //       },
  //     });
  // }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const items: MenuProps["items"] = [
    {
      label: (
        <a
          href="https://www.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          User Settings
        </a>
      ),
      key: "1",
      icon: <SettingOutlined />,
    },
    {
      label: "Change Password",
      key: "2",
      icon: <SyncOutlined />,
    },
    {
      label: (
        <a
          href="https://ssl.easyinvoicing.app/dashboard"
          target="_blank"
          rel="noopener noreferrer"
        >
          Log Out
        </a>
      ),
      key: "3",
      icon: <LogoutOutlined />,
    },
  ];

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
    }, 3000);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancelm = () => {
    setIsModalOpen(false);
  };

  const menuProps2 = {
    items: items,
    onClick: showModal,
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const menuProps = {
    items: test,
  };

  return (
    <Header className="headerD">
      <div className="header">
        <div className="topHeader">
          <div className="hDispay">
            <ul className="hDispay1">
              <li className="hDispay2">
                <Button
                  className="btn btnAdd"
                  type="primary"
                  icon={<PlusOutlined style={{}} />}
                >
                  Add Customer
                </Button>
              </li>
              <br></br>
              <li className="hDispay3">
                <Button
                  className="btn btnAdd"
                  type="primary"
                  icon={<PlusOutlined />}
                >
                  Create Invoice
                </Button>
              </li>
              <br></br>
              <li className="hDispay2">
                <div className="hDispay4">
                  <Dropdown
                    className="belldropdown"
                    menu={menuProps}
                    trigger={["click"]}
                  >
                    <a href="!#" onClick={(e) => e.preventDefault()}>
                      <Space>
                        <BellOutlined className="iconbell" />
                      </Space>
                    </a>
                  </Dropdown>
                </div>
              </li>

              <Modal
                title="Change Password"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancelm}
                footer={null}
                style={{width:"200px"}}
              >
                <Form
                  layout="vertical"
                  form={form}
                  name="register"
                  onFinish={onFinish}
                  // style={{ maxWidth: 00 }}
                  scrollToFirstError
                >
                  <Form.Item
                   className="Modalinput"
                    name="OldPassword"
                    label="Old Password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your  old password!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                   
                    name="NewPassword"
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
                   
                    name="ConfirmPassword"
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
                            getFieldValue("NewPassword") === value
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
                  <Form.Item {...tailFormItemLayout} 
                 
                  >
                    <Button
                     //className="btn1" 
                     onClick={handleCancelm}
                    style={{display:'inline-block',marginLeft:'70px',marginRight:'10px'}}
                    >
                      Cancel
                      
                    </Button>

                    <Button
                    style={{display:'inline-block' }}
                      type="primary"
                      htmlType="submit"
                     // className="btn1"
                      // onClick={apiCallPASS}
                    >
                      Update
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
              <li className="hDispay2">
                <div className="Adminp">
                  <p className="text1">Admin</p>
                </div>
              </li>
              <li className="hDispay3">
                <div>
                  <img src={adminpic} alt="logo" className="adminLogo" />
                </div>
              </li>
              <li className="hDispay2">
                {" "}
                <div>
                  <Dropdown menu={menuProps2}>
                    <a href="#!" onClick={(e) => e.preventDefault()}>
                      <Space>
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default Headerdashboard;
