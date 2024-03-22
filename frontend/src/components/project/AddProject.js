import {
	Button,
	Col,
	DatePicker,
	Form,
	Input,
	Row,
	Select,
	Typography,
} from "antd";

import dayjs from "dayjs";
import React, { Fragment, useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { addSingleProject } from "../../redux/rtk/features/projectManagement/project/project/project";
import { loadAllStaff } from "../../redux/rtk/features/user/userSlice";
import PageTitle from "../page-header/PageHeader";

const AddProject = ({ drawer }) => {
	const [loader, setLoader] = useState(false);
	const userList = useSelector((state) => state.users.list);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAllStaff({ status: "true" }));
	}, []);

	const { Title } = Typography;
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		const projectData = {
			...values,
			startDate: dayjs(values.startDate).format(),
			endDate: dayjs(values.endDate).format(),
		};

		setLoader(true);
		const resp = await dispatch(addSingleProject(projectData));

		if (resp.payload.message === "success") {
			setLoader(false);
			form.resetFields();
		} else {
			setLoader(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding Project");
		setLoader(false);
	};
	return (
		<Fragment bordered={false}>
			{/* <UserPrivateComponent permission={"create-leaveApplication"}> */}
			<PageTitle title={"Back"} />
			<Row className='mr-top' justify={drawer ? "center" : "center"}>
				<Col
					xs={24}
					sm={24}
					md={24}
					lg={drawer ? 22 : 18}
					xl={drawer ? 22 : 16}
					className='column-design border rounded card-custom'>
					<Title level={4} className='m-2 mt-5 mb-5 text-center'>
						Add New Project
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
								style={{ marginBottom: "10px" }}
								label='Project Manager'
								name='projectManagerId'
								rules={[
									{
										required: true,
										message: "Select Project Manager",
									},
								]}>
								<Select
									loading={!userList.length}
									mode='single'
									showSearch
									placeholder='Select Project Manager'
									optionFilterProp='children'>
									{userList.map((item) => (
										<Select.Option key={item.id} value={item.id}>
											{item.firstName} {item.lastName}
										</Select.Option>
									))}
								</Select>
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "10px" }}
								label='Project Name'
								name='name'
								rules={[
									{
										required: true,
										message: "Enter Project Name",
									},
								]}>
								<Input placeholder='Enter Project Name' />
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "10px" }}
								label='Start Date'
								name='startDate'
								rules={[
									{
										required: true,
										message: "Please input Project Start Date!",
									},
								]}>
								<DatePicker />
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "20px" }}
								label='End Date'
								name='endDate'
								rules={[
									{
										required: true,
										message: "Please input Project End Date!",
									},
								]}>
								<DatePicker />
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "20px" }}
								label='Project Description'
								name='description'
								rules={[
									{
										required: true,
										message: "Enter Project Description",
									},
								]}>
								<Input.TextArea placeholder='Enter Project Description' />
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

export default AddProject;
