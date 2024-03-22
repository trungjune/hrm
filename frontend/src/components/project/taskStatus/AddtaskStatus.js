import { Button, Col, Form, Input, Row, Select, Typography } from "antd";

import React, { Fragment, useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
	addSingleTaskStatus,
	loadAllTaskStatus,
	loadAllTaskStatusByProjectId,
} from "../../../redux/rtk/features/projectManagement/project/taskStatus/taskStatus";
import { useParams } from "react-router-dom";
import { loadAllProject } from "../../../redux/rtk/features/projectManagement/project/project/project";

const AddTaskStatus = ({ isFixed, projectId }) => {
	const [loader, setLoader] = useState(false);

	const { loading: projectLoading, list: projectList } = useSelector(
		(state) => state.project
	);

	const dispatch = useDispatch();

	const { Title } = Typography;
	const [form] = Form.useForm();
	const { id } = useParams("id");

	useEffect(() => {
		dispatch(loadAllProject());
	}, []);

	const onFinish = async (values) => {
		const taskStatusData = {
			...values,
			projectId: !isFixed
				? values.projectId
				: id
				? parseInt(id)
				: parseInt(projectId),
		};

		setLoader(true);
		const resp = await dispatch(addSingleTaskStatus(taskStatusData));

		if (resp.payload.message === "success") {
			setLoader(false);
			form.resetFields();
			dispatch(loadAllTaskStatusByProjectId(id ? id : projectId));
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
			<Row className='mr-top' justify={"center"}>
				<Col
					xs={24}
					sm={24}
					md={24}
					lg={22}
					xl={22}
					className='column-design border rounded card-custom'>
					<Title level={4} className='m-2 mt-5 mb-5 text-center'>
						Add Task Status Column
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
							{isFixed ? (
								<>
									{!projectId && (
										<Form.Item
											style={{ marginBottom: "10px" }}
											label='Project'
											tooltip='Project is already selected '
											name='projectId'>
											<Input defaultValue={id} />
										</Form.Item>
									)}
								</>
							) : (
								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Project'
									name='projectId'
									rules={[
										{
											required: true,
											message: "Select Project",
										},
									]}>
									<Select
										showSearch
										loading={projectLoading}
										placeholder='Select Project'
										optionFilterProp='children'
										filterOption={(input, option) =>
											option.children

												.toLowerCase()
												.indexOf(input.toLowerCase()) >= 0
										}>
										{projectList.map((project) => (
											<Select.Option key={project.id} value={project.id}>
												{project.name}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
							)}
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

export default AddTaskStatus;
