import React, { useState } from "react";
import { Button, Modal, Row, Col, Radio, Form, Input } from "antd";
import { CheckCircleOutlined, CopyOutlined } from "@ant-design/icons";
import type { RadioChangeEvent } from "antd";
import "./index.css";
// import { useEditroleQuery } from "../../../services/invoiceApi";
import { useEditroleQuery } from "../../services/api-invoice-role";
const CreateModal = ({ post }: { post: any }) => {
  const [open, setOpen] = useState(false);
  const [editRole, setEditRole] = useState<any[]>([]);
  const [editModal, setEditModal] = useState(false);
  const [postData, setPostData] = useState<any>();
  const { data, error, isLoading, isFetching, isSuccess } = useEditroleQuery({
    roleId: "368",
    businessId: "89",
  });
  console.log(data, "--datapost----------");

  //   console.log(editRole, "editrole----");
  const handleChange = (e: RadioChangeEvent) => {
    console.log(e.target.value);
    const postvalue = post.find((ele: any) => ele.roleId === e.target.value);
    console.log(postvalue, "---postvalue----");
    setPostData(postvalue);
    setEditRole(
      data.map((ele: any) => {
        return {
          ...ele,
          permissions: ele.permissions
            ? JSON.parse(ele.permissions).map((item: any) => {
                return {
                  ...item,
                  Action: item.Action ? JSON.parse(item.Action) : [],
                };
              })
            : [],
        };
      })
    );
    // const { data, error, isLoading, isFetching, isSuccess } = useEditroleQuery({
    //     roleId: e.target.value,
    //     businessId: "89",
    //   });
  };
  console.log(editRole, "---eeeee---");
  const openEditModal = () => {
    setEditModal(true);
    setOpen(false);
  };
  function handleChange1(e: any): void {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  }

  const openPermissions=()=>{
    setEditModal(false);
  }

  return (
    <>
      {/* <EditOutlined onClick={()=>setOpen(true)} /> */}
      <Button className="customRole" onClick={() => setOpen(true)}>
        Custom Role
      </Button>
      <Modal
        title="Create Role"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={[
          <Button key="submit" type="primary" onClick={openEditModal}>
            Continue
          </Button>,
        ]}
      >
        <hr className="horizontal" />
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3 style={{ color: "#2485b1" }}>Select Role</h3>
          <CheckCircleOutlined style={{ marginLeft: "10px" }} />
          <div className="select"></div>
          <h3 style={{ marginLeft: "10px" }}>Describe Role</h3>
          <CheckCircleOutlined style={{ marginLeft: "10px" }} />
          <div className="describe"></div>
          <h3 style={{ marginLeft: "10px" }}>Permissions</h3>
          <CheckCircleOutlined style={{ marginLeft: "10px" }} />
        </div>
        <Row>
          <Col span={8}>
            <h3 style={{ fontWeight: "300" }}>Select a Role</h3>
            <div className="radioBox">
              <Radio.Group
                onChange={handleChange}
                //  value={ele?.check}
                options={post}
              />
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ fontWeight: "300", color: "blue" }}>
                Click clone to create new role
              </h3>

              <CopyOutlined style={{ opacity: "0.4" }} />
              <br />
              <CopyOutlined style={{ opacity: "0.4" }} />
              <br />
              <CopyOutlined style={{ opacity: "0.4" }} />
              <br />
              <CopyOutlined style={{ opacity: "0.4" }} />
              <br />
            </div>
          </Col>

          <Col span={8}>
            {/* {/* {loading  ? <Spin indicator={antIcon} />: */}
            <div style={{ width: "100%", height: "400px", overflow: "auto" }}>
              {editRole.map((ele: any) => {
                return (
                  <>
                    <div>
                      <div style={{ marginTop: "10px", fontWeight: "bold" }}>
                        {ele?.moduleName}
                      </div>
                      <hr />
                      {ele?.permissions.map((_ele: any) => {
                        return (
                          <>
                            <div>{_ele.ScreenName}</div>
                          </>
                        );
                      })}
                    </div>
                  </>
                );
              })}
            </div>
          </Col>
        </Row>
      </Modal>
      <Modal
        title="Edit Role"
        centered
        open={editModal}
        onOk={() => setEditModal(false)}
        onCancel={() => setEditModal(false)}
        width={1000}
        footer={[
          <Button
            key="submit"
            type="primary"
              onClick={openPermissions}
          >
            Save
          </Button>,
        ]}
      >
        <hr />
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3>Select Role</h3>
          <CheckCircleOutlined style={{ marginLeft: "10px" }} />
          <div
            style={{
              width: "250px",
              height: "0px",
              border: "1px solid black",
              marginLeft: "10px",
              opacity: "0.1",
            }}
          ></div>
          <h3 style={{ marginLeft: "10px", color: "#2485b1" }}>
            Describe Role
          </h3>
          <CheckCircleOutlined style={{ marginLeft: "10px" }} />
          <div
            style={{
              width: "250px",
              height: "0px",
              border: "1px solid black",
              marginLeft: "10px",
              opacity: "0.1",
            }}
          ></div>
          <h3 style={{ marginLeft: "10px" }}>Permissions</h3>
          <CheckCircleOutlined style={{ marginLeft: "10px" }} />
        </div>
        <Form>
          <Input
            type="text"
            onChange={handleChange1}
            name="roleName"
            value={editModal ? postData?.roleName : ""}
          />
          <Input.TextArea
            name="roleDescription"
            value={editModal ? postData?.roleDescription : ""}
            style={{ marginTop: "30px" }}
            onChange={handleChange1}
          />
        </Form>
      </Modal>
    </>
  );
};

export default CreateModal;
