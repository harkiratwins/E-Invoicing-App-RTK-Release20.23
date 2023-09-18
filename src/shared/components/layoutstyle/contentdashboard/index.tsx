import React from "react";
import { Layout } from "antd";
import "./style.css";
import { theme } from "antd";

const { Content } = Layout;

const Contentdashboard: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Content
      className="contentDisplay"
      style={{
        background: colorBgContainer,
      }}
    >
      
    </Content>
  );
};

export default Contentdashboard;
