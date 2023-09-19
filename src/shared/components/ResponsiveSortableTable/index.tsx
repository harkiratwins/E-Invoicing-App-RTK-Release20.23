import React, { useState } from "react";
import { Table, Card } from "antd";
import "./styes.css";

interface Invoice {
  key: string;
  type: string;
  invoiceNumber: string;
  customerName: string;
  amountDue: number;
  dueDate: string;
  created: string;
  paymentType: string;
}

const columns = [
  {
    title: "Invoice Number",
    dataIndex: "invoiceNumber",
    key: "invoiceNumber",
    sorter: (a: Invoice, b: Invoice) =>
      a.invoiceNumber.localeCompare(b.invoiceNumber),
  },
  {
    title: "Customer Name",
    dataIndex: "customerName",
    key: "customerName",
    sorter: (a: Invoice, b: Invoice) =>
      a.customerName.localeCompare(b.customerName),
  },
  {
    title: "Amount Due",
    dataIndex: "amountDue",
    key: "amountDue",
    sorter: (a: Invoice, b: Invoice) => a.amountDue - b.amountDue,
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "dueDate",
    sorter: (a: Invoice, b: Invoice) =>
      new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
  },
  {
    title: "Created",
    dataIndex: "created",
    key: "created",
    sorter: (a: Invoice, b: Invoice) =>
      new Date(a.created).getTime() - new Date(b.created).getTime(),
  },
  {
    title: "Payment Type",
    dataIndex: "paymentType",
    key: "paymentType",
    sorter: (a: Invoice, b: Invoice) =>
      a.paymentType.localeCompare(b.paymentType),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

const data: Invoice[] = [
  {
    key: "1",
    invoiceNumber: "INV001",
    customerName: "Invoice 1",
    type: "Latest Invoices",
    amountDue: 100,
    dueDate: "2023-09-30",
    created: "2023-09-01",
    paymentType: "Credit Card",
  },
  {
    key: "2",
    invoiceNumber: "INV002",
    customerName: "Invoice 2",
    type: "Upcoming Invoices",
    amountDue: 200,
    dueDate: "2023-09-30",
    created: "2023-09-01",
    paymentType: "Credit Card",
  },
  {
    key: "3",
    invoiceNumber: "INV003",
    customerName: "Invoice 3",
    type: "Unpaid Invoices",
    amountDue: 300,
    dueDate: "2023-09-30",
    created: "2023-09-01",
    paymentType: "Credit Card",
  },
  {
    key: "4",
    invoiceNumber: "INV001",
    customerName: "Invoice 4",
    type: "Overdue Invoices",
    amountDue: 400,
    dueDate: "2023-09-30",
    created: "2023-09-01",
    paymentType: "Credit Card",
  },
];

const ResponsiveSortableTable: React.FC<{ type: string }> = ({ type }) => {
  const [sortedInfo, setSortedInfo] = useState<any>({});

  const handleChange = (filters: any, sorter: any) => {
    setSortedInfo(sorter);
  };

  return (
    <div className="responsive-sortable-table">
      <Card className="Card1">
        <Table
          dataSource={data}
          columns={columns}
          onChange={handleChange}
          pagination={false}
          bordered
          size="middle"
          scroll={{ x: true }}
        />
      </Card>
    </div>
  );
};

export default ResponsiveSortableTable;
