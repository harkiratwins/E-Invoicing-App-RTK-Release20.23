import React from "react";
import {useState,useEffect} from 'react';
import { Col, Row, Button, Input, Table, Space,Spin } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import {
  DeleteOutlined,
  
} from "@ant-design/icons";
import "./index.css";

import { useContactsQuery } from "../../services/api-invoice-role";
import EditModal from "../modal/edit-role-modal";
import CreateModal from "../create-modal";

const { Search } = Input;
interface DataType {
  roleId: any;
  key: React.Key;
  roleName: any;
  roleDescription: any;
}
const RolesPermissions = () => {
  const[post,setPost]=useState<any>([]);
  const[search,setSearch]=useState("");
 
  const {data,error,isLoading,isFetching,isSuccess}=useContactsQuery({
    pageNo:"1",
    pageSize:"5",
    sortArrow:"sort",
    sortColumn:"ModifiedDate",
    searchValue:search,
    sortOrder:"desc",
    heading:"",
    hasMore: "true",
    loadMoreData: "true",
    roleId:"-1",
    BusinessId:"89"

  });
  console.log(data,'--data--')
  const columns: ColumnsType<DataType> = [
    {
      title: "Role",
      dataIndex: "roleName",
      sorter: {
        compare: (a, b) => (a.roleName > b.roleName ? -1 : 1),
        multiple: 3,
      },
    },
    {
      title: "Role Description",
      dataIndex: "roleDescription",
      sorter: {
        compare: (a, b) => (a.roleDescription > b.roleDescription ? -1 : 1),
        multiple: 3,
      },
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (text, record) => {
        const roleId = record.roleId;
        return (
          <Space>
            <EditModal/>
            {/* <EditOutlined */}
            {/* // onClick={onSaveItem1} */}
            {/* /> */}
            <DeleteOutlined
            // onClick={() => onDeleteItem(roleId)}
            />
          </Space>
        );
      },
    },
  ];
      useEffect(() => {
        if (isSuccess) {
          setPost(data.map((item:any)=>{
            return {
              ...item,
                label: item?.roleName,
                value: item?.roleId,
                item: item,
            }
          }));
        }
      }, [isSuccess, data,search]);
      const onSearch = (value: any) => setSearch(value);

      //  const AddContact=async()=>{
      //   const [addContact]=useAddContactMutation();
      //   const{refetch}=useContactsQuery();
      //   const contact={
      //     "id":"3",
      //     "name":"Anand",
      //     "email":"anand@gmail.com"

      //   }
      // }
      console.log(post,'----post12------')
    

  return (
    <>
      <div className="roles">
        <Row>
          <Col span={12}>
            <h1 className="heading">Roles & Permissions</h1>
          </Col>
          <Col span={12}>
            <div className="buttons">
              <Button className="back">Back</Button>
              <CreateModal post={post} />
            </div>
          </Col>
        </Row>

        <div className="searchValue">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: "400px", height: "150px" }}
            size="large"
          />
        </div>
        <Table
          columns={columns}
          dataSource={post}
          // onChange={onChange}
        />
        
      </div>
    </>
  );
};
export default RolesPermissions;
