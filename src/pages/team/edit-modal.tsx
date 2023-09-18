import React, { useState, useEffect } from "react";
import "./styles.css";
import { useCreateTeamMemberMutation } from "../../services/api-services";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
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
} from "antd";

// Define an interface for the props
interface EditModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  EditId: any;
}
type FieldType = {
  UserImage?: string;
  Password?: string;
  FirstName?: string;
  LastName?: string;
  EmailId?: string;
  PhoneNumber?: string;
  IsActive?: boolean;
};

const EditModal: React.FC<EditModalProps> = ({
  visible,
  onOk,
  onCancel,
  EditId,
}) => {
  const [form] = Form.useForm();
  const [isActive, setIsActive] = useState<any>({
    IsActive: false,
  });
  const [createTeamMember] = useCreateTeamMemberMutation();
  const [value, setValue] = useState();
  const [ImageChange, setImageChange] = useState<any>({
    UserImage: "",
  });

  console.log(ImageChange, isActive, "shiva");

  //set into input field
  useEffect(() => {
    if (EditId) {
      form.setFieldsValue({
        FirstName: EditId[0]?.firstName,
        LastName: EditId[0]?.lastName,
        EmailId: EditId[0]?.emailId,
        PhoneNumber: EditId[0]?.phoneNumber,
        IsActive: EditId[0]?.isActive,
        RoleId: EditId[0]?.roleId,
        UserImage: EditId[0]?.userImage,
      });
    }
  }, [EditId, form]);

  //set into input field
  const onFinish = async (values: any) => {
    const extraData = {
      isImageUpdated: true,
      ApplicationId: 3,
      BusinessId: 89,
      BusinessLocationId: 1,

      ImageId: 0,
      PhoneNumber: 18645644538,
      Address: "",

      StateId: null,
      City: "",
      Country: null,
      RoleId: 194,
      Password: "",
      confirmPassword: "",
      ZipCode: null,
      ActionPerformedBy: "summer@yopmail.com",
      UserId: 467,
    };

    const modalFormData = {
      ...values,
      ...ImageChange,
      ...isActive,
      ...extraData,
    };

    console.log(modalFormData, "modalFormData");
    const formData: any = new FormData();

    Object.entries(modalFormData).forEach(([key, val]) => {
      formData.append(key, val);
    });
    try {
      const response = await createTeamMember(formData);

      console.log("POST Response:", response);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  const handleSwitchChange = (checked: any) => {
    // console.log(checked,"checked",EditId[0].isActive
    // )
    setIsActive({ IsActive: checked });
  };

  function handleImageChange(e: any) {
    URL.createObjectURL(e.target.files[0]);

    setImageChange({ UserImage: EditId[0]?.userImage });
  }

  return (
    <>
      <Modal
        title="Vertically centered modal dialog"
        centered
        visible={visible}
        onOk={onOk}
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
                 <img
                  src={`https://easyinvoiceimage.blob.core.windows.net/easyinvoiceimage/${
                    EditId && EditId[0]?.userImage
                  }`}
                  alt="userImage"
                />

                <input
                  type="file"
                  id="profilePic"
                  className="ellipsis"
                  onChange={handleImageChange}
                  alt="User Image"
                  accept="image/*"
                />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Row>
                <Col span={12}>
                  <Form.Item<FieldType>
                    name="FirstName"
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
                    name="LastName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
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
                    name="EmailId"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<FieldType>
                    name="PhoneNumber"
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
            </Col>
          </Row>
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
            add
          </Button>
          ,
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
