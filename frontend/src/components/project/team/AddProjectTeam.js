import { Button, Col, Form, Input, Row, Select, Typography } from "antd";

import React, { Fragment, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
	addSingleProjectTeam,
	loadAllProjectTeam,
	loadAllProjectTeamByProjectId,
} from "../../../redux/rtk/features/projectManagement/project/projectTeam/projectTeam";
import { loadAllStaff } from "../../../redux/rtk/features/user/userSlice";
import { loadAllProject } from "../../../redux/rtk/features/projectManagement/project/project/project";

const AddProjectTeam = ({ projectId }) => {
	const [loader, setLoader] = useState(false);
	const { list: usersList, loading: userListLoading } = useSelector(
		(state) => state.users
	);

	const { list: projectList, loading: projectListLoading } = useSelector(
		(state) => state.project
	);

	useEffect(() => {
		dispatch(loadAllStaff({ status: "true" }));
	}, []);

	useEffect(() => {
		dispatch(loadAllProject());
	}, []);

	const dispatch = useDispatch();

	const { Title } = Typography;
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		const singleProjectTeam = {
			...values,
			projectId: values.projectId ? values.projectId : parseInt(projectId),
		};

		console.log("singleProjectTeam", singleProjectTeam);

		setLoader(true);
		const resp = await dispatch(addSingleProjectTeam(singleProjectTeam));

		if (resp.payload.message === "success") {
			setLoader(false);
			form.resetFields();
			dispatch(loadAllProjectTeamByProjectId(projectId));
		} else {
			setLoader(false);
		}
	};

	console.log("project", projectId);

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding Project Team");
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
						Add Team To Project
					</Title>
					<Form
						form={form}
						style={{ marginBottom: "40px" }}
						eventKey='shift-form'
						name='basic'
						labelCol={{
							span: 7,
						}}
						wrapperCol={{
							span: 12,
						}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete='off'>
						<div>
							<Form.Item
								label='Project Name'
								name='projectId'
								style={{ marginBottom: "10px" }}
								rules={[
									{
										required: projectId ? false : true,
										message: "Select Project",
									},
								]}>
								{!projectId ? (
									<Select
										loading={projectListLoading}
										showSearch
										allowClear
										placeholder='Select Project'
										optionFilterProp='children'>
										{projectList?.map((item) => (
											<Select.Option key={item.id} value={item.id}>
												{item.name}
											</Select.Option>
										))}
									</Select>
								) : (
									<Input disabled defaultValue={projectId} />
								)}
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "10px" }}
								label='Team Name'
								name='projectTeamName'
								rules={[
									{
										required: true,
										message: "Input Team Name",
									},
								]}>
								<Input placeholder='Team Name' />
							</Form.Item>
							<Form.Item
								style={{ marginBottom: "20px" }}
								label='Team Member/s'
								name='projectTeamMember'
								rules={[
									{
										required: true,
										message: "Select Team Member/s",
									},
								]}>
								<Select
									mode='multiple'
									loading={userListLoading}
									placeholder='Select Team Member/s'
									optionFilterProp='children'>
									{usersList?.map((item) => (
										<Select.Option key={item.id} value={item.id}>
											{item.firstName + " " + item.lastName}
										</Select.Option>
									))}
								</Select>
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "10px" }}
								wrapperCol={{
									offset: 7,
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

export default AddProjectTeam;
