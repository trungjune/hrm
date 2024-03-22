import { Button, Col, Form, Input, Row, Typography } from "antd";

import React, { Fragment, useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../page-header/PageHeader";
import { updateTaskStatus } from "../../../redux/rtk/features/projectManagement/project/taskStatus/taskStatus";
import Loader from "../../loader/loader";
import {
	clearTaskPriority,
	loadAllTaskPriority,
	loadSingleTaskPriority,
	updateTaskPriority,
} from "../../../redux/rtk/features/projectManagement/project/taskPriority/taskPriority";

const UpdateTaskPriority = () => {
	const [loader, setLoader] = useState(false);
	const [initialValues, setInitialValues] = useState(null);

	const { loading, taskPriority } = useSelector((state) => state.taskPriority);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadSingleTaskPriority(id));

		return () => {
			dispatch(clearTaskPriority());
			setInitialValues(null);
		};
	}, []);

	useEffect(() => {
		if (taskPriority) {
			setInitialValues(taskPriority);
		}
	}, [taskPriority]);

	const { Title } = Typography;
	const [form] = Form.useForm();
	const { id } = useParams("id");
	const navigate = useNavigate();

	const onFinish = async (values) => {
		const taskData = {
			...values,
		};

		setLoader(true);
		const resp = await dispatch(updateTaskPriority({ id, values: taskData }));

		if (resp.payload.message === "success") {
			setLoader(false);
			form.resetFields();
			dispatch(loadAllTaskPriority());
			navigate(-1);
		} else {
			setLoader(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding TaskStatus");
		setLoader(false);
	};

	console.log("initialValues", initialValues);
	console.log("taskStatus", taskPriority);
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
						Update Task Priority
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
									label='Task Priority Name'
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

export default UpdateTaskPriority;
