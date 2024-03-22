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
import getUserFromToken from "../../utils/getUserFromToken";
import { addSingleProjectTeam } from "../../redux/rtk/features/projectManagement/project/projectTeam/projectTeam";

const AddProjectTeam = ({ drawer }) => {
	const [loader, setLoader] = useState(false);
	const [userList, setuserList] = useState([
		{
			id: 1,
			firstName: "omega",
			lastName: "solution",
		},
		{
			id: 2,
			firstName: "rakib",
			lastName: "hasan",
		},
	]);
	// const list = useSelector((state) => state.users.list);

	//get id from JWT token in localstorage and decode it

	const id = getUserFromToken();

	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(loadAllStaff({ status: "true" }))
	}, []);

	const { Title } = Typography;
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		const singleProjectTeam = {
			...values,
			projectId: id,
		};

		setLoader(true);
		const resp = await dispatch(addSingleProjectTeam(singleProjectTeam));

		if (resp.payload.message === "success") {
			setLoader(false);
			form.resetFields();
			// dispatch(loadAllShift());
		} else {
			setLoader(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding Project Team");
		setLoader(false);
	};
	return (
		<Fragment bordered={false}>
			{/* <UserPrivateComponent permission={"create-leaveApplication"}> */}
			<Row className='mr-top' justify={drawer ? "center" : "center"}>
				<Col
					xs={24}
					sm={24}
					md={24}
					lg={drawer ? 22 : 16}
					xl={drawer ? 22 : 12}
					className='column-design border rounded card-custom'>
					<Title level={4} className='m-2 mt-5 mb-5 text-center'>
						Add Project Team
					</Title>
					<Form
						form={form}
						style={{ marginBottom: "40px" }}
						eventKey='shift-form'
						name='basic'
						labelCol={{
							span: 6,
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
								label='User'
								name='userId'
								rules={[
									{
										required: true,
										message: "Select User",
									},
								]}>
								<Select
									mode='single'
									placeholder='Select User'
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
								wrapperCol={{
									offset: 6,
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
