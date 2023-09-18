import React, {  useState } from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './style.css'
import {IFieldType} from'./type'
import{ useAddPostMutation} from "../../services/contact"
import { useNavigate } from 'react-router-dom';
interface aa{
  username:any,
  password:any
}

export default function Login() {
  const navigate = useNavigate()
  const [state, setstate]:any = useState<any>({
    username:"",
    password:""
  });
  const obj:any=
  {
    applicationId:3,
    businessId:89,
    emailId:state.username,
    ipAddress:null,
    password:state.password,
    refreshToken: null,
    rememberMe: false
   }
    // 
 const [data,iserror,isLoading]=useAddPostMutation();
// console.log(posts,'dataaaaa')
console.log("post",useAddPostMutation(obj))

  const [Load, setLoad] = useState(false);
  const onFinish = (values: any) => {
    console.log('Success:', values);
    setstate(values)
    data(obj)
    // setLoad(true)
    
    // postApi(values)

    navigate("/otp")

  
  };
 console.log('obfdfdfdf',obj)
  
  console.log(state,"uemsh")

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />



  return (
    <>
      {/* {!Load?<div style={{background:"grey"}}></div>: <div className="spinner-border" style={{margin:"auto",display:"flex"}}></div>} */}
      <div className="container">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"

        >

          <div className='imagedev'>
            <img className='image' src="https://easyinvoiceimage.blob.core.windows.net/easyinvoiceimage/BusinessLogo_3c1ac216-b96a-4512-97d8-f6e75bd56b68" alt="" />
          </div>
          <Form.Item<IFieldType>
            className="msg"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >

            <Input type='email' prefix={<UserOutlined className="site-form-item-icon  " />} className="Inputs" placeholder='Enter Your Username' autoComplete='on'/>
          </Form.Item>

          <Form.Item<IFieldType>
            className="msg"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password type='password' className="Inputs" placeholder='Enter Your Password' prefix={<LockOutlined className='' />} />
          </Form.Item>
          <Form.Item>
            <Row>
              <Col span={12} push={3}>

                <Button type="primary" htmlType="submit" className='btn' >
                  {
                    !Load ? <span>  Login</span> : <Spin indicator={antIcon} />}
         
                </Button>
        

              </Col>
              <Col span={12}  >
                 {/* <Modalforget/> */}
              </Col>
              
            </Row>
          </Form.Item>
          {/* </div> */}
        </Form>

      </div>


    </>


  );
}