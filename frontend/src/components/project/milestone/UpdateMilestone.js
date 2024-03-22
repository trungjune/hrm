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
import {
	addSingleMilestone,
	clearMilestone,
	loadAllMilestone,
	loadSingleMilestone,
	updateMilestone,
} from "../../../redux/rtk/features/projectManagement/project/milestone/milestone";
import { loadAllProject } from "../../../redux/rtk/features/projectManagement/project/project/project";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Loader from "../../loader/loader";

const UpdateMilestone = () => {
	const [loader, setLoader] = useState(false);
	const { milestone, loading } = useSelector((state) => state.milestone);
	const { list } = useSelector((state) => state.project);
	// const list = useSelector((state) => state.users.list);
	const [initialState, setInitialState] = useState(null);

	const dispatch = useDispatch();
	const { id } = useParams("id");

	useEffect(() => {
		dispatch(loadSingleMilestone(id));
		dispatch(loadAllProject());
		return () => {
			dispatch(clearMilestone());
		};
	}, []);

	useEffect(() => {
		if (milestone) {
			setInitialState({
				...milestone,
				startDate: moment(milestone.startDate),
				endDate: moment(milestone.endDate),
			});
		}
	}, [milestone]);

	const { Title } = Typography;
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const onFinish = async (values) => {
		const milestoneData = {
			...values,
			startDate: dayjs(values.startDate).format(),
			endDate: dayjs(values.endDate).format(),
		};

		setLoader(true);
		const resp = await dispatch(updateMilestone({id, values: milestoneData}));

		if (resp.payload.message === "success") {
			setLoader(false);
			form.resetFields();
			dispatch(loadAllMilestone());
			navigate(-1);
		} else {
			setLoader(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding Milestone");
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
					lg={18}
					xl={18}
					className='column-design border rounded card-custom'>
					<Title level={4} className='m-2 mt-5 mb-5 text-center'>
						Update Milestone
					</Title>
					{initialState ? (
						<Form
							form={form}
							style={{ marginBottom: "40px" }}
							eventKey='shift-form'
							name='basic'
							initialValues={initialState}
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
									label='Project'
									name='projectId'
									rules={[
										{
											required: true,
											message: "Select Project",
										},
									]}>
									<Select
										mode='single'
										loading={loading}
										placeholder='Select Project'
										optionFilterProp='children'>
										{list.map((item) => (
											<Select.Option key={item.id} value={item.id}>
												{item.name}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Milestone Name'
									name='name'
									rules={[
										{
											required: true,
											message: "Enter Milestone Name",
										},
									]}>
									<Input placeholder='Enter Milestone Name' />
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
									style={{ marginBottom: "10px" }}
									label='Milestone Description'
									name='description'
									rules={[
										{
											required: true,
											message: "Enter Milestone Description",
										},
									]}>
									<Input placeholder='Enter Milestone Description' />
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
					) : (
						<Loader />
					)}
				</Col>
			</Row>
			{/* </UserPrivateComponent> */}
		</Fragment>
	);
};

export default UpdateMilestone;
