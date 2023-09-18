import { useState, useEffect } from "react";
import { usePayableQuery } from "../../../services/api-payableto-slice";
import { useGlobalcodeQuery } from "../../../services/api-profiledeatils-slice";
import { Button, Col, Form, Input, Row, Select } from "antd";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const { Option } = Select;

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

export default function PayableToForm() {
  const [form] = Form.useForm();
  const [valuee, setValuee] = useState<any>();
  const [globaldata, setGloabaldata] = useState<any>([]);

  const [test, setTest] = useState<any>({});

  const { data, error, isLoading } = usePayableQuery({
    BusinessId: 89,
  });
  const { data: stage } = useGlobalcodeQuery({
    categoryName: "",
  });

  console.log(data, "jjjjjjjjjjj");
  useEffect(() => {
    if (data) {
      setTest(data);
      data.map((x: any) => {
        return form.setFieldsValue({
          firstName: x.firstName,
          lastName: x.lastName,
          company: x.company,
          addressLine1: x.addressLine1,
          addressLine2: x.addressLine2,
          countryId: x.countryId,
          stateId: x.stateId,
          city: x.city,
          zipcode: x.zipcode,
          email: x.email,
          phone: `+${x.phone}`,
          fax: x.fax,
        });
      });
    }
  }, [data]);

  useEffect(() => {
    if (stage) {
      const y: any =
        stage && stage.filter((x: any) => x.categoryName === "States");

      setGloabaldata(y);
    }
  }, [stage]);

  return (
    <>
      <div className="profilebClass">
        <Form
          className="profileBorder formClass"
          {...formItemLayout}
          form={form}
          name="control-hooks"
          scrollToFirstError
        >
          <div className="profileClass">
            <div>
              <Row>
                <Col span={8}>
                  <Form.Item
                    name="firstName"
                    // label=" "
                    rules={[
                      {
                        required: true,
                        message: "Please input yourFirst-name!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input className="inputClass" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="lastName"
                    // label=" "
                    rules={[
                      {
                        required: true,
                        message: "Please input your Last-name!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input className="inputClass" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="company"
                    // label=" "
                    rules={[
                      {
                        required: true,
                        message: "Please input your company Name!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input className="inputClass" />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  <Form.Item
                    name="addressLine1"
                    // label=" "
                    rules={[
                      {
                        required: true,
                        message: "Please input your Address!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input className="inputClass" />
                  </Form.Item>{" "}
                </Col>

                <Col span={8}>
                  <Form.Item
                    name="addressLine2"
                    className="inputClass"
                    // label=" "
                  >
                    <Input
                      placeholder="Enter Your Address line 2"
                      className="inputClass"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="US"
                    // label=" "
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please select your country!",
                      },
                    ]}
                  >
                    <Select className="inputClass" defaultValue="US">
                      <Option value="69">US</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  <Form.Item
                    name="city"
                    // label=" "
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

                <Col span={8}>
                  <Form.Item
                    name="stateId"
                    // label=" "
                    rules={[
                      {
                        required: true,
                        message: "The State field is empty!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Select>
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
                <Col span={8}>
                  <Form.Item
                    name="zipcode"
                    // label=" "
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
              </Row>
              <Row>
                <Col span={8}>
                  <Form.Item
                    name="email"
                    // label=" "
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
                  </Form.Item>{" "}
                </Col>

                <Col span={8}>
                  <Form.Item
                    name="phone"
                    className="inputClass"
                    // label=" "
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <PhoneInput
                      className="inputClass"
                      international={false}
                      defaultCountry="US"
                      placeholder="Enter phone number"
                      value={valuee}
                      onChange={setValuee}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="fax">
                    <Input
                      placeholder="Enter your Fax number"
                      className="inputClass"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <Form.Item {...tailFormItemLayout}>
              <Row>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    marginLeft: 800,
                    background: " #2485b1",
                  }}
                >
                  Save
                </Button>
              </Row>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
}
