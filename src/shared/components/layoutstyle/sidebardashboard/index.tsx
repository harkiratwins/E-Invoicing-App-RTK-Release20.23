import React from "react";
import {
  TeamOutlined,
  DashboardOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

import logo from "../../../../assets/images/BusinessLogo.png";

import "./styles.css";

const { Sider } = Layout;

const Sidebardashboard: React.FC = () => {
  return (
   
      <Sider trigger={null} style={{ backgroundColor: "white" }}>
        <div className="demo-logo-vertical" />
        <div className="sidebardisplay ">
          <img src={logo} alt="" className="imglogo2" />
        </div>
        <div className="imglogotop">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                label: (
                  <a
                    // onClick={() => navigate("/about")}
                    href="#!"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Dashboard
                  </a>
                ),

                key: "1",
                icon: <DashboardOutlined />,
              },
              {
                label: (
                  <a
                    // onClick={() => navigate("/contact-us")}
                    href="#!"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Invoices
                  </a>
                ),

                key: "2",
                icon: <IdcardOutlined />,
              },
              {
                label: (
                  <a
                    // onClick={() => navigate("/contact-us")}
                    href="#!"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CRM
                  </a>
                ),
                key: "3",
                icon: <TeamOutlined />,
              },
            ]}
          />
        </div>
      </Sider>
   
  );
};

export default Sidebardashboard;
