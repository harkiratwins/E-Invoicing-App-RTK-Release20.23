import "./styles.css";
import { useGetTeamMembersQuery } from "../../services/api-services";
import { useCreateTeamMemberMutation } from "../../services/api-services";
import { useDeleteTeamMemberMutation } from "../../services/api-services";
import { useUpdateTeamMemberMutation } from "../../services/api-services";


import AddMembers from "./add-member";

import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Button,
  Input,
  Modal,
  Col,
  Row,
  Switch,

} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";
import EditModal from "./edit-modal";

interface DataType {
  key: React.Key;
  fullName: any;
  phoneNumber: any;
  roleName: any;
  emailId: any;
  placeholder: string;
  allowClear?: boolean;
  enterButton?: string;
  size?: "small" | "middle" | "large";
  onSearch?: (value: any) => void;
  userId: any;
  isActive: boolean;
}

const { Search } = Input;

const Team = () => {
  const [TeamMemberImage, setTeamMemberImage] = useState<any>({
    UserImage: "",
  });
  const [createTeamMember] = useCreateTeamMemberMutation();
  const [deleteTeamMember] = useDeleteTeamMemberMutation();
  const [updateTeamMember] = useUpdateTeamMemberMutation();

  const [open, setOpen] = useState(false);
  const [search, setsearch] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<any>(null);
  const [EditId, setEditId] = useState<any>(null);
  const [MemberChecked, setMemberChecked] = useState<any>({

    isActive:""

  });

  const [Editmembers, setEditmembers] = useState<any>([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [deleteopen, setdeleteOpen] = useState(false);
  const [modalText, setModalText] = useState(
    "Do you want to delete this Team member ?"
  );


  const onSearch = (value: any) => setsearch(value);
  const { data, isLoading, isError, isSuccess } = useGetTeamMembersQuery({
    pageNo: 1,
    pageSize: 5,
    sortArrow: "sort",
    sortColumn: "ModifiedDate",
    searchValue: "",
    sortOrder: "desc",
    heading: "",
    hasMore: true,
    loadMoreData: true,
    UserId: -1,
    BusinessId: 89,
  });

  useEffect(() => {
    if (data) {
      setEditmembers(data);
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  console.log(Editmembers, "anand");
  console.log(data,"tyui")
  const onChangeHandler = async (checked: boolean, record: any) => {
    // const updatedData = data.map((item:any) => {
    //   if (item.id === record.id) {
    //     return { ...item, isActive: checked };
    //   }
    //   return item;
    // });

console.log(record,"checkedRecord");




    

    setMemberChecked(checked)


    // console.log( updatedData, "mahesh", checked);

    try {
      const response = await updateTeamMember({
        id: record.userId, // Resource ID to update
        data: {
          isActive: checked, 
     
        },
      });

      console.log("PUT Response:", response);
    } catch (error) {
      console.error("Error making PUT request:", error);
    }
  };

  //onchangeHandle on switch

  //editchange

  function onEditHandleChange(e: any) {
    setIsModalVisible(true);

    console.log(e, "kavin");

    const y = Editmembers.filter((x: any) => x.userId === e);
    // [...arrayOfObjects, newObj];
    const updatedData = [...y];

    console.log(updatedData, "updatedmohan");
    setEditId(updatedData);
  }

  //editchange

  // Handler for hiding the modal
  const handleOk = () => {
    setOpen(false);
    setIsModalVisible(false);
  };
  // Handler for canceling the modal
  const handleCancel = () => {
    setOpen(false);
    setdeleteOpen(false);
    setIsModalVisible(false);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "fullName",
      sorter: {
        compare: (a, b) => (a.fullName > b.fullName ? -1 : 1),
      },
    },
    {
      title: "Email",
      dataIndex: "emailId",
      sorter: {
        compare: (a, b) => (a.emailId > b.emailId ? -1 : 1),
      },
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      sorter: {
        compare: (a, b) => a.phoneNumber - b.phoneNumber,
        multiple: 4,
      },
    },
    {
      title: "Roles",
      dataIndex: "roleName",
      sorter: {
        compare: (a, b) => (a.roleName > b.roleName ? -1 : 1),
      },
    },

    {
      title: "Active/Inactive",
      dataIndex: "isActive",
      render: (isActive, record) => {
    
        //  const externalValue =data.find((item:any )=> item.userId === record.userId);
        // // data&&data.map((x:any)=>x.isActive)
        console.log(isActive,"active")
     
        return (
          <Space>
            <Switch
              // defaultChecked={record.isActive}
              defaultChecked={isActive}
              onChange={(checked) => onChangeHandler(checked, record)}
            />
          </Space>
        );
      },
    },

    {
      title: "Actions",
      dataIndex: "actions",

      render: (text, record) => {
        console.log(record, "record");
        return (
          <Space>
            <EditOutlined
              // onClick={showModal}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              onClick={() => onEditHandleChange(record.userId)}
            />
            <DeleteOutlined onClick={() => onDeleteChange(record.userId)} />
          </Space>
        );
      },
    },
  ];

  //using table

  //delete function

  const onDeleteChange = (id: any) => {
    console.log(id, "id");
    setSelectedId(id);
    setdeleteOpen(true);
    // setSelectedId(id);
    // showModal
  };
  //delete function

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  console.log(data, "mohan");

  // geteData

  console.log(Editmembers, "Editmembersssssssssssssssssssssssssss");

  // const handleCancel = () => {
  //   console.log("Clicked cancel button");
  //   setdeleteOpen(false);
  // };

  const handleOkk = async (selectedId: any) => {
    console.log(selectedId, "selectedMohan");

    try {
      const response = await deleteTeamMember(selectedId);

      console.log("DELETE Response:", response);
    } catch (error) {
      console.error("Error making DELETE request:", error);
    }

    setdeleteOpen(false);

    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);

    console.log("mohan rohan");
  };

  const onFinish = async (values: any) => {
    console.log(values, "hjgfgghgj");
    setOpen(false);
    const ExtraData = {
      UserId: null,
      ApplicationId: 3,
      BusinessId: 89,
      BusinessLocationId: 1,
      Address: "",
      StateId: null,
      City: "",
      Country: null,
      RoleId: 194,
      ZipCode: null,
      ActionPerformedBy: "summer@yopmail.com",
      ImageId: 0,
      IsImageUpdated: true,
    };

    const AppData = { ...values,...TeamMemberImage,...ExtraData };

    const formData: any = new FormData();

    Object.entries(AppData).forEach(([key, val]) => {
      formData.append(key, val);
    });

    try {
      const response = await createTeamMember(formData);

      console.log("POST Response:", response);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };


function Aise(){
  useGetTeamMembersQuery({


    pageNo: 1,
    pageSize: 5,
    sortArrow: "sort",
    sortColumn: "ModifiedDate",
    searchValue: "",
    sortOrder: "desc",
    heading: "",
    hasMore: true,
    loadMoreData: true,
    UserId: -1,
    BusinessId: 89,
  }


  );
}
 

  return (
    <>
      <AddMembers
        visible={open}
        onOk={handleOk}
        onCancel={handleCancel}
        onFinish={onFinish}
        setTeamMemberImage={setTeamMemberImage}
        TeamMemberImage={TeamMemberImage}
      />

  
      <Modal
        title="Title"
        open={deleteopen}
        onOk={() => handleOkk(selectedId)}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>

      <EditModal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        EditId={EditId}
      />

      <div style={{ backgroundColor: "#f9f9f9" }}>
        <Row justify="end">
          <Col span={12} style={{ padding: "10px" }}>
            <h3>Team</h3>
          </Col>
          <Col
            span={12}
            style={{ textAlign: "end", marginTop: "15px", padding: "10px" }}
          >
            {" "}
            <Button style={{ backgroundColor: "grey", color: "white" }}>
              back
            </Button>{" "}
            <Button
              className="rdx"
              style={{ backgroundColor: "#2485b1", color: "white" }}
              onClick={() => setOpen(true)}
            >
              {" "}
              + Add Member
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Search
              placeholder="input search text"
              allowClear
              onSearch={onSearch}
              style={{ width: 200 }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ marginTop: "15px" }}>
            <Table columns={columns} dataSource={data} onChange={onChange} />;
          </Col>
        </Row>
     
      </div>
     
    </>
  );
};

export default Team;
