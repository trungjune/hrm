import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { loadSingleStaff } from "../../../redux/rtk/features/user/userSlice";
import { addDesHistory } from "../../designationHistory/designationHistoryApis";
import { loadAllDesignation } from "../../../redux/rtk/features/designation/designationSlice";

const DesignationAddSinglePopup = ({ list, setLoading }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();
	const [designationStartDate, setdesignationStartDate] = useState(null);
	const [designationEndDate, setdesignationEndDate] = useState(null);
	const [loader, setLoader] = useState(false);
	const [designationId, setDesignationId] = useState("");

	const designations = useSelector((state) => state.designations.list);

	const user_id = useParams("id");
	const dispatch = useDispatch();

	const onFinish = async (values) => {
		setLoader(true);
		setLoading(true);
		const infodata = {
			...values,
			userId: parseInt(user_id.id),
			designationId: parseInt(designationId),
			designationStartDate: dayjs(designationStartDate).format("YYYY-MM-DD"),
			designationEndDate: dayjs(designationEndDate).format("YYYY-MM-DD"),
		};

		const resp = await addDesHistory(infodata);

		if (resp.message === "success") {
			setLoader(false);
			dispatch(loadSingleStaff(user_id.id));
			setIsModalOpen(false);
			setLoading(false);
			form.resetFields();
		} else {
			setLoader(false);
			setLoading(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding department");
		setLoader(false);
		setLoading(false);
	};
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setdesignationStartDate(dayjs());
		setdesignationEndDate(dayjs());
		setIsModalOpen(false);
		setLoader(false);
		setLoading(false);
		form.resetFields();
	};
	const handleCancel = () => {
		setdesignationStartDate(dayjs());
		setdesignationEndDate(dayjs());
		setIsModalOpen(false);
		setLoader(false);
		setLoading(false);
		form.resetFields();
	};

	useEffect(() => {
		dispatch(loadAllDesignation());
	}, []);

	return (
		<>
			<div className='text-center'>
				<Button type='primary' onClick={showModal}>
					Add New Designation
				</Button>
			</div>
			<Modal
				title={`Add Designation`}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				<Form
					form={form}
					style={{ marginBottom: "100px" }}
					eventKey='department-form'
					name='basic'
					labelCol={{
						span: 6,
					}}
					wrapperCol={{
						span: 16,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'>
					<div>
						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Designation'
							name='designationId'
							rules={[
								{
									required: true,
									message: "Please input your Designation!",
								},
							]}>
							<Select
								loading={!list}
								placeholder='Select Designation'
								onChange={(value) => setDesignationId(value)}>
								{list?.map((item) => (
									<Select.Option key={item.id} value={item.id}>
										{item.name || ""}
									</Select.Option>
								))}
							</Select>
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Start Date'
							name='designationStartDate'
							valuePropName='designationStartDate'
							rules={[
								{
									required: true,
									message: "Please input your start date!",
								},
							]}>
							<DatePicker onChange={(date) => setdesignationStartDate(date)} />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='End Date'
							name='designationEndDate'
							valuePropName='designationEndDate'>
							<DatePicker onChange={(date) => setdesignationEndDate(date)} />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Comment'
							name='designationComment'>
							<Input placeholder='Comment' />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "20px" }}
							wrapperCol={{
								offset: 6,
								span: 12,
							}}>
							<Button
								onClick={() => setLoader(true)}
								type='primary'
								size='small'
								htmlType='submit'
								block
								loading={loader}>
								Add Now
							</Button>
						</Form.Item>
					</div>
				</Form>
			</Modal>
		</>
	);
};
export default DesignationAddSinglePopup;
