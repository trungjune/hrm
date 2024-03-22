import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Select, Space, Layout } from "antd";
import "./style.css";

const BigDrawer = ({ children, btnTitle, title }) => {
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
			<Button
				type='primary'
				id='btn-drawer'
				onClick={showDrawer}
				icon={<PlusOutlined />}>
				{btnTitle}
			</Button>
			<Drawer
				title={`Create a ${title}`}
				width={"40%"}
				onClose={onClose}
				open={open}
				bodyStyle={{
					paddingBottom: 80,
				}}
				extra={
					<Space>
						<Button id='btn-drawer' type='danger' onClick={onClose}>
							Cancel
						</Button>
					</Space>
				}>
				<Content>{children}</Content>
			</Drawer>
		</>
	);
};
export default BigDrawer;
