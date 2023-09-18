import React, { useState } from "react";
import { Button, Modal, Checkbox,Spin } from "antd";
import { EditOutlined, CheckCircleOutlined, LoadingOutlined, } from "@ant-design/icons";
import "./edit.css";

import { useEditroleQuery } from "../../services/api-invoice-role";
const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

const EditModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [editRole, setEditRole] = useState<any[]>([]);
  const [loader,setLoader]=useState(false);
  const { data, error, isLoading, isFetching, isSuccess} = useEditroleQuery({
    roleId: "368",
    businessId: "89",
  });
  console.log(data, "--data----------");
  const onSaveItem1 = () => {
    setLoader(true)
    if (isSuccess) {
       setLoader(false);
      setOpen(true);
      setEditRole(
        data.map((item: any) => {
          return {
            ...item,
            Permissions: item.permissions
              ? JSON.parse(item.permissions).map((_item: any) => {
                  return {
                    ..._item,
                    Action: _item.Action ? JSON.parse(_item.Action) : [],
                  };
                })
              : [],
          };
        })
      );
    }
  };
  console.log(editRole, "editrole----");
  return (
    <>
      <EditOutlined onClick={onSaveItem1} />
      <Modal
        title="Edit Role"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={[
          <Button key="submit" type="primary">
            Save
            {/* //  onClick={addUpdateRoles} */}
          </Button>,
        ]}
      >
        <hr className="horizontal" />
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3>Select Role</h3>
          <CheckCircleOutlined style={{ marginLeft: "10px" }} />
          <div className="select"></div>
          <h3 style={{ marginLeft: "10px" }}>Describe Role</h3>
          <CheckCircleOutlined style={{ marginLeft: "10px" }} />
          <div className="describe"></div>
          <h3 style={{ marginLeft: "10px", color: "#2485b1" }}>Permissions</h3>
          <CheckCircleOutlined style={{ marginLeft: "10px" }} />
        </div>
        <div className="permission">
          <h2>Permissions</h2>
          {loader ? (<div style={{display:"flex",justifyContent:'center'}}><Spin  style={{marginLeft:'40px'}} indicator={antIcon} /></div>):("")}
          <div>
            {editRole.map((item: any, id: any) => {
              return (
                <>
                  <div style={{ marginTop: "5px" }}>
                    <Checkbox
                      //   onChange={(e) => onChangeCheck(e, id)}
                      //  defaultChecked = {item?.access}
                      checked={item?.access}
                      value={item?.access}
                      name={item.moduleName}
                    >
                      {item?.moduleName}
                    </Checkbox>

                    {item?.Permissions?.map((_item: any, _id: any) => {
                      return (
                        <>
                          <div style={{ marginLeft: "20px", marginTop: "8px" }}>
                            <Checkbox
                              //   onChange={(e) => onChangeCheck1(e, id, _id)}
                              value={_item.Access}
                              checked={_item.Access}
                              name={_item?.ScreenName}
                              // label={_item.ScreenName}
                              //  defaultChecked={_item.Access}
                            >
                              {_item?.ScreenName}
                            </Checkbox>
                            {_item.Action
                              ? _item.Action.map((ele: any, eId: any) => {
                                  return (
                                    <>
                                      <div style={{ marginLeft: "30px" }}>
                                        <Checkbox
                                          style={{ marginTop: "10px" }}
                                          // defaultChecked={ele?.Access}
                                          value={ele.Access}
                                          checked={ele.Access}
                                          name={ele?.ActionName}
                                          //   onChange={(e) =>
                                          //     onChangeActionCheck(e, id, _id, eId)
                                          //   }
                                        >
                                          {ele?.ActionName}
                                        </Checkbox>
                                      </div>
                                    </>
                                  );
                                })
                              : ""}
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditModal;
