import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Row, Col, Space, Table, Switch } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
  useContactsQuery,
  usePostMutation,
} from '../../services/contactsApi';
import type { TableProps } from 'antd';
import type { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';

interface DataType {
  itemname: string;
  itemDescription: string;
  price: number;
  isActive: boolean;
}

export interface Post {
  id: number
  name: string
}


type data = Object[] | Object;
const Catalogue = () => {
  const [dataSource, setDataSource] = useState<any>([]);
  const [dataSources, setDataSources] = useState<any>([]);
  const { data, error, isLoading, isSuccess } = useContactsQuery();
  const [updatePost, result] = usePostMutation()
  console.log('result',result)
  useEffect(() => {
    if (data) {
      setDataSource(data);
    }
  }, [isSuccess, data]);

  const onFinish = (values: any) => {
    console.log('Success:', values);
   
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Item Name',
      dataIndex: 'itemname',
      key: 'itemname',
    },
    {
      title: 'Item Description',
      dataIndex: 'itemDescription',
      key: 'itemDescription',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Active/Inactive',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Switch checked={isActive} checkedChildren="Active" unCheckedChildren="Inactive" />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'tag',
      key: 'tag',
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <Button>Edit {record.itemname}</Button>
          <Button>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="mainData">
        <div className="row leftside">
          <div className="heading" style={{ paddingLeft: '5px' }}>
            <h3>Catalogue</h3>
          </div>
          <div className="right" style={{ padding: '21px 10px' }}>
            <Button className="buttn">Back</Button>
          </div>
        </div>
        <div className="container">
          <Form
            name="basic"
            style={{ margin: 'auto', alignItems: 'center', textAlign: 'center' }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Row gutter={[16, 16]}>
              <Col span={10}>
                <Form.Item
                  name="itemname"
                  rules={[{ required: true, message: 'Please input item name!' }]}
                >
                  <Input placeholder="Item Name" style={{ height: '40px' }} />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name="itemDescription"
                  rules={[{ required: true, message: 'Please input item description!' }]}
                >
                  <Input placeholder="Item Description" style={{ height: '40px' }} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  name="price"
                  rules={[{ required: true, message: 'Please input price!' }]}
                >
                  <Input placeholder="Price" style={{ height: '40px' }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ float: 'right', padding: '0px 25px', fontWeight: 'bold' }}>
                    Save
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Space style={{ marginBottom: 16, float: 'left' }}>
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              size="large"
              // Add your search functionality here
            />
          </Space>
          <Table
            style={{
              border: '3px solid black',
              height: '300px',
              overflow: 'scroll',
            }}
            columns={columns}
            dataSource={dataSource}
          />
        </div>
      </div>
    </>
  );
};

export default Catalogue;
