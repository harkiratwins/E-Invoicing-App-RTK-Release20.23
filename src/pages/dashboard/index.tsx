import React, { useState } from "react";
import { Tabs } from "antd";
import { Layout } from "antd";
import "./style.css";
import { Select, Row, Col, Card, theme } from "antd";
import Headerdashboard from "../../shared/components/layoutstyle/headerdashboard";
import Sidebardashboard from "../../shared/components/layoutstyle/sidebardashboard";
import ResponsiveSortableTable from "../../shared/components/ResponsiveSortableTable";
// import Collection from "../../assets/images/collection.svg";
// import Outstanding from "../../assets/images/Outstanding.svg";
// import overdue from "../../assets/images/overdue.svg";
// import client from "../../assets/images/client.svg";

const { Content } = Layout;


const { TabPane } = Tabs;

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Latest Invoices");

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sidebardashboard />

      <Layout>
        <Headerdashboard />

        <Content
          className="contentDisplay"
          style={{
            background: colorBgContainer,
            backgroundColor: "#e7e2e2",
          }}
        >
          <div className="">
            <div className="contentDisplay1">Dashboard</div>
            <div className="contentDisplay2">
              {" "}
              <Select
                showSearch
                className="contentDisplay3"
                placeholder="Toady"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  {
                    value: "1",
                    label: "Current Year",
                  },
                  {
                    value: "2",
                    label: "Current Month",
                  },
                  {
                    value: "3",
                    label: "Current week",
                  },
                  {
                    value: "4",
                    label: "Today",
                  },
                  {
                    value: "5",
                    label: "Yesterday",
                  },
                ]}
              />
            </div>
          </div>
          <div>
            <p className="contentDisplay1">Invoice Summary</p>
          </div>

          <div className="contentDisplay4">
            <Row gutter={16}>
              <Col span={6}>
                <Card bordered={false} className="card1">
                  {/* <img src={Collection} alt="Collection" className="ui mini right floated image" /> */}
                  <div title="--" className="header1">
                    --
                  </div>
                  <div className="meta">Total Collected</div>
                </Card>
              </Col>
              <Col span={6}>
                <Card title="" bordered={false} className="card2">
                  {/* <img
                    src={Outstanding}
                    alt="pic"
                    className="CardImg right floated"
                  /> */}
                  <div title="--" className="header1">
                    --
                  </div>
                  <div className="meta">Total Outstanding</div>
                </Card>
              </Col>
              <Col span={6}>
                <Card title="" bordered={false} className="card3">
                  {/* <img
                    src={overdue}
                    alt="pic"
                    className="CardImg right floated"
                  /> */}
                  <div title="--" className="header1">
                    --
                  </div>
                  <div className="meta">Total Overdue</div>
                </Card>
              </Col>
              <Col span={6}>
                <Card title="" bordered={false} className="card4">
                  {/* <img
                    src={client}
                    alt="pic"
                    className="CardImg right floated"
                  /> */}
                  <div title="--" className="header1">
                    0.00
                  </div>
                  <div className="meta">Total Client</div>
                </Card>
              </Col>
            </Row>
          </div>
          <div style={{ padding: "20px" }}>
            <div className="invoice-card">
              <Tabs activeKey={activeTab} onChange={handleTabChange}>
                <TabPane tab="Latest Invoices" key="Latest Invoices">
                  <ResponsiveSortableTable type="latest" />
                </TabPane>
                <TabPane tab="Upcoming Invoices" key="Upcoming Invoices">
                  <ResponsiveSortableTable type="upcoming" />
                </TabPane>
                <TabPane tab="Unpaid Invoices" key="Unpaid Invoices">
                  <ResponsiveSortableTable type="unpaid" />
                </TabPane>
                <TabPane tab="Overdue Invoices" key="Overdue Invoices">
                  <ResponsiveSortableTable type="overdue" />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
