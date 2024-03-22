import { Button, Col, Form, Input, Row, Typography } from "antd";

import React, { Fragment, useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../page-header/PageHeader";
import {
	clearTaskStatus,
	loadAllTaskStatus,
	loadSingleTaskStatus,
	updateTaskStatus,
} from "../../../redux/rtk/features/projectManagement/project/taskStatus/taskStatus";
import Loader from "../../loader/loader";

const UpdateTaskStatus = () => {
	const [loader, setLoader] = useState(false);
	const [initialValues, setInitialValues] = useState(null);

	const { loading, taskStatus } = useSelector((state) => state.taskStatus);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadSingleTaskStatus(id));
		return () => {
			dispatch(clearTaskStatus());
			setInitialValues(null);
		};
	}, []);

	useEffect(() => {
		if (taskStatus) {
			setInitialValues(taskStatus);
		}
	}, [taskStatus]);

	const { Title } = Typography;
	const [form] = Form.useForm();
	const { id } = useParams("id");
	const navigate = useNavigate();

	const onFinish = async (values) => {
		const taskStatusData = {
			...values,
		};

		setLoader(true);
		const resp = await dispatch(
			updateTaskStatus({ id, values: taskStatusData })
		);

		if (resp.payload.message === "success") {
			setLoader(false);
			form.resetFields();
			dispatch(loadAllTaskStatus());
			navigate(-1);
		} else {
			setLoader(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding TaskStatus");
		setLoader(false);
	};
	return (
		<Fragment bordered={false}>
			{/* <UserPrivateComponent permission={"create-leaveApplication"}> */}
			<PageTitle title='Back' />
			<Row className='mr-top'>
				<Col
					xs={24}
					sm={24}
					md={24}
					lg={18}
					xl={16}
					className='column-design border rounded card-custom'>
					<Title level={4} className='m-2 mt-5 mb-5 text-center'>
						Update Task Status Column
					</Title>
					{initialValues ? (
						<Form
							form={form}
							style={{ marginBottom: "40px" }}
							eventKey='shift-form'
							name='basic'
							initialValues={initialValues}
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
									style={{ marginBottom: "20px" }}
									label='Task Status Name'
									name='name'
									rules={[
										{
											required: true,
											message: "Enter Task Status Name",
										},
									]}>
									<Input placeholder='Enter Task Status Name' />
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
										Update Now
									</Button>
								</Form.Item>
							</div>
						</Form>
					) : (
						<Loader />
					)}
				</Col>
			</Row>
			{/* </UserPrivateComponent> */}
		</Fragment>
	);
};

export default UpdateTaskStatus;
