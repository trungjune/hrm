import { Button, Col, Form, Input, Row, Typography } from "antd";

import React, { Fragment, useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
	addSingleTaskPriority,
	loadAllTaskPriority,
} from "../../../redux/rtk/features/projectManagement/project/taskPriority/taskPriority";

const AddTaskPriority = (props) => {
	const [loader, setLoader] = useState(false);
	const { loading, list } = useSelector((state) => state.taskPriority);

	const dispatch = useDispatch();

	const { Title } = Typography;
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		const taskPriorityData = {
			...values,
		};

		setLoader(true);
		const resp = await dispatch(addSingleTaskPriority(taskPriorityData));

		if (resp.payload.message === "success") {
			setLoader(false);
			form.resetFields();
			dispatch(loadAllTaskPriority());
			props.list = list;
			props.loading = loading;
		} else {
			setLoader(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding TaskPriority");
		setLoader(false);
	};
	return (
		<Fragment bordered={false}>
			{/* <UserPrivateComponent permission={"create-leaveApplication"}> */}
			<Row className='mr-top' justify={"center"}>
				<Col
					xs={24}
					sm={24}
					md={24}
					lg={22}
					xl={22}
					className='column-design border rounded card-custom'>
					<Title level={4} className='m-2 mt-5 mb-5 text-center'>
						Add TaskPriority
					</Title>
					<Form
						form={form}
						style={{ marginBottom: "40px" }}
						eventKey='shift-form'
						name='basic'
						labelCol={{
							span: 8,
						}}
						wrapperCol={{
							span: 12,
						}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete='off'>
						<div>
							<Form.Item
								style={{ marginBottom: "10px" }}
								label='TaskPriority Name'
								name='name'
								rules={[
									{
										required: true,
										message: "Enter TaskPriority Name",
									},
								]}>
								<Input placeholder='Enter TaskPriority Name' />
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "10px" }}
								wrapperCol={{
									offset: 8,
									span: 12,
								}}>
								<Button
									onClick={() => setLoader(true)}
									type='primary'
									size='large'
									htmlType='submit'
									block
									loading={loader}>
									Submit
								</Button>
							</Form.Item>
						</div>
					</Form>
				</Col>
			</Row>
			{/* </UserPrivateComponent> */}
		</Fragment>
	);
};

export default AddTaskPriority;
