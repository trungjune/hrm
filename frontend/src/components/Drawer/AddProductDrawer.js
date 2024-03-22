import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Select, Space, Layout } from "antd";
import "./style.css";

const AddProductDrawer = ({ children, btnTitle, title }) => {
  const { Content } = Layout;
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" id="btn-addProductDrawer" onClick={showDrawer}>
        <span style={{ textAlign: "center" }}>+</span>
      </Button>
      <Drawer
        title={`Create a ${title}`}
        width={"50%"}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button id="btn-drawer" type="danger" onClick={onClose}>
              Cancel
            </Button>
          </Space>
        }>
        <Content>{children}</Content>
      </Drawer>
    </>
  );
};
export default AddProductDrawer;
